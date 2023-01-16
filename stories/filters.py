import django_filters
from .models import *
from django_filters.widgets import LinkWidget



class StoryFilter(django_filters.FilterSet):
	
  
	class Meta:
		model = Story
		fields = ['themes', 'cities']
		

