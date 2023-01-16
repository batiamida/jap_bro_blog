from django.contrib import admin
from .models import *

# Register your models here.

#customisation 
admin.site.site_header = 'Japan blog'


class StoryAdmin(admin.ModelAdmin):
	list_filter = ('is_active', 'posted_date')

	exclude = ['images']

admin.site.register(Story, StoryAdmin)
admin.site.register(Themes)
admin.site.register(City)
