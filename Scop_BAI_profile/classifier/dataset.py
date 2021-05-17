import os
import random

import cv2
import imgaug.augmenters as iaa
import numpy as np
import torch
import torch.utils.data as data
from PIL import Image

from .utils import (get_warp_transform_imgaug, warp_image_transform, get_affine_transform)


class PicDataset(data.Dataset):
    def __init__(self, args, split, input_size=224, scale=0.05, shift=0.05, flip=0.5, rand_warp=False, skip_warp=0.1, warp_scale=0.05, rotate=20):
        self.args = args
        self.split = split

        self.input_size = input_size
        self.scale = scale
        self.shift = shift
        self.flip = flip
        self.rand_warp = rand_warp
        self.skip_warp = skip_warp
        self.warp_scale = warp_scale

        self.mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 1, 3)
        self.std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 1, 3)
        self.data_rng = np.random.RandomState(123)
        self.eig_val = np.array([0.2141788, 0.01817699, 0.00341571], dtype=np.float32)
        self.eig_vec = np.array([[-0.58752847, -0.69563484, 0.41340352], [-0.5832747, 0.00994535, -0.81221408], [-0.56089297, 0.71832671, 0.41158938]], dtype=np.float32)

        self.samples = []

        self.seq = iaa.Sequential([
            iaa.Sometimes(0.5, [
                iaa.Fliplr(flip),
                iaa.Affine(scale={"x": (1.0 - shift, 1.0 + shift), "y": (1.0 - shift, 1.0 + shift)}, translate_percent={"x": (-scale, scale), "y": (-scale, scale)}, rotate=(-rotate, rotate)),
                iaa.GaussianBlur(sigma=(0, 1.0)),
                iaa.Sometimes(0.5, iaa.CoarseDropout(0.2, size_percent=0.1)),
                iaa.Sometimes(0.5, iaa.PiecewiseAffine(scale=(0.01, warp_scale), nb_cols=3, nb_rows=3)),
                iaa.Sometimes(0.5,
                              iaa.OneOf([
                                  iaa.SaltAndPepper(0.1),
                                  iaa.CoarseSaltAndPepper(0.05, size_percent=(0.01, 0.1)), ]))]),
            ])

        self.split = ['train', 'val'] if self.split == 'all' else [self.split]
        for spl in self.split:
            data_path = os.path.join(args.data, spl)
            for path, dir, files in os.walk(data_path):
                for filename in files:
                    ext = os.path.splitext(filename)[-1].lower()
                    if ext in ('.png', '.jpg', '.jpeg'):
                        label_name = path.split('/')[-1]
                        self.samples.append((os.path.join(path, filename), int(label_name)))

        print('Loaded {} total: {}'.format(self.split[0], len(self.samples)))

    def __getitem__(self, index):
        img_path, label = self.samples[index]

        # 1) Read image and augmentation
        ori_img = cv2.imread(img_path, cv2.IMREAD_IGNORE_ORIENTATION | cv2.IMREAD_COLOR)
        if self.split == 'train':
            ori_img = self.seq.augment_image(ori_img)

        # 1-1) cv2 to pil
        ori_img = Image.fromarray(cv2.cvtColor(ori_img, cv2.COLOR_BGR2RGB))

        # 2) Resize and padding
        old_size = ori_img.size
        ratio = float(self.input_size) / max(old_size)
        new_size = tuple([int(x * ratio) for x in old_size])
        ori_img = ori_img.resize(new_size, Image.ANTIALIAS)

        img = Image.new("RGB", (self.input_size, self.input_size))
        img.paste(ori_img, ((self.input_size - new_size[0]) // 2, (self.input_size - new_size[1]) // 2))

        # 3) Make hsv image
        hsv = img.copy().convert('HSV')
        hsv = (np.array(hsv).astype(np.float32) / 255.)

        # 4) Convert as tensor shape
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 1, 3)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 1, 3)
        mean = np.flip(mean)
        std = np.flip(std)

        img = (np.array(img).astype(np.float32) / 255.)
        img = (img - mean) / std

        # 5) Stack rgb and hsv
        input_image = np.dstack((img, hsv))
        input_image = input_image.transpose(2, 0, 1)
        input_image = torch.from_numpy(input_image)

        return input_image, label, img_path

    def __len__(self):
        return len(self.samples)
