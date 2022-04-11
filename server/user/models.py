from django.db import models

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=200)

    def __str__(self):
        return self.username

class Playlist(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    #songs = models.ManyToManyRel('music.Song')
    is_public = models.BooleanField(default=False)
    minutes = models.PositiveSmallIntegerField()
    amount = models.PositiveSmallIntegerField()
    date = models.DateField()

    def __str__(self):
        return self.title