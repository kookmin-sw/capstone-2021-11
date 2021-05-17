import os

import cv2
import numpy as np
import torch.nn as nn
import torch.nn.parallel
import torch.optim
from PyQt5 import QtCore, QtGui
from PyQt5.QtWidgets import QApplication, QDialog, QFileDialog, QMessageBox, QLineEdit, QPushButton, QLabel, QListWidget
from scipy import spatial

VERSION = '0.0.2'


def conv3x3(in_planes, out_planes, stride=1, groups=1, dilation=1):
    return nn.Conv2d(in_planes, out_planes, kernel_size=3, stride=stride, padding=dilation, groups=groups, bias=False, dilation=dilation)


def conv1x1(in_planes, out_planes, stride=1):
    return nn.Conv2d(in_planes, out_planes, kernel_size=1, stride=stride, bias=False)


def softmax(x):
    e_x = np.exp(x - np.max(x))
    return e_x / e_x.sum(axis=0)


class BasicBlock(nn.Module):
    expansion = 1

    def __init__(self, inplanes, planes, stride=1, downsample=None, groups=1, base_width=64, dilation=1, norm_layer=None):
        super(BasicBlock, self).__init__()
        if norm_layer is None:
            norm_layer = nn.BatchNorm2d
        if groups != 1 or base_width != 64:
            raise ValueError('BasicBlock only supports groups=1 and base_width=64')
        if dilation > 1:
            raise NotImplementedError("Dilation > 1 not supported in BasicBlock")

        # Both self.conv1 and self.downsample layers downsample the input when stride != 1
        self.conv1 = conv3x3(inplanes, planes, stride)
        self.bn1 = norm_layer(planes)
        self.relu = nn.ReLU(inplace=True)
        self.conv2 = conv3x3(planes, planes)
        self.bn2 = norm_layer(planes)
        self.downsample = downsample
        self.stride = stride

    def forward(self, x):
        identity = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.relu(out)

        out = self.conv2(out)
        out = self.bn2(out)

        if self.downsample is not None:
            identity = self.downsample(x)

        out += identity
        out = self.relu(out)

        return out


class ResNet(nn.Module):
    def __init__(self, block=BasicBlock, layers=[2, 2, 2, 2], num_classes=21, groups=1, width_per_group=64, replace_stride_with_dilation=None, norm_layer=None):
        super(ResNet, self).__init__()
        if norm_layer is None:
            norm_layer = nn.BatchNorm2d
        self._norm_layer = norm_layer

        self.inplanes = 64
        self.dilation = 1
        if replace_stride_with_dilation is None:
            # each element in the tuple indicates if we should replace
            # the 2x2 stride with a dilated convolution instead
            replace_stride_with_dilation = [False, False, False]
        if len(replace_stride_with_dilation) != 3:
            raise ValueError("replace_stride_with_dilation should be None or a 3-element tuple, got {}".format(replace_stride_with_dilation))

        self.groups = groups
        self.base_width = width_per_group
        self.conv1 = nn.Conv2d(3, self.inplanes, kernel_size=7, stride=2, padding=3, bias=False)
        self.bn1 = norm_layer(self.inplanes)
        self.relu = nn.ReLU(inplace=True)
        self.maxpool = nn.MaxPool2d(kernel_size=3, stride=2, padding=1)
        self.layer1 = self._make_layer(block, 64, layers[0])
        self.layer2 = self._make_layer(block, 128, layers[1], stride=2, dilate=replace_stride_with_dilation[0])
        self.layer3 = self._make_layer(block, 256, layers[2], stride=2, dilate=replace_stride_with_dilation[1])
        self.layer4 = self._make_layer(block, 512, layers[3], stride=2, dilate=replace_stride_with_dilation[2])
        self.avgpool = nn.AdaptiveAvgPool2d((1, 1))

        self.fc1 = nn.Linear(512 * block.expansion, 64)
        self.fc2 = nn.Linear(64, num_classes)

        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight, mode='fan_out', nonlinearity='relu')
            elif isinstance(m, (nn.BatchNorm2d, nn.GroupNorm)):
                nn.init.constant_(m.weight, 1)
                nn.init.constant_(m.bias, 0)

    def _make_layer(self, block, planes, blocks, stride=1, dilate=False):
        norm_layer = self._norm_layer
        downsample = None
        previous_dilation = self.dilation
        if dilate:
            self.dilation *= stride
            stride = 1
        if stride != 1 or self.inplanes != planes * block.expansion:
            downsample = nn.Sequential(conv1x1(self.inplanes, planes * block.expansion, stride), norm_layer(planes * block.expansion))

        layers = []
        layers.append(block(self.inplanes, planes, stride, downsample, self.groups, self.base_width, previous_dilation, norm_layer))
        self.inplanes = planes * block.expansion
        for _ in range(1, blocks):
            layers.append(block(self.inplanes, planes, groups=self.groups, base_width=self.base_width, dilation=self.dilation, norm_layer=norm_layer))

        return nn.Sequential(*layers)

    def forward(self, x):
        x = self.conv1(x)
        x = self.bn1(x)
        x = self.relu(x)
        x = self.maxpool(x)

        x = self.layer1(x)
        x = self.layer2(x)
        x = self.layer3(x)
        x = self.layer4(x)

        x = self.avgpool(x)
        x = x.reshape(x.size(0), -1)

        features = self.fc1(x)
        x = self.relu(features)
        x = self.fc2(x)
        return x, features


class UIDialog(object):
    def setupUi(self, InputDialog):
        self.LoadingMsgBox = QMessageBox()
        self.LoadingMsgBox.setWindowTitle("Scop BAI Images Test Program (Version: {})".format(VERSION))

        InputDialog.setObjectName("InputDialog")
        InputDialog.resize(1320, 562)

        self.InputLabel = QLabel(InputDialog)
        self.InputLabel.setGeometry(QtCore.QRect(10, 15, 54, 12))
        self.InputLabel.setObjectName("InputLabel")
        self.InputPathLine = QLineEdit(InputDialog)
        self.InputPathLine.setGeometry(QtCore.QRect(64, 15, 358, 20))
        self.InputPathLine.setCursor(QtGui.QCursor(QtCore.Qt.ArrowCursor))
        self.InputPathLine.setReadOnly(True)
        self.InputPathLine.setObjectName("InputPathLine")
        self.InputSelectButton = QPushButton(InputDialog)
        self.InputSelectButton.setGeometry(QtCore.QRect(438, 15, 84, 20))
        self.InputSelectButton.setCursor(QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.InputSelectButton.setObjectName("InputSelectButton")
        self.InputimageLabel = QLabel(InputDialog)
        self.InputimageLabel.setGeometry(QtCore.QRect(10, 40, 512, 512))
        self.InputimageLabel.setObjectName("InputimageLabel")
        self.InputimageLabel.setStyleSheet("background-color: white")

        self.OutputLabel = QLabel(InputDialog)
        self.OutputLabel.setGeometry(QtCore.QRect(20 + 512, 15, 56, 12))
        self.OutputLabel.setObjectName("OutputLabel")
        self.OutputimageLabel = QLabel(InputDialog)
        self.OutputimageLabel.setGeometry(QtCore.QRect(20 + 512, 40, 512, 512))
        self.OutputimageLabel.setAcceptDrops(False)
        self.OutputimageLabel.setObjectName("OutputimageLabel")
        self.OutputimageLabel.setStyleSheet("background-color: white")
        self.OutputListView = QListWidget(InputDialog)
        self.OutputListView.setGeometry(QtCore.QRect(30 + 512 * 2, 40, 256, 512))
        self.OutputListView.viewport().setProperty("cursor", QtGui.QCursor(QtCore.Qt.PointingHandCursor))
        self.OutputListView.setMouseTracking(False)
        self.OutputListView.setObjectName("OutputListView")

        self.retranslateUi(InputDialog)
        QtCore.QMetaObject.connectSlotsByName(InputDialog)

    def retranslateUi(self, InputDialog):
        _translate = QtCore.QCoreApplication.translate
        InputDialog.setWindowTitle(_translate("InputDialog", "Dialog"))
        self.InputLabel.setText(_translate("InputDialog", "Input"))
        self.InputSelectButton.setText(_translate("InputDialog", "select"))
        self.OutputLabel.setText(_translate("InputDialog", "Output"))


class ExtractorDialog(QDialog, UIDialog):
    def __init__(self):
        QDialog.__init__(self)
        self.setupUi(self)
        self.setWindowTitle("Scop BAI Images Test Program (Version: {})".format(VERSION))

        self.LoadingMsgBox.show()

        self.model_path = 'data/model_best.pth'
        self.csv_path = 'data/features.csv'

        self.model = self.load_model(self.model_path)
        self.csv_data = self.read_csv_data(self.csv_path)

        self.extract_num = 20

        self.InputSelectButton.clicked.connect(self.input_button_clicked)
        self.OutputListView.itemClicked.connect(self.output_item_clicked)

        self.LoadingMsgBox.close()

    def load_model(self, model_path):
        model = ResNet()
        checkpoint = torch.load(model_path, map_location=torch.device('cpu'))
        model.load_state_dict(checkpoint['state_dict'])
        model = model.cuda() if torch.cuda.is_available() else model
        return model

    def read_csv_data(self, csv_path):
        csv_data = {}
        with open(csv_path, 'r') as fp:
            for line in fp.readlines():
                line_split = line.replace('\n', '').split(',')
                csv_data[line_split[0]] = np.array([float(x) for x in line_split[1:]])
        return csv_data

    def resize_and_pad_image(self, img, input_size=224):
        # 1) resize image
        old_size = img.shape[:2]
        ratio = float(input_size) / max(old_size)
        new_size = tuple([int(x * ratio) for x in old_size])
        img = cv2.resize(img, (new_size[1], new_size[0]))

        # 2) pad image
        delta_w = input_size - new_size[1]
        delta_h = input_size - new_size[0]
        top, bottom = delta_h // 2, delta_h - (delta_h // 2)
        left, right = delta_w // 2, delta_w - (delta_w // 2)
        img = cv2.copyMakeBorder(img, top, bottom, left, right, cv2.BORDER_CONSTANT, value=[0, 0, 0])

        return img

    def read_image(self, img_path):
        mean = np.array([0.485, 0.456, 0.406], dtype=np.float32).reshape(1, 1, 3)
        std = np.array([0.229, 0.224, 0.225], dtype=np.float32).reshape(1, 1, 3)

        # 1) Read Image
        stream = open(img_path, "rb")
        bytes = bytearray(stream.read())
        numpyarray = np.asarray(bytes, dtype=np.uint8)
        img = cv2.imdecode(numpyarray, cv2.IMREAD_IGNORE_ORIENTATION | cv2.IMREAD_COLOR)

        # 2) Resize and Pad Image
        input_image = self.resize_and_pad_image(img, input_size=224)

        # 3) Convert as tensor shape
        input_image = (input_image.astype(np.float32) / 255.)
        input_image = (input_image - mean) / std
        input_image = input_image.transpose(2, 0, 1)

        return torch.from_numpy(np.array([input_image]))

    def open_image_as_pixmap(self, image_path):
        stream = open(image_path, "rb")
        bytes = bytearray(stream.read())
        numpyarray = np.asarray(bytes, dtype=np.uint8)
        cv_img = cv2.imdecode(numpyarray, cv2.IMREAD_IGNORE_ORIENTATION | cv2.IMREAD_COLOR)
        cv_img = cv2.cvtColor(cv_img, cv2.COLOR_BGR2RGB)
        cv_img = self.resize_and_pad_image(cv_img, input_size=512)
        h, w, c = cv_img.shape
        bpl = 3 * w
        qtimage = QtGui.QImage(cv_img.data, w, h, bpl, QtGui.QImage.Format_RGB888)
        qtpixmap = QtGui.QPixmap(qtimage)
        return qtpixmap

    def input_button_clicked(self):
        image_path = QFileDialog.getOpenFileName(self, 'OpenFile')[0]

        if not os.path.splitext(image_path)[-1].lower() in ('.png', '.jpg', '.jpeg'):
            return

        self.OutputListView.clear()
        self.InputPathLine.setText(image_path)

        input_pixmap = self.open_image_as_pixmap(image_path)
        self.InputimageLabel.setPixmap(input_pixmap)

        self.extract_similar_images(image_path)

        output_pixmap = self.open_image_as_pixmap(self.OutputListView.item(0).text())
        self.OutputimageLabel.setPixmap(output_pixmap)

    def output_item_clicked(self, item):
        output_pixmap = self.open_image_as_pixmap(item.text())
        self.OutputimageLabel.setPixmap(output_pixmap)

    def extract_similar_images(self, image_path):
        self.model.eval()
        with torch.no_grad():
            image = self.read_image(image_path)
            image = image.cuda(non_blocking=True) if torch.cuda.is_available() else image

            output, feature = self.model(image)
            feature = feature[0].cpu().data.numpy()

            distances = []
            for compare_file_path, compare_feature in self.csv_data.items():
                distance = spatial.distance.cosine(feature, compare_feature)
                distances.append([compare_file_path, distance])

            for line in sorted(distances, key=lambda x: x[1])[:self.extract_num]:
                self.OutputListView.addItem(line[0])


if __name__ == '__main__':
    app = QApplication([])
    diag = ExtractorDialog()
    diag.show()
    app.exec()
