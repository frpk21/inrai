from django.shortcuts import render

from django.http import HttpResponse, HttpResponseRedirect

from django.urls import reverse_lazy

from django.views import generic

from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from django.urls import reverse, reverse_lazy

from django.http import JsonResponse

from django.conf import settings

from django.contrib.auth.models import User

from .models import Contacto, Campanas

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
                cliente=None,
                proyectos = Campanas.objects.all().order_by('-modificado')[:10],
                hoy = date.today()
            )
        )

class HomeSinPrivilegios(generic.TemplateView):
    template_name="generales/msg_sin_privilegios.html"