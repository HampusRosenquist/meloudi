from rest_framework import serializers
from user import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['username', 'email']

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Playlist
        fields = ['owner', 'title', 'description', 'songs',
                    'is_public', 'minutes', 'amount', 'date']