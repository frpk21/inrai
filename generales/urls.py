from django.urls import include, path

from generales import views

from generales.views import Home, HomeSinPrivilegios

from django.contrib.auth import views as auth_views
 
from django.contrib import admin

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',Home.as_view(), name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='generales/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='generales/login.html'), name='logout'),
    path('loginunlock/', auth_views.LoginView.as_view(template_name='generales/lock.html'), name='loginunlock'),
    path('sin_privilegios/', HomeSinPrivilegios.as_view(), name='sin_privilegios'),
    path('nosotros/', views.NosotrosView.as_view(), name='nosotros'),
    path('contacto/', views.ContactoView.as_view(), name='contacto'),
    path('radio/', views.RadioView.as_view(), name='radio'),
    #url((r'^politica/$'), PoliticaView, name="politica"),

]