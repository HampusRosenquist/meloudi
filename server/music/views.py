from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from music import serializers, models

def index(resquest):
    return HttpResponse("User view.")

class ArtistViewSet(viewsets.ModelViewSet):
    queryset = models.Artist.objects.all().order_by('name')
    serializer_class = serializers.ArtistSerializer
    permission_classes = [permissions.AllowAny]

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = models.Album.objects.all().order_by('artist', '-year')
    serializer_class = serializers.AlbumSerializer
    permission_classes = [permissions.AllowAny]

class SongViewSet(viewsets.ModelViewSet):
    queryset = models.Song.objects.all().order_by('album', 'index')
    serializer_class = serializers.SongSerializer
    permission_classes = [permissions.AllowAny]