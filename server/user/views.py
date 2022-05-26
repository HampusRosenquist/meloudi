from datetime import date
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from user import serializers, models

class IsOwner(permissions.BasePermission):
    """Allow users to interact with their own playlists."""

    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all().order_by('username')
    serializer_class = serializers.UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class PlaylistViewSet(viewsets.ModelViewSet):
    queryset = models.Playlist.objects.all().order_by('title')
    serializer_class = serializers.PlaylistSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    
    def list(self, request):
        queryset = models.Playlist.objects.filter(owner=request.user.id)
        serializer_context = { 'request': request }
        serializer = serializers.PlaylistSerializer(
            queryset, context=serializer_context, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # The request user is set as owner automatically, so is the date.
        serializer.save(owner=self.request.user, date=date.today())

    
