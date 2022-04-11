from sys import maxsize
from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)

class Album(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    cover = models.CharField(max_length=100)
    minutes = models.PositiveSmallIntegerField()
    amount = models.PositiveSmallIntegerField()
    

class Song(models.Model):
    name = models.CharField(max_length=100)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    seconds = models.PositiveSmallIntegerField()