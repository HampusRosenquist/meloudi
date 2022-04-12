from django.db import models
from datetime import date
class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

    def __str__(self):
        return self.username

class Playlist(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    songs = models.ManyToManyField('music.Song')
    is_public = models.BooleanField(default=False)

    @property
    def minutes(self):
        seconds = 0
        for song in self.songs.all():
            seconds += song.seconds
        return round(seconds/60)

    @property
    def amount(self):
        return len(self.songs.all())

    @property
    def date(self):
        return date.today()

    def __str__(self):
        return self.title