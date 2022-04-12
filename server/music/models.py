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
    minutes = models.PositiveSmallIntegerField()
    amount = models.PositiveSmallIntegerField()
    year = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.title

class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    seconds = models.PositiveSmallIntegerField()
    index = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.title