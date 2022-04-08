from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from service.models import Carro, Endereco, Locacao, MetodoPagamento, User
from django.shortcuts import redirect
from django.contrib import messages
from datetime import datetime

def single_view(request):
    try:
        if request.user.is_authenticated:
            if 'id_carro' in request.GET:
                id_carro = request.GET["id_carro"]
            else:
                return HttpResponseRedirect("/cars")
        else:
            return HttpResponseRedirect("/cadastro")

        carro = Carro.objects.filter(id=id_carro)
        usuario = User.objects.filter(email=request.user)[0]

        pagamentos = MetodoPagamento.objects.filter(cliente_id=usuario.id)
        enderecos = Endereco.objects.filter(cliente_id=usuario.id)
        context = {
            "carro": carro,
            "pagamentos":pagamentos,
            "enderecos":enderecos,
        }
        return HttpResponse(loader.get_template('single.html').render(context, request))

    except:
        return HttpResponseRedirect("/")

def adicionar_nova_locacao(request):
    try:
        if request.method == 'POST':
            usuario = User.objects.filter(email=request.user)[0]

            id_carro = request.POST.get('id-carro', '')

            #dados do local de retirada
            local_retirada = request.POST.get('local-retirada', '')

            if local_retirada != "0" and local_retirada != '':
                id_local_retirada = request.POST.get('id-local-retirada', '')
            else:
                # criar local retirada
                descricao_retirada = request.POST.get('descricao-local-retirada', '')
                cep_retirada = request.POST.get('cep-local-retirada', '')
                cidade_retirada = request.POST.get('cidade-local-retirada', '')
                estado_retirada = request.POST.get('estado-local-retirada', '')
                rua_retirada = request.POST.get('rua-local-retirada', '')
                numero_retirada = request.POST.get('num-local-retirada', '')
                bairro_retirada = request.POST.get('bairro-local-retirada', '')

                novo_local_retirada = Endereco(
                    cliente_id=usuario.id,
                    descricao=descricao_retirada,
                    cep=cep_retirada,
                    cidade=cidade_retirada,
                    estado=estado_retirada,
                    rua=rua_retirada,
                    numero=numero_retirada,
                    bairro=bairro_retirada,
                )
                novo_local_retirada.save(force_insert=True)
                id_local_retirada = novo_local_retirada.id

            # dados do local de devolucao
            local_devolucao = request.POST.get('local-devolucao', '')

            if local_devolucao != "0" and local_devolucao != '':
                if local_devolucao == "1":
                    id_local_devolucao = id_local_retirada
                else:
                    id_local_devolucao = request.POST.get('id-local-devolucao', '')
            else:
                # criar local retirada
                descricao_devolucao = request.POST.get('descricao-local-devolucao', '')
                cep_devolucao = request.POST.get('cep-local-devolucao', '')
                cidade_devolucao = request.POST.get('cidade-local-devolucao', '')
                estado_devolucao = request.POST.get('estado-local-devolucao', '')
                rua_devolucao = request.POST.get('rua-local-devolucao', '')
                numero_devolucao = request.POST.get('num-local-devolucao', '')
                bairro_devolucao = request.POST.get('bairro-local-devolucao', '')

                novo_local_devolucao = Endereco(
                    cliente_id=usuario.id,
                    descricao=descricao_devolucao,
                    cep=cep_devolucao,
                    cidade=cidade_devolucao,
                    estado=estado_devolucao,
                    rua=rua_devolucao,
                    numero=numero_devolucao,
                    bairro=bairro_devolucao,
                )
                novo_local_devolucao.save(force_insert=True)
                id_local_devolucao = novo_local_devolucao.id

            #dados pagamento

            metodo_pagamento = request.POST.get('metodo_pagamento', '')

            if metodo_pagamento == "0":
                #pagamento com dinheiro
                id_dados_pagamento = ""
            else:
                dados_metodo_pagamento = request.POST.get('dados-metodo-pagamento', '')
                if dados_metodo_pagamento != "0":
                    #usar um pagamento já existente
                    id_dados_pagamento = request.POST.get('id-dados-pagamento', '')
                else:
                    tipo_cartao = request.POST.get('tipo_cartao', '')
                    descricao_pagamento = request.POST.get('descricao-cartao', '')
                    nome_cartao = request.POST.get('nome-cartao', '')
                    numero_cartao = request.POST.get('numero-cartao', '')
                    mes_validade_cartao = request.POST.get('mes-validade-cartao', '')
                    ano_validade_cartao = request.POST.get('ano-validade-cartao', '')
                    codigo_seguranca_cartao = request.POST.get('codigo-seguranca-cartao', '')
                    novo_metodo_pagamento = MetodoPagamento(
                        tipo_cartao=tipo_cartao,
                        descricao=descricao_pagamento,
                        nome_cartao=nome_cartao,
                        numero_cartao=numero_cartao,
                        mes_validade=mes_validade_cartao,
                        ano_validade=ano_validade_cartao,
                        codigo_seguranca=codigo_seguranca_cartao,
                        cliente_id=usuario.id,
                    )
                    novo_metodo_pagamento.save(force_insert=True)
                    id_dados_pagamento = novo_metodo_pagamento.id


            #dados complementares
            preco_total = request.POST.get('preco_total','')
            preco_total = preco_total.split("$")
            preco_total = preco_total[1].split(",")
            preco_total = float(preco_total[0])

            telefone = request.POST.get('telefone', '')
            cnh = request.POST.get('cnh', '')

            data_retirada = request.POST.get('data-retirada', '')
            data_retirada = datetime.strptime(data_retirada, '%d/%m/%Y %H:%M')

            data_devolucao = request.POST.get('data-devolucao', '')
            data_devolucao = datetime.strptime(data_devolucao,'%d/%m/%Y %H:%M')

            #salvar a locação
            nova_locacao = Locacao(
                cliente_id=usuario.id,
                carro_id= id_carro,
                endereco_retirada_id=id_local_retirada,
                endereco_devolucao_id=id_local_devolucao,
                metodo_pagamento_id=id_dados_pagamento,
                tipo_pagamento= metodo_pagamento,
                data=data_retirada,
                devolucao=data_devolucao,
                valor_total=preco_total,
                telefone=telefone,
                cnh=cnh
            )
            nova_locacao.save(force_insert=True)
            return redirect('relatorio')

        else:
            messages.error(request, 'Erro ao alugar veículo, verifique seus dados!')
            return redirect(request.META['HTTP_REFERER'])
        pass
    except:
        messages.error(request, 'Erro ao alugar veículo, verifique seus dados!')
        return redirect(request.META['HTTP_REFERER'])