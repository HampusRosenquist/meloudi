# Generated by Django 4.0.3 on 2022-04-12 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_rename_name_album_title_rename_name_song_title_and_more'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='songs',
            field=models.ManyToManyField(to='music.song'),
        ),
    ]
