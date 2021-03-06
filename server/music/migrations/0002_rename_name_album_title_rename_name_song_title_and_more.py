# Generated by Django 4.0.3 on 2022-04-12 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='album',
            old_name='name',
            new_name='title',
        ),
        migrations.RenameField(
            model_name='song',
            old_name='name',
            new_name='title',
        ),
        migrations.AddField(
            model_name='album',
            name='year',
            field=models.PositiveSmallIntegerField(default=1),
        ),
        migrations.AddField(
            model_name='song',
            name='index',
            field=models.PositiveSmallIntegerField(default=1),
        ),
    ]
