from django.urls import path

from generales import views

from django.contrib.auth import views as auth_views

urlpatterns = [
    path('',views.Home.as_view(), name='home'),
    path('customers/', views.Home.as_view(), name='customers'),
    path('login/', auth_views.LoginView.as_view(template_name='generales/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(template_name='generales/login.html'), name='logout'),
    path('loginunlock/', auth_views.LoginView.as_view(template_name='generales/lock.html'), name='loginunlock'),
    path('sin_privilegios/', views.HomeSinPrivilegios.as_view(), name='sin_privilegios'),
    path('nosotros/', views.NosotrosView.as_view(), name='nosotros'),
    path('contacto/', views.ContactoView.as_view(), name='contacto'),
    path('radio/', views.RadioView.as_view(), name='radio'),
    #url((r'^politica/$'), PoliticaView, name="politica"),

]