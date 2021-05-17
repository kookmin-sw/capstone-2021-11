import argparse
import os

import firebase_admin
import numpy as np
import torch.nn.parallel
import torch.optim
from PIL import Image
from firebase_admin import credentials, storage
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


def read_image(img_path, input_size=224):
    # 1) read image
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

    if not firebase_admin._apps:
        print('Initializing firebase app')
        cred = credentials.Certificate('firebase_key.json')
        firebase_admin.initialize_app(cred)
    bucket = storage.bucket('ssnap-411f1.appspot.com')

    blobs = []
    for i, blob in enumerate(bucket.list_blobs()):
        if 'Grade' in blob.path or '%EC%9D%BC%EB%B0%98' in blob.path:
            blobs.append(blob)

    wf = open(args.csv_path, 'w')
    with torch.no_grad():
        for i, blob in tqdm(enumerate(blobs), total=len(blobs)):
            try:
                blob.download_to_filename('./fb_extract_temp.jpg')
                image = read_image('./fb_extract_temp.jpg')
                image = image.cuda(non_blocking=True) if torch.cuda.is_available() else image

                _, features = model(image)

                wf.write('{},{}\n'.format(blob.id, ','.join([str(x) for x in features[0].cpu().data.numpy()])))
            except:
                print('Error [{}] {}'.format(i, blob))
                continue

    os.remove('./fb_extract_temp.jpg')
    wf.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Extract Features')
    parser.add_argument('--num_classes', default=12, type=int, metavar='N', help='number of classes')
    parser.add_argument('--model_path', default='results/model_best.pth', type=str, metavar='PATH', help='path to model')
    parser.add_argument('--csv_path', default='results/features_firebase.csv', type=str, metavar='PATH', help='path to features csv')
    args = parser.parse_args()

    args.model_path = os.path.expanduser(args.model_path)
    args.csv_path = os.path.expanduser(args.csv_path)
    os.makedirs(args.csv_path.replace(os.path.basename(args.csv_path), ''), exist_ok=True)

    extract_features(args)
