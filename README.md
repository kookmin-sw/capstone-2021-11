# 스콥
국민대학교 캡스톤 2021년 11조  [https://kookmin-sw.github.io/capstone-2021-11/](https://kookmin-sw.github.io/capstone-2021-11/)

- [프로잭트 소개](#프로잭트-소개)
- [소개 영상](#소개-영상)
- [팀 소개](#팀-소개)
- [사용법](#사용법)
- [기타](#기타)

<br><br>

# 프로잭트 소개

## 페이버핏 
#### AI알고리즘을 이용한 사진 취향 분석 및 사진작가 매칭 시스템
- 사진 작가와 사진을 찍길 원하는 고객을 연결   
- 이미지의 특징을 추출하고 비교해 비슷한 느낌의 사진을 찾는 인공지능 모델 개발
- 고객은 AI 모델을 통해 본인의 취향과 맞는 사진 작가를 찾을 수 있음
    - 원하는 장르를 선택하면 사진 작가를 추천
    - 원하는 느낌의 사진을 올리면 비슷한 느낌의 사진과 촬영할 수 있는 작가를 추천
<br>

## 스타일티어
#### 20~30대 남성을 타겟으로 한 인플루언서 경험 기반 비디오 커머스 플랫폼
- 본인의 제품을 팔고 싶은 인플루언서와 인플루언서의 제품을 사고 싶은 소비자를 연결
- 인플루언서가 제작한 컨텐츠(동영상 등)을 통해 본인의 상품을 홍보하고, 이를 스타일티어와 연결하여 소비자가 구매하도록 함
- 인플루언서는 판매에 적합하지 않은 플랫폼인 유튜브나 인스타그램을 통해 제품을 팔지 않아도 됨
- 인플루언서의 유명세를 통한 자연스러운 홍보 효과
- 인플루언서와 소비자는 전문적인 플랫폼을 통해 상품 거래
<br><br>

# Introduction

## Favorfit
#### Photo preference analysis and photographer matching system using AI
- Connect photographers and customers who want to take pictures  
- Developed an AI model that extracts and compares features of images to find similar photos  
- Customers can find photographers that suit their preferences through AI models 
     - Select the desired genre and recommend a photographer  
     - If you upload your favorite picture, we recommend a photographer who can take a similar picture
<br>

## StyleTier
#### Influencer experience-based video commerce platform targeting men in their 20s-30s
- Connecting influencers who want to sell their products and consumers who want to buy influencers's products
<br><br>

# 소개 영상
## Favorfit 페이버핏
[![Favorfit 페이버핏](https://img.youtube.com/vi/jv924Uk81JQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=jv924Uk81JQ)
<br><br>
## Favorfit AI 테스트 프로그램 시연 영상
[![Favorfit 페이버핏AI](https://img.youtube.com/vi/xdPP0RVKHtE/maxresdefault.jpg)](https://youtu.be/xdPP0RVKHtE)
<br><br>
## StyleTier 스타일티어 시연 영상
[![StyleTier 스타일티어](https://img.youtube.com/vi/XT1gmIea4xo/maxresdefault.jpg)](https://www.youtube.com/watch?v=XT1gmIea4xo)
<br><br>

# 팀 소개
- 변근호
    - 페이버핏 AI 모델 개발
    - 학번    : 20142681
    - E-mail  : bkh5922a@gmail.com
<br>
    
- 오상기
    - 스타일티어 DB, 백앤드 기획 및 개발
    - 학번    : 20142725
    - E-mail  : osk7237@gmail.com
<br>
    
- 정민선
    - 스타일티어 프론트앤드 개발
    - 학번    : 20170126
    - E-mail  : jms0214@kookmin.ac.kr
<br>

# 사용법
## 스타일티어
[![django version](https://img.shields.io/badge/django-3.1.5-black)](https://www.djangoproject.com/)
[![drf version](https://img.shields.io/badge/DRF-3.12.2-red)](https://www.django-rest-framework.org/)
[![mysql version](https://img.shields.io/badge/mysql-8.0.22-blue)](https://www.mysql.com/)
> Scop corp.

사슴무리 쇼핑몰 웹 페이지.

#####  Getting Started
```
cd styletier
```
##### OS X & Linux & Windows :
```sh
pip install -r requirements.txt
cd deer/
python manage.py migrate
python manage.py runserver
```
<br>

## 페이버핏 AI
[![python version](https://img.shields.io/badge/python-3.6-black)](https://www.python.org/)
[![pytorch version](https://img.shields.io/badge/PyTorch-1.4.0-red)](https://pytorch.org/)
[![opencv version](https://img.shields.io/badge/opencv-4.1.1-green)](https://opencv.org/)
[![numpy version](https://img.shields.io/badge/numpy-1.17.4-blue)](https://numpy.org/)
#####  Getting Started
```
cd Scop_BAI_profile
```
##### Install
```
sudo pip install -r requirments.txt
```
##### 0. Dataset setting
```
python tools/rename_files.py \
python tools/val_maker.py 
```
##### 1-1. Train Model
```
CUDA_VISIBLE_DEVICES=0 python train.py --data ~/data/bai --pretrained
```
##### 1-2. Test Model
```
CUDA_VISIBLE_DEVICES=0 python test.py --data ~/data/bai --data_type all --resume results/model_best.pth \
CUDA_VISIBLE_DEVICES=0 python test.py --data ~/data/bai --data_type all --resume results/model_best.pth --tsne --debug_correct
```
##### 2. Extract Features
```
python extract_features.py --data ~/data/bai --model_path results/model_best.pth --csv_path results/features.csv
```
##### 3-1. Extract Similar Images
```
python extract_similar_images.py --data ~/data/bai/test --model_path results/model_best.pth --csv_path results/features.csv --result results/similar --extract_num 10
```
##### 3-2. Run Similar Image Extractor with simple GUI
```
python extractor.py
```
##### 4. Make .exe file
```
pyinstaller -w -D extractor.py
```
<br>

# 기타

## Scop - Favorfit
> **2019.04–2019.06**  국민대 실전창업교육 1기: 1,2차 교육 이수  
**2019.06-2019.12**  국민대학교 창업지원단 서포터즈 4기  
**2019.07**  2019 국민대 창업지원단 글로벌 챌린지 교육 이수   
**2019.07**  2019 국민대학교 예비창업 페키지 일반 2차 진행  
**2019.08**  2019 국민대학교 제주 스타트업 아카데미 우수상  
**2019.09**  2019 국민대학교 스타트업 아이디어 해커톤 최우수상  
**2019.10**  2019 울산 창조 경제센터 경주 IP 창업캠프 이수   
**2019.11**  2019 국민대학교 Teamplayer 창업캠프 장려상  
**2019.11**  2019 중기부 예비창업패키지 심화교육 이수   
**2019.11**  2019 국민대학교 K-SEED 투자 프로그램 이수   
**2019.12**  2019 국민대학교 ICT 기술창업 트랜드 수료  
**2020.01**  2020 NIPA 정보통신 산업진흥원 AI 컴퓨팅 자원 지원  
**2020.03**  국민대학교 창업보육센터 입주   
**2020.06**  기술보증기금 기술평가 1억원 보증 유치  
**2020.08**  2020 도전 K-Startup 학생창업유망팀 300 선정  
**2020.08 – 2021.02**  2020 중소벤처기업부 글로벌청년창업사관학교 1기   
**2020.11**  글로벌청년창업사관학교 중간평가 양호    
**2020.12**  2020 산학협력 EXPO 국민대학교 관련 선정    
**2021.01**  EO GSEA 글로벌 청년창업경진대회 한국 본선 진출  
**2021.02**  2021 NIPA 정보통신 산업진흥원 AI 컴퓨팅 자원 지원   
