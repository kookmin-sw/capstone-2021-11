import os

input_dir = os.path.expanduser('~/data/bai/all')


def main():
    for label in os.listdir(input_dir):
        for file_index, filename in enumerate(os.listdir(os.path.join(input_dir, label))):
            ext = os.path.splitext(filename)[-1].lower()
            new_filename = '{}_{}{}'.format(label, str(file_index), ext)
            os.renames(os.path.join(input_dir, label, filename), os.path.join(input_dir, label, new_filename))


if __name__ == '__main__':
    main()
