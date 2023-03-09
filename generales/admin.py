from django.contrib import admin

from .models import Campanas,Categoria,Contacto,Nosotros

admin.site.register(Categoria)
admin.site.register(Campanas)
admin.site.register(Contacto)
admin.site.register(Nosotros)