from django.forms import ModelForm
from django import forms

from .models import *



CHOICES = Themes.objects.all()
choices_city = City.objects.all()



class CreateStoryForm(ModelForm):


	images = forms.ImageField(
		required=False,
  		widget=forms.ClearableFileInput(attrs={'multiple':True}),
  		
  	)	

	cities = forms.ModelMultipleChoiceField(
        queryset=choices_city,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )

	themes = forms.ModelMultipleChoiceField(
        queryset=CHOICES,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
  	
 
  		
 
	class Meta:
		
		model = Story
		fields = '__all__'
		exclude = ['objects', 'posts', 'image']
		widgets = {
			'title': forms.TextInput(attrs={'class':'create_card__input'}),
			'description': forms.TextInput(attrs={'class':'create_card__input',}),
			
		}
		

class CreateThemeForm(ModelForm):

	class Meta:
		model = Themes
		fields = '__all__'
		widgets = {
			'theme': forms.TextInput(attrs={'class':'create_themes__input create_card__input',}),
		}


class CreateCityForm(ModelForm):
	class Meta:
		model = City
		fields = '__all__'
		widgets = {
			'city':forms.TextInput(attrs={'class':'create_city__input create_card__input',})
		}

