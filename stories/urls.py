from django.urls import path
from . import views



urlpatterns = [
	path('', views.home, name='home'),
	path('settings/', views.admin_page, name='admin-page'),
	path('story/<int:pk>/', views.story_page, name='story-page'),
	path('checkout/', views.checkout_page, name='checkout-page')
]

