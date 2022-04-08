from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from service.models import Carro, Endereco, Locacao, MetodoPagamento, User
from datetime import datetime, timedelta


def index_view(request):
    carros = Carro.objects.all()
    context = {
        "carros":carros,
    }
    return HttpResponse(loader.get_template('index.html').render(context,request))


def about_view(request):
    context = {
    }
    return HttpResponse(loader.get_template('about.html').render(context,request))

def cars_view(request):
    carros = Carro.objects.all()
    context = {
        "carros":carros,
    }
    return HttpResponse(loader.get_template('cars.html').render(context,request))

def contact_view(request):
    context = {
    }
    return HttpResponse(loader.get_template('contact.html').render(context,request))

def services_view(request):
    context = {
    }
    return HttpResponse(loader.get_template('services.html').render(context,request))

def cadastro_view(request):
    context = {
    }
    return HttpResponse(loader.get_template('cadastro.html').render(context, request))

def relatorio_view(request):
    usuario = User.objects.filter(email=request.user)[0]
    locacoes = Locacao.objects.filter(cliente_id=usuario.id)
    lista_concluido = []


    for i in locacoes:
        if i.devolucao:
            if i.devolucao.date() < datetime.today().date():
                lista_concluido.append(1)
            else:
                lista_concluido.append(0)

    context = {
        "locacoes":locacoes,
        'concluidos': lista_concluido,
    }
    return HttpResponse(loader.get_template('relatorio_locacao.html').render(context, request))