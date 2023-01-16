from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User
from django.core.paginator import Paginator, EmptyPage
from django.views.generic import ListView, DetailView
from django.views.decorators.csrf import csrf_protect

from .models import *

# for analisis
from analytics.mixins import ObjectViewMixin
from analytics.signals import object_viewed_signal
from analytics.models import ObjectViewed

#decorators
from .decorators import *

#for filtration
from .filters import *

#for forms
from .forms import *


import json

# Create your views here.


def home(request):
	top_posts = Story.objects.filter(top_3=True)
	posts = Story.posts.filter().order_by('-posted_date')
	
	myFilter = StoryFilter(request.GET, queryset=posts)
	posts = myFilter.qs
	
	# if request.method == 'POST':
	# 	data = json.loads(request.body)
	# 	print(data['form']['amount'])



	if request.method == 'GET':
		try:
			page_num = request.GET.get('page', 1)
			paginator_obj = Paginator(posts, 20)
			posts = paginator_obj.page(page_num)
			
			
		except EmptyPage:
			posts = paginator_obj.page(1)



	context = {'posts':posts, 'top_posts':top_posts, 'filter':myFilter} 
	return render(request, 'stories/home.html', context)


@allowed_users(allowed_roles=['admin'])
def admin_page(request):
	storyForm = CreateStoryForm()
	themeForm = CreateThemeForm()
	cityForm = CreateCityForm()
	

	

	if access_form(request, 'create_card'):

		storyForm = CreateStoryForm(request.POST, request.FILES)
		files = request.FILES.getlist('images')
		cities = request.POST.getlist('cities')
		themes = request.POST.getlist('themes')

		if storyForm.is_valid():
			messages.success(request, 'Story was created successfuly')
			new_post = storyForm.save(commit=False)
			new_post.save()

			if len(files) > 0:
				for f in files:
					img = Image(image=f)
					img.save()
					new_post.images.add(img)
			else:
				img = Image()
				img.save()
				new_post.images.add(img)
	
			for city in cities:
				new_post.cities.add(city)
				
			for theme in themes:
				new_post.themes.add(theme)

			new_post.save()

			return redirect('admin-page')
			
		else:
			messages.info(request, 'Something went wrong')

	elif access_form(request, 'create_theme'):
		themeForm = CreateThemeForm(request.POST)

		if themeForm.is_valid():
			messages.success(request, 'Theme was created successfuly')
			themeForm.save()
			return redirect('admin-page')
		else:
			messages.info(request, 'Something went wrong')


	elif access_form(request, 'create_city'):
		cityForm = CreateCityForm(request.POST)
	
		if cityForm.is_valid():
			messages.success(request, 'City was created successfuly')
			cityForm.save()
			return redirect('admin-page')
		else:
			messages.info(request, 'Something went wrong')

	context = {'storyForm':storyForm, 'themeForm':themeForm, 'cityForm':cityForm}
	return render(request, 'stories/admin_panel.html', context)

# for access forms without repeating yourself
def access_form(request, access_word=str):
	request_list = [x[0] for x in list(request.POST.items())]
	
	if request.method == 'POST' and access_word in request_list:
		return True
	else:
		return False




def story_page(request, pk):
	story = Story.posts.filter(id=pk)
	instance = story.first()
	all_story = Story.objects.all()
	images = Story.objects.get(id=pk).images.all()
	
	
	if request.method == "GET":
		try: 
			paginator_images = Paginator(images, 2)
			print(paginator_images.object_list)
			
		except EmptyPage:
			pass



	key_list = []

	if len(story) == 0:
		return redirect('home')

	else:
		if request.method == 'POST':
			active_story = Story.objects.get(id=pk)
			active_story = CreateStoryForm(instance=active_story).save(commit=False)
			active_story.is_active = False
			active_story.save()
			return redirect('home')

		try:
			for x in ObjectViewed.objects.filter(object_id=pk):
				key_list.append(x.session_key)
				
			if bool(key_list):
				
				if request.COOKIES['device'] not in key_list:
					object_viewed_signal.send(instance.__class__, instance = instance, request=request)
					
				else:
					pass
			else:
				object_viewed_signal.send(instance.__class__, instance = instance, request=request)

		except KeyError:
			redirect('home')

		
		all_story_viewed = {}

		for i in all_story:
			all_story_viewed.update({i.id:ObjectViewed.objects.filter(object_id=i.id).count()})

		for old_obj in all_story_viewed.keys():
			old_story = Story.objects.get(id=old_obj)
			old_story = CreateStoryForm(instance=old_story).save(commit=False)
			old_story.top_3 = False
			old_story.save()
		
			

		for obj_id in sorted(all_story_viewed, key=all_story_viewed.get, reverse=True)[:3]:
			new_story = Story.objects.get(id=obj_id)
			new_story = CreateStoryForm(instance=new_story).save(commit=False)
			new_story.top_3 = True
			new_story.save()
		

	context = {'story':story, 'paginator_images': paginator_images}

	return render(request, 'stories/story_page.html', context)


def checkout_page(request):
	
	return render(request, 'stories/checkout.html')
