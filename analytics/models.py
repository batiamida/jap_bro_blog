from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.sessions.models import Session



from .signals import object_viewed_signal

# Create your models here.



class ObjectViewed(models.Model):
	content_type = models.ForeignKey(ContentType, on_delete=models.SET_NULL, null=True)
	object_id = models.PositiveIntegerField() # 1,2,3 etc
	session_key = models.CharField(max_length = 100, null=True, blank=True)
	content_object = GenericForeignKey('content_type', 'object_id', 'session_key') # it's the actual object 
	viewed_on = models.DateTimeField(auto_now_add=True)

	

	def __str__(self):
		return str(self.content_type)

	class Meta:
		verbose_name_plural = 'Objects viewed'


def object_viewed_reciever(sender, instance, request, *args, **kwargs):
	user_views = ObjectViewed.objects.create(
		content_type = ContentType.objects.get_for_model(sender),
		object_id = instance.id,
		session_key = request.COOKIES['device'],

	)

object_viewed_signal.connect(object_viewed_reciever)



