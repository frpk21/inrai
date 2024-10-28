from django.contrib import admin

from .models import Campanas,Categoria,Contacto,Nosotros,Noticias

class CampanasAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'categoria', 'archivo_foto','html','pdf', 'modificado', 'activo')
    exclude = ('fecha_inicio_publicacion','fecha_final_publicacion', 'slug')
    ordering = ('categoria', '-titulo', '-modificado')
    search_fields = ('titulo',)
    list_filter = ('modificado', 'categoria')

    class Meta:
        model = Campanas

class NoticiasAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'subtitulo', 'categoria', 'imagen', 'modificado','activo', )
    fields = ['titulo', 'subtitulo', 'categoria', 'imagen', 'descripcion', 'fuente', 'html', 'pdf', 'activo']
    exclude = ('slug','autor', 'modificado', )
    ordering = ('titulo', '-modificado', 'categoria')
    search_fields = ('titulo','subtitulo')
    list_filter = ('modificado', 'categoria__nombre',)

    class Meta:
        model = Noticias

    def save_model(self, request, obj, form, change):
        #if not obj.autor:
        obj.autor = request.user
        obj.save()

admin.site.register(Categoria)
admin.site.register(Campanas, CampanasAdmin)
admin.site.register(Contacto)
admin.site.register(Nosotros)
admin.site.register(Noticias, NoticiasAdmin)