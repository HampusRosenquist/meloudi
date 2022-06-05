from lyricsgenius import Genius
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from music import serializers, models

token = "DOllY3IzJYMHhuVG-inxzr_zzeYPBTJrYVzg_tYoYntRV1qqPt-zrf2CVqYD--lByQvsV78wUohJaTYU507Nzg"

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
    paginator = None

def lyrics(request):
    title = request.GET.get('title', '').replace('..', '').replace('/', '')
    artist = request.GET.get('artist', '').replace('..', '').replace('/', '')

    genius = Genius(token)
    lyrics = genius.search_song(title, artist).lyrics
    
    return HttpResponse(lyrics)

