import argparse
import time
import warnings

import torch.backends.cudnn as cudnn
import torch.nn.parallel
import torch.optim
import torch.utils.data as data

from classifier import *

best_acc1 = 0


def train(args, model, criterion, optimizer, train_loader, epoch):
    batch_time = AverageMeter('Time')
    data_time = AverageMeter('Data')
    losses = AverageMeter('Loss')
    top1 = AverageMeter('Acc@1')
    top3 = AverageMeter('Acc@3')
    top5 = AverageMeter('Acc@5')
    progress = ProgressMeter(len(train_loader), [batch_time, data_time, losses, top1, top3, top5], os.path.join(args.result, 'log.txt'), prefix="Epoch: [{}]".format(epoch))

    # switch to train mode
    model.train()

    end = time.time()
    for i, (images, targets, img_paths) in enumerate(train_loader):
        # measure data loading time
        data_time.update(time.time() - end)

        images = images.cuda(non_blocking=True) if torch.cuda.is_available() else images
        targets = targets.cuda(non_blocking=True) if torch.cuda.is_available() else targets

        # compute output
        outputs, _ = model(images)
        loss = criterion(outputs, targets)

        # measure accuracy and record loss
        acc1, acc3, acc5 = accuracy(outputs, targets, topk=(1, 3, 5))
        losses.update(loss.item(), images.size(0))
        top1.update(acc1, images.size(0))
        top3.update(acc3, images.size(0))
        top5.update(acc5, images.size(0))

        # compute gradient
        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # measure elapsed time
        batch_time.update(time.time() - end)
        end = time.time()

        if i % args.print_freq == 0:
            progress.display(i)
            progress.write(i)


def validate(args, model, criterion, val_loader):
    batch_time = AverageMeter('Time')
    losses = AverageMeter('Loss')
    top1 = AverageMeter('Acc@1')
    top3 = AverageMeter('Acc@3')
    top5 = AverageMeter('Acc@5')
    progress = ProgressMeter(len(val_loader), [batch_time, losses, top1, top3, top5], os.path.join(args.result, 'log.txt'), prefix='Test: ')

    # switch to evaluate mode
    model.eval()

    with torch.no_grad():
        end = time.time()
        for i, (images, targets, img_paths) in enumerate(val_loader):
            images = images.cuda(non_blocking=True) if torch.cuda.is_available() else images
            targets = targets.cuda(non_blocking=True) if torch.cuda.is_available() else targets

            # compute output
            outputs, _ = model(images)
            loss = criterion(outputs, targets)

            # measure accuracy and record loss
            acc1, acc3, acc5 = accuracy(outputs, targets, topk=(1, 3, 5))
            losses.update(loss.item(), images.size(0))
            top1.update(acc1, images.size(0))
            top3.update(acc3, images.size(0))
            top5.update(acc5, images.size(0))

            # measure elapsed time
            batch_time.update(time.time() - end)
            end = time.time()

            if i % args.print_freq == 0:
                progress.display(i)
                progress.write(i)

        log = ' * Acc@1: {top1:.3f} Acc@3: {top3:.3f} Acc@5: {top5:.3f} LR: {lr:.7f}'.format(top1=top1.avg, top3=top3.avg, top5=top5.avg, lr=args.lr)
        print(log)
        with open(os.path.join(args.result, 'log.txt'), 'at') as wf:
            wf.write(log + '\n')

    return top1.avg


def run(args):
    if args.seed is not None:
        random.seed(args.seed)
        torch.manual_seed(args.seed)
        cudnn.deterministic = True
        warnings.warn('You have chosen to seed training. This will turn on the CUDNN deterministic setting, which can slow down your training considerably! You may see unexpected behavior when restarting from checkpoints.')

    global best_acc1
    best_acc1 = 0

    # create model
    print("=> creating model...")
    model = resnet(args)

    # define loss function (criterion) and optimizer
    criterion = nn.CrossEntropyLoss()
    optimizer = torch.optim.Adam(model.parameters(), args.lr)
    learning_rate_scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=args.epochs)

    if torch.cuda.is_available():
        model = model.cuda()
        criterion = criterion.cuda()

    # optionally resume from a checkpoint
    if args.resume:
        if os.path.isfile(args.resume):
            print("=> loading checkpoint '{}'".format(args.resume))
            checkpoint = torch.load(args.resume)
            args.start_epoch = checkpoint['epoch']
            best_acc1 = checkpoint['best_acc1']
            model.load_state_dict(checkpoint['state_dict'])
            optimizer.load_state_dict(checkpoint['optimizer'])
            print("=> loaded checkpoint '{}' (epoch {})".format(args.resume, checkpoint['epoch']))
        else:
            print("=> no checkpoint found at '{}'".format(args.resume))

    cudnn.benchmark = True

    # create train dataset and dataloader
    train_dataset = PicDataset(args, 'train')
    train_loader = torch.utils.data.DataLoader(train_dataset, batch_size=args.batch_size, num_workers=args.workers, pin_memory=True, shuffle=True, sampler=None)

    # create validation dataset and dataloader
    val_dataset = PicDataset(args, 'val')
    val_loader = torch.utils.data.DataLoader(val_dataset, batch_size=args.batch_size, shuffle=False, num_workers=args.workers, pin_memory=True)

    for epoch in range(args.start_epoch, args.epochs + 1):
        # set current learning rate to args
        args.lr = learning_rate_scheduler.get_lr()[0]

        # train for one epoch
        train(args, model, criterion, optimizer, train_loader, epoch)

        # evaluate on validation set
        acc1 = validate(args, model, criterion, val_loader)

        # remember best acc@1 and save checkpoint
        is_best = acc1 >= best_acc1
        best_acc1 = max(acc1, best_acc1)
        save_checkpoint({'epoch': epoch, 'state_dict': model.state_dict(), 'best_acc1': best_acc1, 'optimizer': optimizer.state_dict()}, is_best, result_dir=args.result, filename='model_last.pth', best_filename='model_best.pth')

        # update learning rate
        learning_rate_scheduler.step()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='PyTorch ImageNet Training')
    parser.add_argument('--pretrained', default=False, action='store_true', help='Load pretrained model.')
    parser.add_argument('--workers', default=16, type=int, metavar='N', help='number of data loading workers')
    parser.add_argument('--epochs', default=90, type=int, metavar='N', help='number of total epochs to run')
    parser.add_argument('--start_epoch', default=1, type=int, metavar='N', help='manual epoch number')
    parser.add_argument('--batch_size', default=32 * 16, type=int, metavar='N', help='mini-batch size')
    parser.add_argument('--lr', default=0.00001 * 4, type=float, metavar='LR', help='initial learning rate', dest='lr')
    parser.add_argument('--print_freq', default=10, type=int, metavar='N', help='print frequency (default: 10)')
    parser.add_argument('--seed', default=None, type=int, help='seed for initializing training.')
    parser.add_argument('--data', default='~/data/bai', metavar='DIR', help='path to dataset')
    parser.add_argument('--data_type', default='all', type=str, help='Data type (50, 100, 365, all)')
    parser.add_argument('--num_classes', default=12, type=int, metavar='N', help='number of classes')
    parser.add_argument('--result', default='results', metavar='DIR', help='path to results')
    parser.add_argument('--resume', default='', type=str, metavar='PATH', help='path to latest checkpoint')
    args = parser.parse_args()

    args.data = os.path.expanduser(args.data)
    args.result = os.path.expanduser(args.result)
    os.makedirs(args.result, exist_ok=True)

    run(args)
