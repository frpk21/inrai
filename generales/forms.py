from django import forms

from django.forms.models import inlineformset_factory

from generales.models import Contacto

from django.forms.widgets import RadioSelect


class ContactoForm(forms.ModelForm):
    nombre = forms.TextInput()

    class Meta:
        model=Contacto
        fields = ['nombre', 'email', 'telefono', 'ciudad', 'pais', 'textoMensage']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in iter(self.fields):
            self.fields[field].widget.attrs.update({
                'class': 'form-control'
            })
        self.fields['nombre'].widget.attrs.update({'placeholder': 'Nombre'})
        self.fields['email'].widget.attrs.update({'placeholder': 'e-mail'})
        self.fields['ciudad'].widget.attrs.update({'placeholder': 'Ciudad'})
        self.fields['textoMensage'].widget.attrs.update({'placeholder': 'Mensage'})
        self.fields['telefono'].widget.attrs.update({'placeholder': 'Teléfono'})

    def clean_nombre(self):
        nombre = self.cleaned_data["nombre"]
        if not nombre:
            raise forms.ValidationError("Nombre Requerido")
        return nombre

    def clean_email(self):
        email = self.cleaned_data["email"]
        if not email:
            raise forms.ValidationError("Email Requerido")
        return email

    def clean_textoMensage(self):
        textoMensage = self.cleaned_data["textoMensage"]
        if not textoMensage:
            raise forms.ValidationError("Mensage Requerido")
        return textoMensage


