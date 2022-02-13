from django.core import serializers as django_serializers
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from .models import Message 


class MessageListSerializer(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField()
    class Meta:
        model = Message
        ordering =['id']
        fields = (
            'id',
            'message',
            'created_at'
        )

    def get_created_at(self, obj):
        return obj.created_at.strftime('%Y/%m/%d %H:%M:%S')


class MessageCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = (
            'id',
            'message',
            'created_at',
            'receiver',
        )