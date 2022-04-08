var classes_banner = document.getElementById("banner").className
document.getElementById("banner").className = classes_banner + " banner-cadastro"

//add options
//ano nascimento
let ano_min = 1950,
    ano_max = 2003,
    ano_nascimento = document.getElementById('ano_nasc_perfil');

for (let i = ano_min; i <= ano_max; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    ano_nascimento.appendChild(opt);
}

//mes nascimento
let meses_nascimento = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

let mes_nascimento = document.getElementById('mes_nasc_perfil');

for (let i = 0; i < 12; i++) {
    let opt = document.createElement('option');
    opt.value = i + 1;
    opt.innerHTML = meses_nascimento[i];
    mes_nascimento.appendChild(opt);
}

//dia nascimento
let dia_min = 1,
    dia_max = 31,
    dia_nascimento = document.getElementById('dia_nasc_perfil');

for (let i = dia_min; i<=dia_max; i++){
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    dia_nascimento.appendChild(opt);
}
verificaMes();

function verificaMes() {
    let meses_31 = ['1', '3', '5', '7', '8', '10', '12']

    //dia nascimento
    let dia_min,
        dia_max,
        dia_nascimento = document.getElementById('dia_nasc_perfil');

    if($("#mes_nasc_perfil").val() == 2) {
        $("#dia_nasc_perfil").empty();
        dia_min = 1;
        dia_max = 28;
        for (let i = dia_min; i<=dia_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            dia_nascimento.appendChild(opt);
        }

    }else if(meses_31.includes($("#mes_nasc_perfil").val())){
        $("#dia_nasc_perfil").empty();
        dia_min = 1;
        dia_max = 31;
        for (let i = dia_min; i<=dia_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            dia_nascimento.appendChild(opt);
        }

    }else{
        $("#dia_nasc_perfil").empty();
        dia_min = 1;
        dia_max = 30;
        for (let i = dia_min; i<=dia_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            dia_nascimento.appendChild(opt);
        }
    }
}

//Adiciona mes e ano no select Dados pagamento
let mes_validade = document.getElementById('mes_validade_cartao');

for (let i = 0; i < 12; i++) {
    let opt = document.createElement('option');
    opt.value = i + 1;
    opt.innerHTML = meses_nascimento[i];
    mes_validade.appendChild(opt);
}

let validade_min = 2021,
    validade_max = 2035,
    ano_validade = document.getElementById('ano_validade_cartao');

for (let i = validade_min; i <= validade_max; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    ano_validade.appendChild(opt);
}

//adiciona metodo de pagamento conforme select
function adicionaMetodoPagamento(){
    if($("#dados_pagamento").val() != 0){
        for(let i = 0; i < metodos_pagamento.length; i++){
            if($("#dados_pagamento option:selected[value]").text() == metodos_pagamento[i].descricao){

                $("#tipo_cartao").val(`${metodos_pagamento[i].tipo_cartao}`)
                $("#descricao_pagamento").val(`${metodos_pagamento[i].descricao}`)
                $("#nome_cartao").val(`${metodos_pagamento[i].nome_cartao}`)
                $("#numero_cartao").val(`${metodos_pagamento[i].numero_cartao}`)
                $("#mes_validade_cartao").val(`${metodos_pagamento[i].mes_validade}`)
                $("#ano_validade_cartao").val(`${metodos_pagamento[i].ano_validade}`)
                $("#codigo_seguranca_cartao").val(`${metodos_pagamento[i].codigo_seguranca}`)
                $("#id_dados_pagamento").val(`${metodos_pagamento[i].id}`)
            }
        }
    }else{
        $("#tipo_cartao").val('0')
        $("#descricao_pagamento").val('')
        $("#nome_cartao").val('')
        $("#numero_cartao").val('')
        $("#mes_validade_cartao").val('1')
        $("#ano_validade_cartao").val('2021')
        $("#codigo_seguranca_cartao").val('')
        $("#id_dados_pagamento").val('')
    }
}


//adiciona endereco extra conforme select
function adicionaEnderecoExtra() {
    if($("#endereco-extra").val() != 0){
        for(let i = 0; i < enderecos_extras.length; i++){
            if($("#endereco-extra option:selected[value]").text() == enderecos_extras[i].descricao){

                $("#descricao-endereco").val(`${enderecos_extras[i].descricao}`)
                $("#cep-extra").val(`${enderecos_extras[i].cep}`)
                $("#cidade-extra").val(`${enderecos_extras[i].cidade}`)
                $("#estado-extra").val(`${enderecos_extras[i].estado}`)
                $("#rua-extra").val(`${enderecos_extras[i].rua}`)
                $("#numero-extra").val(`${enderecos_extras[i].numero}`)
                $("#bairro-extra").val(`${enderecos_extras[i].bairro}`)
                $("#id_endereco_extra").val(`${enderecos_extras[i].id}`)
            }
        }
    }else{
        $("#descricao-endereco").val('')
        $("#cep-extra").val('')
        $("#cidade-extra").val('')
        $("#estado-extra").val('')
        $("#rua-extra").val('')
        $("#numero-extra").val('')
        $("#bairro-extra").val('')
        $("#id_endereco_extra").val('')
    }
}


