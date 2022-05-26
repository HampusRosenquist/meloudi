from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from user import views as UserViews
from music import views as MusicViews

router = routers.DefaultRouter()
router.register(r'users', UserViews.UserViewSet)
router.register(r'playlists', UserViews.PlaylistViewSet)
router.register(r'artists', MusicViews.ArtistViewSet)
router.register(r'albums', MusicViews.AlbumViewSet)
router.register(r'songs', MusicViews.SongViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
