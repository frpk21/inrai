from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect

from django.urls import reverse_lazy

from django.views import generic

from django.views.generic.base import TemplateView, View

from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from django.urls import reverse, reverse_lazy

from django.http import JsonResponse

from django.conf import settings

from django.contrib.auth.models import User

from .models import Contacto, Campanas, Nosotros

from .forms import ContactoForm

from datetime import date


class SinPrivilegios(PermissionRequiredMixin):
    login_url='generales:sin_privilegios'
    raise_exception=False
    redirect_field_name="redirecto_to"

    def handle_no_permission(self):
        return HttpResponseRedirect(reverse_lazy(self.login_url))


class HomePage(generic.View):
    def get(self, request, *args, **kwargs):
        
        return HttpResponse('Pagina de Inicio')

class Home(generic.CreateView):
    model=Contacto
    template_name='generales/home.html'
    context_object_name='obj1'
    form_class=ContactoForm
    success_url=reverse_lazy("generales:home")
    def get(self, request, *args, **kwargs):
        self.object = None
        return self.render_to_response(
            self.get_context_data(
                proyectos = Campanas.objects.all().order_by('-modificado')[:10],
                nosotros = Nosotros.objects.all()[:1],
                hoy = date.today()
            )
        )
    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        self.object = form.save(commit=False)
        send_mail(request, self.object.email, self.object.nombre,self.object.telefono,self.object.ciudad,self.object.pais,self.object.textoMensage)
        self.object = form.save()

class HomeSinPrivilegios(generic.TemplateView):
    template_name="generales/msg_sin_privilegios.html"


class NosotrosView(TemplateView):
    login_url = 'generales:login'
    model = Nosotros
    template_name = "generales/nosotros.html"
    context_object_name="nosotros"

    def get_context_data(self, **kwargs):
        hoy = date.today()
        context = super().get_context_data(**kwargs)
        nosotros = Nosotros.objects.all().last()
        context['nosotros'] = nosotros
        return context
    


def send_mail(request, correo, nombre,tel,ciudad,pais,msg):
    from django.conf import settings
    from django.core.mail import EmailMessage
    subject = "USUARIO/CLIENTE INRAI.NET "
    message = msg.strip()+". Nombre:  "+nombre.strip()+", correo: "+correo.strip()+", telefono: "+tel.strip()+", ciudad: "+ciudad.strip()+", pais: "+pais.strip()
    email_from = settings.EMAIL_HOST_USER
    recipient_list = ['alejandra.cabrera@sistemainrai.net','medios.bogota@sistemainrai.net','administrador@sistemainrai.net']
    msg = EmailMessage(subject, message, email_from, recipient_list)
    try:
        result = msg.send(fail_silently=False)
        return
    except Exception as e:
        return(str(e))
 