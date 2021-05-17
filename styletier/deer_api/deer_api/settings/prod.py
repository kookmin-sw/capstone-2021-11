from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False
# cors문제
ALLOWED_HOSTS = [".amazonaws.com", ".styletier.com", "172.31.34.172"]

# Application definition

INSTALLED_APPS.append('storages',)

MEDIA_ROOT = os.path.join(BASE_DIR, '')

# S3 Storage
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
# AWS Access
AWS_ACCESS_KEY_ID = secrets["AWS_ACCESS_KEY_ID"]
AWS_SECRET_ACCESS_KEY = secrets["AWS_SECRET_ACCESS_KEY"]
AWS_STORAGE_BUCKET_NAME = 'deer-s3-bucket'
# if using boto3
AWS_S3_REGION_NAME = 'ap-northeast-2'  # change to your region
AWS_S3_SIGNATURE_VERSION = 's3v4'
# S3 Save Link
STATIC_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/static/'
MEDIA_URL = f'https://{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com/media/'

SESSION_COOKIE_DOMAIN = 'styletier.com'
