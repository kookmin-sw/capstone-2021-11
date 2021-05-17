import argparse
import time

import torch.backends.cudnn as cudnn
import torch.nn.parallel
import torch.optim
import torch.utils.data as data

from classifier import *

best_acc1 = 0


def test(args, model, criterion, test_loader):
    batch_time = AverageMeter('Time')
    losses = AverageMeter('Loss')
    top1 = AverageMeter('Acc@1')
    top3 = AverageMeter('Acc@3')
    top5 = AverageMeter('Acc@5')
    progress = ProgressMeter(len(test_loader), [batch_time, losses, top1, top3, top5], os.path.join(args.result, 'log_test.txt'), prefix='Test: ')

    # switch to evaluate mode
    model.eval()

    imgs, fts, tgs = [], [], []
    num_positive = [0 for _ in range(args.num_classes)]
    num_negative = [0 for _ in range(args.num_classes)]
    negatives = [[0 for _ in range(args.num_classes)] for _ in range(args.num_classes)]
    with torch.no_grad():
        end = time.time()
        for i, (images, targets, img_paths) in enumerate(test_loader):
            images = images.cuda(non_blocking=True) if torch.cuda.is_available() else images
            targets = targets.cuda(non_blocking=True) if torch.cuda.is_available() else targets

            # compute output
            outputs, features = model(images)
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

            if args.tsne:
                imgs.extend(img_paths)
                tgs.extend(torch.Tensor.cpu(targets).detach().numpy())
                fts.extend(torch.Tensor.cpu(features).detach().numpy())

            if args.debug_correct:
                top_nums = 1
                _, preds = outputs.topk(top_nums, 1, True, True)
                for target, pred, img_path in zip(targets, preds, img_paths):
                    target = target.item()
                    top_indexes = pred.tolist()
                    if target in top_indexes:
                        correct = 'positive'
                        num_positive[target] += 1
                    else:
                        correct = 'negative'
                        num_negative[target] += 1
                        negatives[target][top_indexes[0]] += 1
                    os.makedirs(os.path.join(args.result, 'debug_correct', str(target), correct), exist_ok=True)
                    shutil.copy2(img_path, os.path.join(args.result, 'debug_correct', str(target), correct, os.path.basename(img_path)))

            if i % args.print_freq == 0:
                progress.display(i)
                progress.write(i)

        if args.debug_correct:
            with open(os.path.join(args.result, 'debug_correct'.format(args.data_type), 'positive_negative.csv'), 'w') as wf:
                header = ['Label', 'Num Positive', 'Num Negative'] + ['{}'.format(i) for i in range(args.num_classes)]
                wf.write(','.join(header) + '\n')
                for i, negative in enumerate(negatives):
                    line = [i, num_positive[i], num_negative[i]] + negative
                    wf.write(','.join([str(x) for x in line]) + '\n')

        log = ' * Acc@1: {top1:.3f} Acc@3: {top3:.3f} Acc@5: {top5:.3f}'.format(top1=top1.avg, top3=top3.avg, top5=top5.avg)
        print(log)
        with open(os.path.join(args.result, 'log_test.txt'), 'w') as wf:
            wf.write(log + '\n')

    return top1.avg


def run(args):
    model = resnet(args)
    criterion = nn.CrossEntropyLoss()
    if torch.cuda.is_available():
        model = model.cuda()
        criterion = criterion.cuda()

    # load checkpoint file
    if os.path.isfile(args.resume):
        print("=> loading checkpoint '{}'".format(args.resume))
        checkpoint = torch.load(args.resume)
        state_dict = checkpoint['state_dict']
        model.load_state_dict(state_dict)
        print("=> loaded checkpoint '{}' (epoch {})".format(args.resume, checkpoint['epoch']))
    else:
        raise ValueError('Invalid checkpoint: {}'.format(args.resume))

    cudnn.benchmark = True

    # create test dataset and dataloader
    test_dataset = PicDataset(args, 'val')
    test_loader = torch.utils.data.DataLoader(test_dataset, batch_size=args.batch_size, shuffle=False, num_workers=args.workers, pin_memory=True)

    acc = test(args, model, criterion, test_loader)
    print(acc)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='PyTorch ImageNet Training')
    parser.add_argument('--workers', default=1, type=int, metavar='N', help='number of data loading workers')
    parser.add_argument('--batch_size', default=32, type=int, metavar='N', help='mini-batch size')
    parser.add_argument('--print_freq', default=10, type=int, metavar='N', help='print frequency (default: 10)')
    parser.add_argument('--num_classes', default=12, type=int, metavar='N', help='number of classes')
    parser.add_argument('--data', default='~/data/bai', metavar='DIR', help='path to dataset')
    parser.add_argument('--data_type', default='all', type=str, help='Data type (50, 100, 365, all)')
    parser.add_argument('--result', default='', metavar='DIR', help='path to results')
    parser.add_argument('--resume', default='results/model_best.pth', type=str, metavar='PATH', help='path to latest checkpoint')
    parser.add_argument('--debug_correct', default=False, action='store_true', help='Debug Eval Correct')
    parser.add_argument('--tsne', default=False, action='store_true', help='Do TSNE')
    args = parser.parse_args()

    args.data = os.path.expanduser(args.data)
    args.resume = os.path.expanduser(args.resume)
    if args.result == '':
        args.result = args.resume.replace(os.path.basename(args.resume), '')
    os.makedirs(args.result, exist_ok=True)

    run(args)
