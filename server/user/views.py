from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from user import serializers, models

def index(resquest):
    return HttpResponse("User view.")

class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all().order_by('username')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all().order_by('title')
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated]
