from rest_framework import serializers
from music import models

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Artist
        fields = ['name', 'country']

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    class Meta:
        model = models.Album
        fields = ['title', 'artist', 'artist_name', 'cover', 'minutes',
                    'minutes', 'amount', 'year']

class SongSerializer(serializers.HyperlinkedModelSerializer):
    artist_name = serializers.CharField(source='artist.name', read_only=True)
    album_name = serializers.CharField(source='album.title', read_only=True)
    class Meta:
        model = models.Song
        fields = ['title', 'artist', 'artist_name', 'album', 'album_name', 'seconds', 'index']