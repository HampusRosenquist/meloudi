from django.http import HttpResponse
from rest_framework import viewsets, permissions
from user import serializers, models

def index(request):
    return HttpResponse("User view.")

class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all().order_by('username')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.AllowAny]

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all().order_by('title')
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.AllowAny]
