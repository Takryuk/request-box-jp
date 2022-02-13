import uuid
import math

# from PIL import Image
from io import BytesIO
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.core.files import File
from django.core.validators import MaxValueValidator, MinValueValidator

from imagekit.models import ImageSpecField, ProcessedImageField
from imagekit.processors import ResizeToFill

from common.validators import validate_image
# from contents.models import Video

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **kwargs):
        user = self.create_user(email, password, **kwargs)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        default=uuid.uuid4,
        primary_key=True,
        editable=False)
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = CustomUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

def image_upload_path(instance, filename):
    now = timezone.now()
    year = now.strftime('%Y')
    month = now.strftime('%m')
    day = now.strftime('%d')
    return f'user_image/{year}/{month}/{day}/{uuid.uuid4().hex[:16]}'


class Profile(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4,
        primary_key=True,
        editable=False
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,         
        on_delete=models.CASCADE)
    username = models.CharField(max_length=50, null=True, blank=True)
    image = models.ImageField(
        # processors=[ResizeToFill(1280, 1280)],
        # format='JPEG',
        # options={'quality': 50},
        blank=True,
        validators=[validate_image],
        upload_to=image_upload_path,
    )
    
    # profile = models.CharField(default='', max_length=1000, blank=True)
    profile = models.TextField(default='', max_length=1000, blank=True)
    is_official = models.BooleanField(default=False)


    
def user_model_post_save_receiver(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.update_or_create(user=instance, username=instance.username)
 
post_save.connect(user_model_post_save_receiver, sender=settings.AUTH_USER_MODEL)