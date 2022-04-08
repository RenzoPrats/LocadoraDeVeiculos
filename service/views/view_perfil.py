from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from service.models import Carro, Endereco, Locacao, MetodoPagamento, User
from django.contrib.auth import get_user_model
from django.shortcuts import redirect
from django.contrib import messages

def perfil_view(request):
    email_usuario = request.user
    usuario = User.objects.filter(email=email_usuario)[0]
    metodos_pagamento = MetodoPagamento.objects.filter(cliente_id=usuario.id)
    enderecos_extras = Endereco.objects.filter(cliente_id=usuario.id)
    context = {
        "usuario":usuario,
        "metodos_pagamento":metodos_pagamento,
        "enderecos_extras":enderecos_extras,
    }
    return HttpResponse(loader.get_template('perfil.html').render(context, request))

def alterar_dados_pessoais_view(request):
    try:
        if request.method == 'POST':
            nome = request.POST.get('nome','')
            sobrenome = request.POST.get('sobrenome','')
            cpf_cnpj = request.POST.get('cpf_cnpj','')
            cep = request.POST.get('cep','')
            cidade = request.POST.get('cidade','')
            estado = request.POST.get('estado','')
            rua = request.POST.get('rua','')
            numero = request.POST.get('numero','')
            bairro = request.POST.get('bairro','')
            ano_nasc = request.POST.get('ano_nasc_perfil', '')
            mes_nasc = request.POST.get('mes_nasc_perfil','')
            dia_nasc = request.POST.get('dia_nasc_perfil','')

            if len(str(mes_nasc)) == 1:
                mes_nasc = "0" + str(mes_nasc)

            if len(str(dia_nasc)) == 1:
                dia_nasc = "0" + str(dia_nasc)

            data_nasc = str(ano_nasc) + "-" + str(mes_nasc) + "-" + str(dia_nasc)
            user = User.objects.filter(email=request.user)[0]

            user.first_name = nome
            user.last_name = sobrenome
            user.cpf_cnpj = cpf_cnpj
            user.data_nascimento = data_nasc
            user.cep = cep
            user.estado = estado
            user.cidade = cidade
            user.rua = rua
            user.numero = numero
            user.bairro = bairro
            user.save(force_update=True)

            messages.success(request, 'Os dados pessoais foram atualizados com sucesso!')
            return redirect('perfil')

        else:
            messages.error(request, 'Erro ao atualizar os dados pessoais!')
            return redirect('perfil')
    except:
        messages.error(request, 'Erro ao atualizar os dados pessoais!')
        return redirect('perfil')

def adicionar_dados_pagamento(request):
    try:
        if request.method == 'POST':
            tipo_cartao = request.POST.get('tipo_cartao', '')
            descricao_pagamento = request.POST.get('descricao_pagamento','')
            nome_cartao = request.POST.get('nome_cartao','')
            numero_cartao = request.POST.get('numero_cartao','')
            mes_validade_cartao = request.POST.get('mes_validade_cartao','')
            ano_validade_cartao = request.POST.get('ano_validade_cartao','')
            codigo_seguranca_cartao = request.POST.get('codigo_seguranca_cartao','')
            id_pagamento_criado = request.POST.get('id_dados_pagamento', 0)

            usuario = User.objects.filter(email=request.user)[0]

            if len(id_pagamento_criado) == 0:
                id_pagamento_criado = 0
            metodo_pagamento = MetodoPagamento.objects.filter(id=id_pagamento_criado, cliente_id=usuario.id)

            if len(metodo_pagamento) > 0:
                #temos que atualizar o metodo de pagamento
                metodo_pagamento = metodo_pagamento[0]
                metodo_pagamento.tipo_cartao = tipo_cartao
                metodo_pagamento.descricao = descricao_pagamento
                metodo_pagamento.nome_cartao = nome_cartao
                metodo_pagamento.numero_cartao = numero_cartao
                metodo_pagamento.mes_validade = mes_validade_cartao
                metodo_pagamento.ano_validade = ano_validade_cartao
                metodo_pagamento.codigo_seguranca = codigo_seguranca_cartao

                metodo_pagamento.save(force_update=True)

                messages.success(request, "Método de pagamento atualizado com sucesso!")
                return redirect('perfil')
            else:
                metodo_pagamento = MetodoPagamento(
                    tipo_cartao=tipo_cartao,
                    descricao=descricao_pagamento,
                    nome_cartao=nome_cartao,
                    numero_cartao=numero_cartao,
                    mes_validade=mes_validade_cartao,
                    ano_validade=ano_validade_cartao,
                    codigo_seguranca=codigo_seguranca_cartao,
                    cliente_id=User.objects.filter(email=request.user)[0].id,
                )
                metodo_pagamento.save(force_insert=True)
                messages.success(request, "Método de pagamento criado com sucesso!")
                return redirect('perfil')
        else:
            messages.error(request, 'Erro ao atualizar os dados de pagamento!')
            return redirect('perfil')
    except:
        messages.error(request, 'Erro ao atualizar os dados de pagamento!')
        return redirect('perfil')

def adicionar_dados_endereco(request):
    try:
        if request.method == 'POST':
            descricao_endereco = request.POST.get('descricao-endereco', '')
            cep = request.POST.get('cep-extra', '')
            cidade = request.POST.get('cidade-extra', '')
            estado = request.POST.get('estado-extra', '')
            rua = request.POST.get('rua-extra', '')
            numero = request.POST.get('numero-extra', '')
            bairro = request.POST.get('bairro-extra', '')
            id_endereco_criado = request.POST.get('id_endereco_extra', 0)

            usuario = User.objects.filter(email=request.user)[0]

            if len(id_endereco_criado) == 0:
                id_endereco_criado = 0

            endereco_extra = Endereco.objects.filter(id=id_endereco_criado, cliente_id=usuario.id)

            if len(endereco_extra) > 0:
                endereco_extra = endereco_extra[0]

                endereco_extra.descricao = descricao_endereco
                endereco_extra.cep = cep
                endereco_extra.cidade = cidade
                endereco_extra.estado = estado
                endereco_extra.rua = rua
                endereco_extra.numero = numero
                endereco_extra.bairro = bairro

                endereco_extra.save(force_update=True)
                messages.success(request, "Endereço extra atualizado com sucesso!")
                return redirect('perfil')
            else:
                endereco_extra = Endereco(
                    cliente_id=User.objects.filter(email=request.user)[0].id,
                    descricao= descricao_endereco,
                    cep= cep,
                    cidade= cidade,
                    estado= estado,
                    rua= rua,
                    numero=numero,
                    bairro=bairro,
                )

                endereco_extra.save(force_insert=True)
                messages.success(request, "Endereço extra criado com sucesso!")
                return redirect('perfil')
        else:
            messages.error(request, 'Erro ao atualizar os dados de endereço!')
            return redirect('perfil')
    except:
        messages.error(request, 'Erro ao atualizar os dados de endereço!')
        return redirect('perfil')