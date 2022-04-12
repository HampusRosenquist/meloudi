from rest_framework import serializers
from music import models

class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Artist
        fields = ['name', 'country']

class AlbumSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Album
        fields = ['title', 'artist', 'cover', 'minutes',
                    'minutes', 'amount', 'year']

class SongSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.Song
        fields = ['title', 'artist', 'album', 'seconds']