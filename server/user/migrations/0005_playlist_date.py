# Generated by Django 4.0.3 on 2022-05-25 23:25

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0004_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='playlist',
            name='date',
            field=models.DateField(default=datetime.date(2022, 5, 26)),
            preserve_default=False,
        ),
    ]
