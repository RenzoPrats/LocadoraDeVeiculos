from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.contrib.auth import get_user_model
from django.shortcuts import redirect

def login_view(request):
    if request.method == 'POST':
        username = request.POST['email_login']
        password = request.POST['senha_login']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/')
            else:
                messages.error(request, 'Erro ao efetuar login, conta inválida!')
                return redirect('cadastro')
        else:
            messages.error(request, 'Erro ao efetuar login, verifique seus dados!')
            return redirect('cadastro')
    else:
        return redirect('/')

def cadastrar_usuario_view(request):
   try:
       if request.method == 'POST':
           first_name = request.POST.get('nome_cadastro','')
           last_name = request.POST.get('sobrenome_cadastro','')
           senha1 = request.POST.get('senha1_cadastro','')
           senha2 = request.POST.get('senha2_cadastro','')
           cpf_cnpj = request.POST.get('cpf_cnpj_cadastro','')
           ano_nasc = request.POST.get('ano_nasc_cadastro','')
           mes_nasc = request.POST.get('mes_nasc_cadastro','')
           dia_nasc = request.POST.get('dia_nasc_cadastro','')
           cep = request.POST.get('cep_cadastro','')
           estado = request.POST.get('estado_cadastro','')
           cidade = request.POST.get('cidade_cadastro','')
           rua = request.POST.get('rua_cadastro','')
           numero = request.POST.get('numero_cadastro','')
           bairro = request.POST.get('bairro_cadastro','')
           email = request.POST.get('email_cadastro','')

           if cpf_cnpj != '' and senha1 != '' and senha2 != '' and email != '':
               if senha1 == senha2:
                   if len(str(mes_nasc)) == 1:
                       mes_nasc = "0" + str(mes_nasc)

                   if len(str(dia_nasc)) == 1:
                       dia_nasc = "0" + str(dia_nasc)

                   data_nasc = str(ano_nasc) + "-" + str(mes_nasc) + "-" + str(dia_nasc)
                   User = get_user_model()

                   user = User.objects.filter(email=email)
                   if len(user) > 0:
                       messages.error(request, 'Erro ao efetuar cadastro, este e-mail já está em uso!')
                       return redirect('cadastro')
                   else:
                       User.objects.create_user(
                           email=email,
                           first_name=first_name,
                           last_name=last_name,
                           password=senha1,
                           cpf_cnpj=cpf_cnpj,
                           data_nascimento=data_nasc,
                           cep=cep,
                           estado=estado,
                           cidade=cidade,
                           rua=rua,
                           numero=numero,
                           bairro=bairro
                       )
                       user = authenticate(email=email,password=senha1)
                       login(request, user)

               else:
                   messages.error(request, 'Erro ao efetuar cadastro, as senhas não são iguais!')
                   return redirect('cadastro')
           else:
               messages.error(request, 'Erro ao efetuar cadastro, verifique seus dados!')
               return redirect('cadastro')

           context = {}
           return redirect('/')
   except:
       return redirect('cadastro')

def logout_view(request):
    logout(request)
    return HttpResponseRedirect('/')