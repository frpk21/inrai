from django.db import models
from ckeditor.fields import RichTextField
from django.urls import reverse
from django.template.defaultfilters import slugify
from datetime import datetime


class ClaseModelo(models.Model):
    activo = models.BooleanField(default=True, null=True)
    creado = models.DateField(auto_now_add=True, null=True)
    modificado = models.DateField(auto_now=True, null=True)

    class Meta:
        abstract=True


from generales.models import ClaseModelo

class Categoria(ClaseModelo):
    nombre = models.CharField(blank=False, null=False, max_length=100, default="")

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self):
        self.nombre = self.nombre.upper()
        super(Categoria, self).save()

    class Meta:
        verbose_name_plural = "Categorias"

class Contacto(ClaseModelo):
    nombre = models.CharField(help_text='Nombre y Apellidos', blank=False, null=False, max_length=200)
    email = models.CharField(help_text='Correo electrónico', blank=False, null=False, max_length=200)
    telefono = models.CharField(help_text='Teléfono de contacto', blank=True, null=True, max_length=100, default="")
    ciudad = models.CharField(help_text='Ciudad de residencia', blank=True, null=True, max_length=100, default="")
    pais = models.CharField(help_text='País de residencia', blank=True, null=True, max_length=100, default="")
    textoMensage = models.TextField(help_text='Mensage', blank=False, null=False, max_length=10000)

    def __str__(self):
        return '{}'.format(self.nombre)

    def save(self):
        self.nombre = self.nombre.upper()
        self.ciudad = self.ciudad.upper()
        self.pais = self.pais.upper()
        super(Contacto, self).save()

    class Meta:
        verbose_name_plural = "Contactos"



class Campanas(ClaseModelo):
    categoria=models.ForeignKey(Categoria, on_delete=models.CASCADE, default=0, null=False, blank=False)
    titulo = models.CharField(help_text='Título de la Campaña', blank=False, null=False, max_length=200)
    descripcion = RichTextField(max_length=10000, blank=True, null=True)
    fecha_inicio_publicacion = models.DateField('Fecha de inicio', blank=True, null=True, default=datetime.now)
    fecha_final_publicacion = models.DateField('Fecha de finalización', blank=True, null=True, default=datetime.now)
    archivo_foto = models.FileField("Archivo Foto (1000x800 px)", upload_to="fotos/", blank=True, null=True, default='')
    html = models.TextField(max_length=10000, default="", blank=True, null=True)
    pdf = models.FileField("Archivo PDF", upload_to="pdf/", blank=True, null=True, default='')
    slug = models.SlugField(blank=True,null=True, max_length=250)
   
    def __str__(self):
        return '{}'.format(self.titulo)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.titulo)
        super(Campanas,self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Campañas"
