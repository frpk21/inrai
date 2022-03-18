from django.db import models
from ckeditor.fields import RichTextField
from django.contrib.auth.models import User

class ClaseModelo(models.Model):
    activo = models.BooleanField(default=True, null=True)
    creado = models.DateField(auto_now_add=True, null=True)
    modificado = models.DateField(auto_now=True, null=True)

    class Meta:
        abstract=True 


class Profile(models.Model): 
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    foto = models.FileField("Archivo con Foto del Usuario", upload_to="fotos/", blank=False, null=False)
    logo = models.FileField("Logo del Usuario", upload_to="fotos/", blank=False, null=False)
    nit  = models.CharField('NIT / CC #', blank=False, null=False, max_length=30, default="")
    empresa = models.CharField('Empresa', blank=False, null=False, max_length=100, default="")
    direccion = models.CharField('Direccion Comercial', blank=False, null=False, max_length=100, default="")
    telefono = models.CharField('Telefono Comercial', blank=False, null=False, max_length=100, default="")
    email = models.CharField('Telefono Comercial', blank=False, null=False, max_length=100, default="")
    
    
    #sede = models.ForeignKey(Sedes, on_delete=models.CASCADE, default=0, null=False, blank=False)
 
    def save(self):
        self.empresa = self.empresa.upper()
        super(Profile, self).save()