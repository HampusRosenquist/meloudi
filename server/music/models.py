from sys import maxsize
from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Album(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    cover = models.CharField(max_length=100)
    year = models.PositiveSmallIntegerField(default=1)

    @property
    def minutes(self):
        seconds = 0
        for song in Song.objects.select_related().filter(album = self.id):
            seconds += song.seconds
        return round(seconds/60)

    @property
    def amount(self):
        return len(Song.objects.filter(album = self.id))

    def __str__(self):
        return self.title

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    seconds = models.PositiveSmallIntegerField()
    index = models.PositiveSmallIntegerField(default=1)
    file = models.CharField(max_length=100)

    def __str__(self):
        return self.title