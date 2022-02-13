from rest_framework import routers
from django.contrib import admin
from django.urls import include, path

from .views import (
    ReceiverMessageListView,
    MessageCreateView,
)

# router = routers.DefaultRouter()
# # router = routers.SimpleRouter()
# router.register('comment', CommentViewSet)
urlpatterns = [
    # path('', include(router.urls)),
    path('list', ReceiverMessageListView.as_view(), name='message-list'),
    path('create', MessageCreateView.as_view(), name='message-list'),
    # path('detail/<int:pk>', ItemDetailView.as_view(), name='item-detail'),
    # path('create/', ItemCreateView.as_view(), name='item-create'),
    # path('update/<int:pk>', ItemUpdateView.as_view(), name='item-update'),
    # path('create/', VideoCreateView.as_view(), name='video-create'),
    # path('update/<int:pk>', VideoUpdateView.as_view(), name='video-update'),    
    # # path('delete/<int:pk>', VideoDestroyView.as_view(), name='video-delete'),
    # path('has-purchased/<int:pk>', has_purchased, name='has-purchased'),
    # path('create-payment-intent/', create_payment, name='create-payment'),
    # path('purchase/<int:pk>', purchase, name='purchase'),
    # path('delete/<int:pk>', VideoDestroyView.as_view(), name='delete'),

]
