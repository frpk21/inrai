from django.contrib import admin

from .models import Campanas,Categoria,Contacto

admin.site.register(Categoria)
admin.site.register(Campanas)
admin.site.register(Contacto)