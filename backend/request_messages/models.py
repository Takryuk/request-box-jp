from django.db import models
# from django.contrib.auth import get_user_model
from django.core.validators import MaxLengthValidator

from users.models import Profile


# User = get_user_model()
# Create your models here.


class Message(models.Model):
    receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True)
    # message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    message = models.TextField(
        max_length=300,
        validators=[MaxLengthValidator(300)]
    )
    is_negative=models.BooleanField(default=False)
