from rest_framework import viewsets, permissions
from music import serializers, models

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = models.Artist.objects.all().order_by('name')
    serializer_class = serializers.ArtistSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = models.Album.objects.all().order_by('artist', '-year')
    serializer_class = serializers.AlbumSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class SongViewSet(viewsets.ModelViewSet):
    queryset = models.Song.objects.all().order_by('album', 'index')
    serializer_class = serializers.SongSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]