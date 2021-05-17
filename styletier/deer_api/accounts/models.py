from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin

class UserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(
            email=UserManager.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        u = self.create_user(email=email,
                             password=password,
                             )
        u.is_admin = True
        u.save(using=self._db)
        return u


class User(AbstractBaseUser,  PermissionsMixin):
    username = None
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=10, blank=False, default='')
    avatar = models.ImageField( null=True, blank=True, upload_to='image/avatar/',)
    phone_num = models.CharField(max_length=20, null = True,blank=True)
    address = models.CharField(max_length=50, null=True, blank=True)
    postal_code = models.CharField(max_length=10,null=True, blank=True)
    user_type = models.PositiveIntegerField(blank=True, null=True) # 유저 타입(1: 관리자, 2: 사슴, 3: 회원, 4: 제조업자)
    mileage = models.PositiveIntegerField(blank=True, null=True) # 마일리지
    rank = models.PositiveIntegerField(blank=False, null=True) # 등급
    height = models.PositiveIntegerField(blank=True, null=True)
    weight = models.PositiveIntegerField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def get_full_name(self):
        # The user is identified by their email address
        return self.email

    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

class Deer(models.Model):
    user_id = models.OneToOneField(User,on_delete=models.CASCADE,related_name='deer')
    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    youtubeCh_url = models.URLField(blank=True, null=True)
    intro_text1 = models.TextField(blank=True, null=True)
    intro_text2 = models.TextField(blank=True, null=True)