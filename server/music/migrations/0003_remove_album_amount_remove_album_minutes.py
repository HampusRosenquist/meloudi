# Generated by Django 4.0.3 on 2022-04-12 14:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_rename_name_album_title_rename_name_song_title_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='album',
            name='amount',
        ),
        migrations.RemoveField(
            model_name='album',
            name='minutes',
        ),
    ]
