from django.db import models
from PIL import Image as Image_PIL

# for cool text field


# Create your models here.

# for posts filtration 
class PostsManager(models.Manager):
	def get_queryset(self):
		return super(PostsManager, self).get_queryset().filter(is_active=True)

class Themes(models.Model):
	theme = models.CharField(max_length=200, unique=True)

	def __str__(self):
		return self.theme

	class Meta:
		verbose_name_plural = 'Themes'

class City(models.Model):
	city = models.CharField(max_length=200, unique=True)

	def __str__(self):
		return self.city

	class Meta:
		verbose_name_plural = 'Cities'



class Story(models.Model):
	title = models.CharField(max_length=200)
	main_image = models.ImageField(default='default.png', upload_to='images', null=True)
	images = models.ManyToManyField('Image', blank=True)
	content = models.TextField(null=True)
	is_active = models.BooleanField(default=True)
	top_3 = models.BooleanField(default=False)
	objects = models.Manager()
	posts = PostsManager()
	themes = models.ManyToManyField(Themes, blank=True)	
	cities = models.ManyToManyField(City, blank=True)

	posted_date = models.DateTimeField(auto_now_add=True, null=True)
    

	def save(self):
		super().save()
		img = Image_PIL.open(self.main_image.path)
		if img.height > 900 or img.width > 900:
			output_size = (900, 900)
			
			img.thumbnail(output_size)
			img.save(self.main_image.path)


	def __str__(self):
		return self.title

	class Meta:
		verbose_name_plural = 'Stories'




	
class Image(models.Model):
	image = models.ImageField(default='default.png', upload_to='images', blank=True)

	def save(self):
		super().save()
		img = Image_PIL.open(self.image.path)
		if img.height > 1000 or img.width > 1000:
			output_size = (1000, 1000)
			img.thumbnail(output_size)
			img.save(self.image.path)

