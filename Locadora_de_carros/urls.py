"""Locadora_de_carros URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import re_path as url
from service.views import views, view_login, view_single, view_perfil
from django.conf.urls.static import static
from django.conf import  settings

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^$', views.index_view, name='index'),
    url(r'^about$', views.about_view, name='about'),
    url(r'^cars$', views.cars_view, name='cars'),
    url(r'^contact$', views.contact_view, name='contact'),
    url(r'^services$', views.services_view, name='services'),
    url(r'^cadastro', views.cadastro_view, name='cadastro'),
    url(r'^single', view_single.single_view, name='single'),
    url(r'^login', view_login.login_view, name='login'),
    url(r'^cadastrar_usuario', view_login.cadastrar_usuario_view, name='cadastrar_usuario'),
    url(r'^logout', view_login.logout_view, name='logout'),
    url(r'^perfil', view_perfil.perfil_view, name='perfil'),
    url(r'^alterar_dados_pessoais', view_perfil.alterar_dados_pessoais_view, name='alterar_dados_pessoais'),
    url(r'^relatorio_locacoes', views.relatorio_view, name='relatorio'),
    url(r'^adicionar_dados_pagamento', view_perfil.adicionar_dados_pagamento, name='adicionar_dados_pagamento'),
    url(r'^adicionar_dados_endereco', view_perfil.adicionar_dados_endereco, name='adicionar_dados_endereco'),
    url(r'^adicionar_nova_locacao', view_single.adicionar_nova_locacao, name='adicionar_nova_locacao'),
]
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
