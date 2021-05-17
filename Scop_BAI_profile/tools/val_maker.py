import os
import random
import shutil

input_dir = os.path.expanduser('~/data/bai/all')
train_dir = os.path.expanduser('~/data/bai/train')
val_dir = os.path.expanduser('~/data/bai/val')
os.makedirs(train_dir, exist_ok=True)
os.makedirs(val_dir, exist_ok=True)


def main():
    images = {}

    for label in os.listdir(input_dir):
        label_dir = os.path.join(input_dir, label)
        images[label] = []
        for filename in os.listdir(label_dir):
            ext = os.path.splitext(filename)[-1].lower()
            if ext in ('.png', '.jpg', '.jpeg'):
                images[label].append(filename)

    for label in images.keys():
        data_num = len(images[label])
        val_num = int(data_num / 10)

        count = 0
        random.shuffle(images[label])
        for filename in images[label]:
            if count < val_num:
                os.makedirs(os.path.join(val_dir, label), exist_ok=True)
                shutil.copy2(os.path.join(input_dir, label, filename), os.path.join(val_dir, label, filename))
                count += 1
            else:
                os.makedirs(os.path.join(train_dir, label), exist_ok=True)
                shutil.copy2(os.path.join(input_dir, label, filename), os.path.join(train_dir, label, filename))
                count += 1

    trains = []
    for (path, dir, files) in os.walk(train_dir):
        for filename in files:
            ext = os.path.splitext(filename)[-1].lower()
            if ext in ('.png', '.jpg', '.jpeg'):
                trains.append(filename)

    vals = []
    for (path, dir, files) in os.walk(val_dir):
        for filename in files:
            ext = os.path.splitext(filename)[-1].lower()
            if ext in ('.png', '.jpg', '.jpeg'):
                vals.append(filename)

    print(len(trains), len(vals))


if __name__ == '__main__':
    main()
