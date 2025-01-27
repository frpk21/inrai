from django.shortcuts import render, redirect

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

from collections import namedtuple

import psycopg2

from django.db import connection

from django.contrib.auth import authenticate, login

from django.contrib.auth.decorators import login_required

from django.contrib import messages

def namedtuplefetchall(cursor):
    "Return all rows from a cursor as a namedtuple"
    desc = cursor.description
    nt_result = namedtuple('obj1', [col[0] for col in desc])
    return [nt_result(*row) for row in cursor.fetchall()]

def open_db():
    conexion = psycopg2.connect(database="inrai", user="doadmin", host="magazin-do-user-1934793-0.db.ondigitalocean.com", port="25060", password="c56n9esmnqxbquvo")
    return conexion
    
class SinPrivilegios(LoginRequiredMixin):
    login_url = 'generales:sin_privilegios'
    raise_exception = False
    redirect_field_name = "redirect_to"

    def handle_no_permission(self):
        """
        Redirige al usuario a la página sin privilegios si no tiene permiso.
        """
        return HttpResponseRedirect(reverse_lazy(self.login_url))

    def pedir_credenciales(self, request):
        if request.method == "POST":
            username = request.POST.get('username')            
            password = request.POST.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)  # Inicia sesión
                return redirect('generales:customers-res') 
            else:
                return render(request, 'generales/login.html', {'messages': 'Credenciales incorrectas'})

        # Mostrar formulario para credenciales
        return render(request, "generales/login.html")

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
    """
    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        self.object = form.save(commit=False)
        send_mail(request, self.object.email, self.object.nombre,self.object.telefono,self.object.ciudad,self.object.pais,self.object.textoMensage)
        self.object = form.save()
        return HttpResponseRedirect(self.success_url)
    """

class HomeSinPrivilegios(generic.TemplateView):
    template_name="generales/msg_sin_privilegios.html"

class ConsultasClientesView(SinPrivilegios, generic.TemplateView):
    def dispatch(self, request, *args, **kwargs):
        credenciales = self.pedir_credenciales(request)
        if credenciales:
            return credenciales  # Retorna la respuesta del formulario si las credenciales no son válidas
        return super().dispatch(request, *args, **kwargs)

class ConsultasClientesResView(generic.TemplateView):
    template_name = "generales/consultas_clientes.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        try:
            cone=open_db()
            cursor=cone.cursor()
            cursor.execute("SELECT inspector_emisoras.nombre as medio, inspector_ciudad.nombre_ciudad as municipio, inspector_categoria.nombre AS tipo_medio, inspector_departamento.nombre_departamento as departamento, latitud as lat, longitud as lon FROM inspector_emisoras LEFT JOIN inspector_ciudad on inspector_emisoras.ciudad_id=inspector_ciudad.id LEFT JOIN inspector_departamento on inspector_emisoras.departamento_id=inspector_departamento.id LEFT JOIN inspector_categoria on inspector_emisoras.categoria_id=inspector_categoria.id WHERE inspector_emisoras.departamento_id = 11")
            resul = namedtuplefetchall(cursor)
            context['resul'] = resul
        except psycopg2.Error as e:
            context['resul'] = ''

        return context
    
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
    
class ContactoView(generic.CreateView):
    model=Contacto
    template_name="generales/contacto.html"
    context_object_name='obj'
    form_class=ContactoForm
    success_url=reverse_lazy("generales:home")

class RadioView(TemplateView):
    model=Contacto
    template_name="generales/radio.html"
    context_object_name='obj'
    success_url=reverse_lazy("generales:home")

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
 