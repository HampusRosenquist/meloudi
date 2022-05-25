from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser

from server.settings import AUTH_USER_MODEL

class User(AbstractUser):
    pass

class Playlist(models.Model):
    owner = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    songs = models.ManyToManyField('music.Song')
    is_public = models.BooleanField(default=False)
    date = models.DateField()

    @property
    def minutes(self):
        seconds = 0
        for song in self.songs.all():
            seconds += song.seconds
        return round(seconds/60)

    @property
    def amount(self):
        return len(self.songs.all())

    def __str__(self):
        return self.title