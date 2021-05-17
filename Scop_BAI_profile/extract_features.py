import argparse
import os

import numpy as np
import torch.nn.parallel
import torch.optim
from PIL import Image
from tqdm import tqdm

from classifier.resnet import resnet


def load_model(args):
    model = resnet(args)

    # load checkpoint file
    if os.path.isfile(args.model_path):
        checkpoint = torch.load(args.model_path)
        state_dict = checkpoint['state_dict']
        model.load_state_dict(state_dict)
        print("=> loaded checkpoint '{}' (epoch {})".format(args.model_path, checkpoint['epoch']))
    else:
        raise ValueError('Invalid checkpoint: {}'.format(args.model_path))

    return model


def get_input_data(args, split='all'):
    if not os.path.isdir(args.data):
        raise ValueError('Invalid data dir: {}'.format(args.csv_path))

    samples = []
    split = ['train', 'val'] if split == 'all' else [split]
    for spl in split:
        data_path = os.path.join(args.data, spl) if args.data_type.lower() == 'all' else os.path.join(args.data, spl, args.data_type)
        for path, dir, files in os.walk(data_path):
            for filename in files:
                if os.path.splitext(filename)[-1].lower() in ('.png', '.jpg', '.jpeg'):
                    samples.append(os.path.join(path, filename))

    print("=> Loaded {} image(s)".format(len(samples)))
    return samples


def read_image(img_path, input_size=224):
    # 1) read image
    # ori_img = cv2.imread(img_path, cv2.IMREAD_IGNORE_ORIENTATION | cv2.IMREAD_COLOR)
    ori_img = Image.open(img_path)

    # 1) Resize and padding
    old_size = ori_img.size
    ratio = float(input_size) / max(old_size)
    new_size = tuple([int(x * ratio) for x in old_size])
    ori_img = ori_img.resize(new_size, Image.ANTIALIAS)

    img = Image.new("RGB", (input_size, input_size))
    img.paste(ori_img, ((input_size - new_size[0]) // 2, (input_size - new_size[1]) // 2))

    # 2) Make hsv image
    hsv = img.copy().convert('HSV')
    hsv = (np.array(hsv).astype(np.float32) / 255.)

    # 3) Convert as tensor shape
    mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 1, 3)
    std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 1, 3)
    mean = np.flip(mean)
    std = np.flip(std)

    img = (np.array(img).astype(np.float32) / 255.)
    img = (img - mean) / std

    # 4) Stack rgb and hsv
    input_image = np.dstack((img, hsv))
    input_image = input_image.transpose(2, 0, 1)
    input_image = np.array([input_image])
    input_image = torch.from_numpy(input_image)

    return input_image


def extract_features(args):
    model = load_model(args)
    model = model.cuda() if torch.cuda.is_available() else model
    model.eval()

    samples = get_input_data(args)
    with open(args.csv_path, 'w') as wf:
        with torch.no_grad():
            for img_path in tqdm(samples):
                image = read_image(img_path)
                image = image.cuda(non_blocking=True) if torch.cuda.is_available() else image

                _, features = model(image)

                wf.write('{},{}\n'.format(img_path, ','.join([str(x) for x in features[0].cpu().data.numpy()])))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Extract Features')
    parser.add_argument('--num_classes', default=12, type=int, metavar='N', help='number of classes')
    parser.add_argument('--data', default='~/data/bai', metavar='DIR', help='path to dataset')
    parser.add_argument('--data_type', default='all', type=str, help='Data type (50, 100, 365, all)')
    parser.add_argument('--model_path', default='results/model_best.pth', type=str, metavar='PATH', help='path to model')
    parser.add_argument('--csv_path', default='results/features.csv', type=str, metavar='PATH', help='path to features csv')
    args = parser.parse_args()

    args.data = os.path.expanduser(args.data)
    args.model_path = os.path.expanduser(args.model_path)
    args.csv_path = os.path.expanduser(args.csv_path)
    os.makedirs(args.csv_path.replace(os.path.basename(args.csv_path), ''), exist_ok=True)

    extract_features(args)
