import argparse
import os
import shutil

import numpy as np
import torch.nn.parallel
import torch.optim
from PIL import Image
from scipy import spatial
from tqdm import tqdm

from classifier.resnet import resnet


def load_model(args):
    model = resnet(args)

    # load checkpoint file
    if os.path.isfile(args.model_path):
        print("=> loading checkpoint '{}'".format(args.model_path))
        checkpoint = torch.load(args.model_path)
        state_dict = checkpoint['state_dict']
        model.load_state_dict(state_dict)
        print("=> loaded checkpoint '{}' (epoch {})".format(args.model_path, checkpoint['epoch']))
    else:
        raise ValueError('Invalid checkpoint: {}'.format(args.model_path))

    return model


def read_csv_data(args):
    if os.path.isfile(args.csv_path):
        csv_data = {}
        with open(args.csv_path, 'r') as fp:
            for line in fp.readlines():
                line_split = line.replace('\n', '').split(',')
                csv_data[line_split[0]] = np.array([float(x) for x in line_split[1:]])
        print("=> Loaded csv data '{}'".format(args.csv_path))
    else:
        raise ValueError('Invalid csv path: {}'.format(args.csv_path))

    return csv_data


def get_input_data(args):
    samples = []
    if os.path.isfile(args.data):
        samples.append(args.data)
    elif os.path.isdir(args.data):
        for path, dir, files in os.walk(args.data):
            for filename in files:
                if os.path.splitext(filename)[-1].lower() in ('.png', '.jpg', '.jpeg'):
                    samples.append(os.path.join(path, filename))
    else:
        raise ValueError('Invalid data path: {}'.format(args.data))

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


def extract_similar_images(args):
    model = load_model(args)
    model = model.cuda() if torch.cuda.is_available() else model
    model.eval()

    csv_data = read_csv_data(args)
    samples = get_input_data(args)
    with torch.no_grad():
        for image_path in tqdm(samples):
            similar_images = []

            image = read_image(image_path)
            image = image.cuda(non_blocking=True) if torch.cuda.is_available() else image

            output, feature = model(image)
            feature = feature[0].cpu().data.numpy()

            distances = []
            for compare_file_path, compare_feature in csv_data.items():
                distance = spatial.distance.cosine(feature, compare_feature)
                distances.append([compare_file_path, distance])

            for line in sorted(distances, key=lambda x: x[1])[:args.extract_num]:
                similar_images.append(line[0])

            filename = os.path.basename(image_path)
            output_dir = os.path.join(args.result, filename.replace(os.path.splitext(filename)[-1].lower(), ''))
            os.makedirs(output_dir, exist_ok=True)
            for similar_image_path in similar_images:
                output_path = os.path.join(output_dir, os.path.basename(similar_image_path))
                shutil.copy2(similar_image_path, output_path)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Extract Similar Images')
    parser.add_argument('--data', default='/home/ubuntu/data/bai/test', type=str, help='path or dir to input data')
    parser.add_argument('--num_classes', default=12, type=int, metavar='N', help='number of classes')
    parser.add_argument('--model_path', default='results/model_best.pth', type=str, metavar='PATH', help='path to model')
    parser.add_argument('--csv_path', default='results/features.csv', type=str, metavar='PATH', help='path to features csv')
    parser.add_argument('--result', default='results/similar', type=str, metavar='DIR', help='path to results')
    parser.add_argument('--extract_num', default=10, type=int, help='num of extract images per one input image')
    args = parser.parse_args()

    args.data = os.path.expanduser(args.data)
    args.model_path = os.path.expanduser(args.model_path)
    args.csv_path = os.path.expanduser(args.csv_path)
    args.result = os.path.expanduser(args.result)
    os.makedirs(args.result, exist_ok=True)

    extract_similar_images(args)
