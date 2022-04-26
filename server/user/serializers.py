from rest_framework import serializers
from music.serializers import SongSerializer
from user import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['username', 'email']

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    songs = SongSerializer(many=True)
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    class Meta:
        model = models.Playlist
        fields = ['owner', 'owner_name', 'title', 'description', 'songs',
                    'is_public', 'minutes', 'amount', 'date']