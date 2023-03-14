from django.contrib import admin

from .models import Campanas,Categoria,Contacto,Nosotros

class CampanasAdmin(admin.ModelAdmin):
    list_display = ('categoria', 'titulo', 'descripcion', 'archivo_foto','html','pdf', 'activo')
    exclude = ('fecha_inicio_publicacion','fecha_final_publicacion', 'slug')
    ordering = ('categoria', '-titulo', '-modificado')
    search_fields = ('titulo',)
    list_filter = ('modificado', 'categoria')

    class Meta:
        model = Campanas

admin.site.register(Categoria)
admin.site.register(Campanas, CampanasAdmin)
admin.site.register(Contacto)
admin.site.register(Nosotros)