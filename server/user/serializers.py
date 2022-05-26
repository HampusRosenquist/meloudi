from rest_framework import serializers
from music.serializers import SongSerializer
from music.models import Song
from user import models

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'username', 'email']

class PlaylistSerializer(serializers.HyperlinkedModelSerializer):
    songs_data = SongSerializer(source='songs', many=True, read_only=True)
    owner_name = serializers.CharField(source='owner.username', read_only=True)
    owner = serializers.HyperlinkedRelatedField(view_name='user-detail', read_only=True)
    songs = serializers.HyperlinkedRelatedField(
        queryset=Song.objects.all(),
        view_name='song-detail',
        many=True,
        allow_empty=True
    )
    date = serializers.ReadOnlyField()

    class Meta:
        model = models.Playlist
        fields = ['id', 'owner', 'owner_name', 'title', 'description', 'songs',
                    'songs_data','is_public', 'minutes', 'amount', 'date']