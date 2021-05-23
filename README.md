[![Work in Repl.it](https://classroom.github.com/assets/work-in-replit-14baed9a392b3a25080506f3b7b6d57f295ec2978f6f33ec97e36a161684cbe9.svg)](https://classroom.github.com/online_ide?assignment_repo_id=382668&assignment_repo_type=GroupAssignmentRepo)
# 스콥
2021년 11조  https://kookmin-sw.github.io/capstone-2021-11/

# 1. 프로잭트 소개

## 페이버핏 
#### AI알고리즘을 이용한 사진 취향 분석 및 사진작가 매칭 시스템
- 사진 작가와 사진을 찍길 원하는 고객을 연결
- 고객은 AI 모델을 통해 본인의 취향과 맞는 사진 작가를 찾을 수 있음
    - 원하는 장르를 선택하면 사진 작가를 추천
    - 원하는 느낌의 사진을 올리면 비슷한 느낌의 사진과 촬영할 수 있는 작가를 추천   
- 

## 스타일티어
#### 20~30대 남성을 타겟으로 한 인플루언서 경험 기반 비디오 커머스 플랫폼
- 본인의 제품을 팔고 싶은 인플루언서와 인플루언서의 제품을 사고 싶은 소비자를 연결

# 2. 소개 영상

## Favorfit 페이버핏
[![Favorfit 페이버핏](https://img.youtube.com/vi/jv924Uk81JQ/maxresdefault.jpg)](https://www.youtube.com/watch?v=jv924Uk81JQ)
## Favorfit AI 테스트 프로그램 시연 영상
[![Favorfit 페이버핏AI](https://img.youtube.com/vi/xdPP0RVKHtE/maxresdefault.jpg)](https://youtu.be/xdPP0RVKHtE)
## StyleTier 스타일티어 시연 영상
TODO: 링크 추가 예정

# 3. 팀 소개

```markdown
이름    : 변근호
학번    : 20142681
E-mail  : bkh5922a@gmail.com

페이버핏 AI 모델 개발
```
```markdown
이름    : 오상기
학번    : 20142725
E-mail  : osk7237@gmail.com

스타일티어 DB, 백앤드 기획 및 개발
```
```markdown
이름    : 정민선
학번    : 20170126
E-mail  : jms0214@kookmin.ac.kr

스타일티어 프론트앤드 개발
```


# 4. 사용법

# 스타일티어

[![django version](https://img.shields.io/badge/django-3.1.5-black)](https://www.djangoproject.com/)
[![drf version](https://img.shields.io/badge/DRF-3.12.2-red)](https://www.django-rest-framework.org/)
[![mysql version](https://img.shields.io/badge/mysql-8.0.22-blue)](https://www.mysql.com/)

> Scop corp.

사슴무리 쇼핑몰 웹 페이지.

#### Getting Started

OS X & Linux & Windows :
```sh
pip install -r requirements.txt
cd deer/
python manage.py migrate
python manage.py runserver
```
  
# 페이버핏 AI
```
cd Scop_BAI_profile
```
#### Install
```
sudo pip install -r requirments.txt
```

#### 0. Dataset setting
```
python tools/rename_files.py \
python tools/val_maker.py 
```

#### 1-1. Train Model
```
CUDA_VISIBLE_DEVICES=0 python train.py --data ~/data/bai --pretrained
```

#### 1-2. Test Model
```
CUDA_VISIBLE_DEVICES=0 python test.py --data ~/data/bai --data_type all --resume results/model_best.pth \
CUDA_VISIBLE_DEVICES=0 python test.py --data ~/data/bai --data_type all --resume results/model_best.pth --tsne --debug_correct
```

#### 2. Extract Features
```
python extract_features.py --data ~/data/bai --model_path results/model_best.pth --csv_path results/features.csv
```

#### 3-1. Extract Similar Images
```
python extract_similar_images.py --data ~/data/bai/test --model_path results/model_best.pth --csv_path results/features.csv --result results/similar --extract_num 10
```

#### 3-2. Run Similar Image Extractor with simple GUI
```
python extractor.py
```

#### 4. Make .exe file
```
pyinstaller -w -D extractor.py
```


# 5. 기타

## Scop - Favorfit

> 2019.04–2019.06  
> 국민대 실전창업교육 1기: 1,2차 교육 이수  
> 2019.06-2019.12  
국민대학교 창업지원단 서포터즈 4기  
2019.07  
2019 국민대 창업지원단 글로벌 챌린지 교육 이수   
2019.07  
2019 국민대학교 예비창업 페키지 일반 2차 진행  
2019.08  
2019 국민대학교 제주 스타트업 아카데미 우수상  
2019.09  
2019 국민대학교 스타트업 아이디어 해커톤 최우수상  
2019.10  
2019 울산 창조 경제센터 경주 IP 창업캠프 이수   
2019.11  
2019 국민대학교 Teamplayer 창업캠프 장려상  
2019.11  
2019 중기부 예비창업패키지 심화교육 이수   
2019.11  
2019 국민대학교 K-SEED 투자 프로그램 이수   
2019.12  
2019 국민대학교 ICT 기술창업 트랜드 수료  
2020.01  
2020 NIPA 정보통신 산업진흥원 AI 컴퓨팅 자원 지원  
2020.03   
국민대학교 창업보육센터 입주   
2020.06  
기술보증기금 기술평가 1억원 보증 유치  
2020.08  
2020 도전 K-Startup 학생창업유망팀 300 선정  
2020.08 – 2021.02  
2020 중소벤처기업부 글로벌청년창업사관학교 1기   
2020.11  
글로벌청년창업사관학교 중간평가 양호    
2020.12  
2020 산학협력 EXPO 국민대학교 관련 선정    
2021.01  
EO GSEA 글로벌 청년창업경진대회 한국 본선 진출  
2021.02   
2021 NIPA 정보통신 산업진흥원 AI 컴퓨팅 자원 지원   
