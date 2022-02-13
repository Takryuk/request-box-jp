from django.db import models
from .models import Message
from django.shortcuts import render
from rest_framework import generics, serializers
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    # BasePermission,
)

from .serializers import (
    MessageListSerializer,
    MessageCreateSerializer,
)
from .pagination import StandardResultsPagination
from users.models import Profile
# Create your views here.


class ReceiverMessageListView(generics.ListAPIView):
    serializer_class = MessageListSerializer
    pagination_class = StandardResultsPagination
    permission_classes = [IsAuthenticated]
    # ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user.profile
        messages = Message.objects.filter(receiver=user).order_by('-id')

        return messages


class MessageCreateView(generics.CreateAPIView):
    models = Message
    serializer_class = MessageCreateSerializer
    permission_classes=[AllowAny]

    def perform_create(self, serializer):
        uid = self.request.data.get('uid', None)
        if(uid is not None):
            try:
                receiver = Profile.objects.get(id=uid)
                if(serializer.is_valid()):
                    serializer.save(receiver=receiver)
            except:
                pass

