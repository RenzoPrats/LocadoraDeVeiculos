var classes_banner = document.getElementById("banner").className
document.getElementById("banner").className = classes_banner + " banner-cadastro"

var data_retirada1;
var data_devolucao1;
var multiplicador_preco;
//DatePicker
$(function () {
    $("#data-retirada").datetimepicker({
        timepicker:true,
        format:'d/m/Y H:i',
        minDate:'-1970/01/01',//yesterday is minimum date(for today use 0 or -1970/01/01)
        step:30,
        minTime:0,
        onSelectDate: function(ct) {
            var dtob = new Date(),
                current_date = dtob.getDate(),
                current_month = dtob.getMonth() + 1,
                current_year = dtob.getFullYear();

            // today's date
            var full_date = current_year + '-' +
                            ( current_month < 10 ? + current_month : current_month ) + '-' +
                            ( current_date < 10 ? '0' + current_date : current_date );

            let dataFormatada = (ct.getFullYear() + "-" + ((ct.getMonth() + 1)) + "-" + (ct.getDate() )) ;
            // compare today's date to the date chosen
            if(dataFormatada == full_date)
                this.setOptions({ minTime: 0 });
            else
                this.setOptions({ minTime: false });
        }
    });
    $.datetimepicker.setLocale('pt-BR');

    $("#data-devolucao").datetimepicker({
        timepicker:true,
        format:'d/m/Y H:i',
        step:30,
        minDate:'-1970/01/01',//yesterday is minimum date(for today use 0 or -1970/01/01)
        minTime: `${new Date().getHours()+1}`,
        onSelectDate: function(ct) {
            var dtob = new Date(),
                current_date = dtob.getDate(),
                current_month = dtob.getMonth() + 1,
                current_year = dtob.getFullYear();



            // today's date
            var full_date = current_year + '-' +
                            ( current_month < 10 ? + current_month : current_month ) + '-' +
                            ( current_date < 10 ? '0' + current_date : current_date );

            let dataFormatada = (ct.getFullYear() + "-" + ((ct.getMonth() + 1)) + "-" + (ct.getDate() )) ;
            // compare today's date to the date chosen
            if(dataFormatada == full_date)
                this.setOptions({ minTime: `${dtob.getHours()+1}`});
            else
                this.setOptions({ minTime: false });
        }
    });
});

//arrumando o valor com base nos dias
$('#data-retirada, #data-devolucao').change(function(){nome = nome.toLowerCase().replace(/(?:^|\s)\S/g, function(capitalize) { return capitalize.toUpperCase(); });
    data_retirada1 = $("#data-retirada").val()
    data_retirada1 = data_retirada1.split(' ')[0]
    data_retirada1 = data_retirada1.split('/')
    data_retirada1 = data_retirada1[2] + "-" + data_retirada1[1] + "-" + data_retirada1[0]

    data_devolucao1 = $("#data-devolucao").val()
    data_devolucao1 = data_devolucao1.split(' ')[0]
    data_devolucao1 = data_devolucao1.split('/')
    data_devolucao1 = data_devolucao1[2] + "-" + data_devolucao1[1] + "-" + data_devolucao1[0]


    if (data_retirada1 != null && data_retirada1 != ''){
         if (data_devolucao1 != null && data_devolucao1 != ''){

             const startDate  = data_retirada1;
             const endDate    = data_devolucao1;
             const diffInMs   = new Date(endDate) - new Date(startDate)
             const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
             multiplicador_preco = parseInt(diffInDays);

             if (multiplicador_preco == 0){multiplicador_preco = 1}

             let preco_total1 = multiplicador_preco * preco_locacao
             $("#preco_total").val("R$" + String(preco_total1) + ",00")
        }
    }
})

//local de retirada e devolucaos
function verifica_local_retirada() {
    if ($("#local-retirada").val() != 0) {
        for(let i = 0; i < enderecos.length; i++){
            if($("#local-retirada option:selected[value]").text() == enderecos[i].descricao){
                $("#descricao-local-retirada").val(`${enderecos[i].descricao}`).attr("readonly", true)
                $("#cep-local-retirada").val(`${enderecos[i].cep}`).attr("readonly", true)
                $("#cidade-local-retirada").val(`${enderecos[i].cidade}`).attr("readonly", true)
                $("#estado-local-retirada").val(`${enderecos[i].estado}`).attr("readonly", true)
                $("#rua-local-retirada").val(`${enderecos[i].rua}`).attr("readonly", true)
                $("#num-local-retirada").val(`${enderecos[i].numero}`).attr("readonly", true)
                $("#bairro-local-retirada").val(`${enderecos[i].bairro}`).attr("readonly", true)
                $("#id-local-retirada").val(`${enderecos[i].id}`).attr("readonly", true)
            }
        }
    }else{
        $("#descricao-local-retirada").val('').attr("readonly", false)
        $("#cep-local-retirada").val('').attr("readonly", false)
        $("#cidade-local-retirada").val('').attr("readonly", false)
        $("#estado-local-retirada").val('').attr("readonly", false)
        $("#rua-local-retirada").val('').attr("readonly", false)
        $("#num-local-retirada").val('').attr("readonly", false)
        $("#bairro-local-retirada").val('').attr("readonly", false)
        $("#id-local-retirada").val('').attr("readonly", false)
    }

}

function verifica_local_devolucao() {
    if ($("#local-devolucao").val() != 0 && $("#local-devolucao").val() != 1) {
        for(let i = 0; i < enderecos.length; i++){
            if($("#local-devolucao option:selected[value]").text() == enderecos[i].descricao){
                $("#descricao-local-devolucao").val(`${enderecos[i].descricao}`).attr("readonly", true)
                $("#cep-local-devolucao").val(`${enderecos[i].cep}`).attr("readonly", true)
                $("#cidade-local-devolucao").val(`${enderecos[i].cidade}`).attr("readonly", true)
                $("#estado-local-devolucao").val(`${enderecos[i].estado}`).attr("readonly", true)
                $("#rua-local-devolucao").val(`${enderecos[i].rua}`).attr("readonly", true)
                $("#num-local-devolucao").val(`${enderecos[i].numero}`).attr("readonly", true)
                $("#bairro-local-devolucao").val(`${enderecos[i].bairro}`).attr("readonly", true)
                $("#id-local-devolucao").val(`${enderecos[i].id}`).attr("readonly", true)
            }
        }
    }else if ($("#local-devolucao").val() == 0){
        $("#descricao-local-devolucao").val('').attr("readonly", false)
        $("#cep-local-devolucao").val('').attr("readonly", false)
        $("#cidade-local-devolucao").val('').attr("readonly", false)
        $("#estado-local-devolucao").val('').attr("readonly", false)
        $("#rua-local-devolucao").val('').attr("readonly", false)
        $("#num-local-devolucao").val('').attr("readonly", false)
        $("#bairro-local-devolucao").val('').attr("readonly", false)
        $("#id-local-devolucao").val('').attr("readonly", false)
    }else{
        $("#descricao-local-devolucao").val($("#descricao-local-retirada").val()).attr("readonly", true)
        $("#cep-local-devolucao").val($("#cep-local-retirada").val()).attr("readonly", true)
        $("#cidade-local-devolucao").val($("#cidade-local-retirada").val()).attr("readonly", true)
        $("#estado-local-devolucao").val($("#estado-local-retirada").val()).attr("readonly", true)
        $("#rua-local-devolucao").val($("#rua-local-retirada").val()).attr("readonly", true)
        $("#num-local-devolucao").val($("#num-local-retirada").val()).attr("readonly", true)
        $("#bairro-local-devolucao").val($("#bairro-local-retirada").val()).attr("readonly", true)
        $("#id-local-devolucao").val($("#id-local-retirada").val()).attr("readonly", true)
    }
}

//metodo de pagamento
function verifica_metodo_pagamento(){

    if ($("#metodo_pagamento").val() != 0) {
        $("#div-dados-pagamento").append(`
        <div class="form-group col-md-12">
            <select id='dados-metodo-pagamento' name='dados-metodo-pagamento' class='custom-select mr-sm-2' onchange="adicionaMetodoPagamento()">";
                <option value="0">Adicionar Novo Cartão</option>
            </select>
        </div>
        <div class="form-group col-md-12">
            <select id='tipo_cartao' name='tipo_cartao' class='custom-select mr-sm-2'>";
                <option value="0">Cartão de Débito</option>
                <option value="1">Cartão de Crédito</option>
            </select>
        </div>
        <div class="form-group col-md-12">
            <input id='descricao-cartao' name='descricao-cartao' type='text' class='form-control' maxlength="100" required placeholder='Descrição'>
        </div>
        <div class="form-group col-md-12">
            <input id='nome-cartao' name='nome-cartao' type='text' class='form-control' maxlength="100" required placeholder='Nome no Cartão'>
        </div>
        <div class="form-group col-md-12">
            <input id='numero-cartao' name='numero-cartao' type='text' class='form-control' maxlength="16" required placeholder='Número do Cartão'>
        </div> 
        <div class="form-group col-md-6">
            <label for="mes-validade-cartao">Mês de Validade</label>
            <select id='mes-validade-cartao' name='mes-validade-cartao' class='custom-select mr-sm-2'>
            </select>
        </div>
        <div class="form-group col-md-6">
            <label for="mes-validade-cartao">Ano de Validade</label>
            <select id='ano-validade-cartao' name='ano-validade-cartao' class='custom-select mr-sm-2'>
            </select>
        </div>
        <div class="form-group col-md-3">
            <input id='codigo-seguranca-cartao' name='codigo-seguranca-cartao' type='text' class='form-control' maxlength="4" required placeholder='Código de Segurança'>
        </div>   
        
        `)

        $("#numero-cartao, #codigo-seguranca-cartao").on("input", function (e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });

        for(let i = 0; i < pagamentos.length; i++){
            $('#dados-metodo-pagamento').append($('<option>', {
                value: i+1,
                text: `${pagamentos[i].descricao}`
            }));
        }

        //Adiciona mes e ano no select Dados pagamento

        let meses_nascimento = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
        let mes_validade = document.getElementById('mes-validade-cartao');

        for (let i = 0; i < 12; i++) {
            let opt = document.createElement('option');
            opt.value = i + 1;
            opt.innerHTML = meses_nascimento[i];
            mes_validade.appendChild(opt);
        }

        let validade_min = 2021,
            validade_max = 2035,
            ano_validade = document.getElementById('ano-validade-cartao');

        for (let i = validade_min; i <= validade_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            ano_validade.appendChild(opt);
        }
    }else{
        $("#div-metodo-pagamento").nextAll().remove();
    }
}

function adicionaMetodoPagamento() {
     if($("#dados-metodo-pagamento").val() != 0){
        for(let i = 0; i < pagamentos.length; i++){
            if($("#dados-metodo-pagamento option:selected[value]").text() == pagamentos[i].descricao){

                $("#tipo_cartao").val(`${pagamentos[i].tipo_cartao}`)
                $('#tipo_cartao option:not(:selected)').attr('disabled', true);

                $("#descricao-cartao").val(`${pagamentos[i].descricao}`).attr("readonly", true)
                $("#nome-cartao").val(`${pagamentos[i].nome_cartao}`).attr("readonly", true)
                $("#numero-cartao").val(`${pagamentos[i].numero_cartao}`).attr("readonly", true)

                $("#mes-validade-cartao").val(`${pagamentos[i].mes_validade}`)
                $('#mes-validade-cartao option:not(:selected)').attr('disabled', true);

                $("#ano-validade-cartao").val(`${pagamentos[i].ano_validade}`)
                $('#ano-validade-cartao option:not(:selected)').attr('disabled', true);

                $("#codigo-seguranca-cartao").val(`${pagamentos[i].codigo_seguranca}`).attr("readonly", true)
                $("#id-dados-pagamento").val(`${pagamentos[i].id}`).attr("readonly", true)
            }
        }
    }else{
        $('#tipo_cartao option:not(:selected)').attr('disabled', false);
        $("#tipo_cartao").val('1')

        $("#descricao-cartao").val('').attr("readonly", false)
        $("#nome-cartao").val('').attr("readonly", false)
        $("#numero-cartao").val('').attr("readonly", false)

        $('#mes-validade-cartao option:not(:selected)').attr('disabled', false);
        $("#mes-validade-cartao").val('1')

        $('#ano-validade-cartao option:not(:selected)').attr('disabled', false);
        $("#ano-validade-cartao").val('2022')


        $("#codigo-seguranca-cartao").val('').attr("readonly", false)
        $("#id-dados-pagamento").val('').attr("readonly", false)
    }
}