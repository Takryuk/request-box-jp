from rest_framework import serializers
from djoser.serializers import UserSerializer
from django.contrib.auth import get_user_model
from django.db.models import Sum

from .models import Profile


User = get_user_model()


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            'id',
            'profile',
            'image',
            'username',
        ]


    # def get_image(self, obj):
    #     return obj.get_absolute_image_url
        # request = self.context.get('request')
        # image = obj.image.url
        # return request.build_absolute_uri(image)


#プライベートな情報に注意！
class UserProfileSerializer(UserSerializer):
    # profile = serializers.SerializerMethodField()
    # profile_id = serializers.SerializerMethodField()
    # profile_image = serializers.SerializerMethodField()
    profile = ProfileSerializer()

    
    class Meta(UserSerializer.Meta):
        model = User
        fields = [
            'id', 
            'email', 
            # 'username',
            'profile',
            # 'profile_id',
            # 'profile', 
            # 'image',
        ]

    def to_representation(self, obj):
        representation = super().to_representation(obj)
        field = 'profile'
        inner_representation = representation.pop(field)
        if inner_representation:
            for key in inner_representation:
                representation[field+"_"+key] = inner_representation[key]    
        return representation


    # def get_profile(self, obj):
    #     profile = Profile.objects.filter(user=obj).first()
    #     return profile.id

    # def get_profile(self, obj):
    #     profile = Profile.objects.filter(user=obj).first()
    #     return profile.profile

    # def get_image(self, obj):
    #     profile = Profile.objects.filter(user=obj).first()
        
    #     return profile.image

        # return obj.purchaserecord_set.filter(paid=False).aggregate(points=Sum('points'))['points']





class PublicProfileSerializer(UserSerializer):
    # username = serializers.SerializerMethodField()
    class Meta(UserSerializer.Meta):
        model = Profile
        fields = ['id', 'username','profile', 'image']


    # def get_username(self, obj):
    #     return obj.user.username
        # profile = Profile.objects.filter(user=obj).first()
        # user_profile = ProfileSerializer(profile).data


        # return user_profile

# class Purchase

# class HasPurchasedSerializer(serializers.ModelSerializer):
#     has_purchased = serializers.SerializerMethodField()

#     class Meta:
#         model = User

#     def get_has_purchased(self, obj):
        
#         user = None
#         request = self.context.get("request")
#         if request and hasattr(request, "user"):
#             user = request.user
#             try:
#                 if obj in user.profile.purchased_videos.all():
#                     return True
#                 else:
#                     return False
#             except:
#                 pass
#         return False
        



