from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Playlist

admin.site.register(User, UserAdmin)
admin.site.register(Playlist)
