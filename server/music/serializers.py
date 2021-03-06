from rest_framework import serializers
from music import models

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Artist
        fields = ['id', 'name', 'country']

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    class Meta:
        model = models.Album
        fields = ['id', 'title', 'artist', 'artist_name', 'cover', 'minutes',
                    'minutes', 'amount', 'year']

class SongSerializer(serializers.HyperlinkedModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    album_title = serializers.CharField(source='album.title', read_only=True)
    class Meta:
        model = models.Song
        fields = ['id', 'title', 'artist', 'artist_name', 'album', 'album_title', 'seconds', 'index', 'file']