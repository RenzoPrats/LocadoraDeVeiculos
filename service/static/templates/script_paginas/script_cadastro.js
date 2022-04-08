let formulario;
let formulario2;

formulario = `            <form id='formulario_login' name='formulario_login' action='/login' method='POST'>`;
formulario += `              <input type='hidden' name='csrfmiddlewaretoken' value=${CRSF_TOKEN}>`
formulario += "              <div class='form-group row'>";
formulario +="                <div class='col-md-7 mb-4 mb-lg-0'>";
formulario += "                  <input id='email_login' name='email_login' type='email' class='form-control' placeholder='E-mail' required>";
formulario +="                </div>";
formulario +="                <div class='col-md-5'>";
formulario +="                  <input id='senha_login' name='senha_login' type='password' class='form-control' placeholder='Senha' required>";
formulario +="                </div>";
formulario +="              </div>";
formulario +="              <div class='form-group row'>";
formulario +="                <div class='col-md-3 mr-auto'>";
formulario +="                  <input type='submit' class='btn btn-block btn-primary text-white py-2 px-5' value='Iniciar Sessão'>";
formulario +="                </div>";
formulario +="              </div>";
formulario +="            </form>";



formulario2 = "            <form id='formulario_novo_usuario' name='formulario_novo_usuario' action='/cadastrar_usuario' method='POST'>";
formulario2 += `              <input type='hidden' name='csrfmiddlewaretoken' value=${CRSF_TOKEN}>`
formulario2 +="                  <div>"
formulario2 +=                      "<label>Informações Pessoais</label>"
formulario2 +="                     <div class='form-group row'>";
formulario2 +="                         <div class='col-md-6 mb-4 mb-lg-0'>";
formulario2 +="                             <input id='nome_cadastro' name='nome_cadastro' type='text' maxlength='50' class='form-control' placeholder='Nome' required>";
formulario2 +="                         </div>";
formulario2 +="                         <div class='col-md-6'>";
formulario2 +="                             <input id='sobrenome_cadastro' name='sobrenome_cadastro' type='text' maxlength='50' class='form-control' placeholder='Sobrenome' required>";
formulario2 +="                         </div>";
formulario2 +="                     </div>";
formulario2 +="                 </div>"

formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-12 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='email_cadastro' name='email_cadastro' type='email' maxlength='255' class='form-control' placeholder='E-mail' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-6 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='senha1_cadastro' name='senha1_cadastro' type='password' class='form-control' placeholder='Senha' required>";
formulario2 +="                </div>";
formulario2 +="                <div class='col-md-6'>";
formulario2 +="                  <input id='senha2_cadastro' name='senha2_cadastro' type='password' class='form-control' placeholder='Confirme Sua Senha' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-12 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='cpf_cnpj_cadastro' name='cpf_cnpj_cadastro' maxlength='14' type='text' class='form-control' placeholder='CPF/CNPJ' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <label>Data de Nascimento</label>"
formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-4 mb-4 mb-lg-0'>";
formulario2 +="                  <select  id='ano_nasc_cadastro' name='ano_nasc_cadastro' class='custom-select mr-sm-2' id='option-ano'>";
formulario2 +="                  </select>";
formulario2 +="                </div>";
formulario2 +="                <div class='col-md-4'>";
formulario2 +="                  <select id='mes_nasc_cadastro' name='mes_nasc_cadastro' class='custom-select mr-sm-2' id='option-mes' onchange='verificaMes()'>";
formulario2 +="                  </select>";
formulario2 +="                </div>";
formulario2 +="                <div class='col-md-4'>";
formulario2 +="                  <select id='dia_nasc_cadastro' name='dia_nasc_cadastro' class='custom-select mr-sm-2'>";
formulario2 +="                  </select>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <label>Endereço</label>"
formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-12 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='cep_cadastro' name='cep_cadastro' type='text' maxlength='8' class='form-control' placeholder='CEP' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-4 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='estado_cadastro' name='estado_cadastro' type='text' maxlength='2' class='form-control' placeholder='Sigla Estado' required>";
formulario2 +="                </div>";
formulario2 +="                <div class='col-md-8'>";
formulario2 +="                  <input id='cidade_cadastro' name='cidade_cadastro' type='text' maxlength='100' class='form-control' placeholder='Cidade' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-9 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='rua_cadastro' name='rua_cadastro' type='text' maxlength='100' class='form-control' placeholder='Rua' required>";
formulario2 +="                </div>";
formulario2 +="                <div class='col-md-3'>";
formulario2 +="                  <input id='numero_cadastro' name='numero_cadastro' type='number' maxlength='5' class='form-control' placeholder='Número' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";
formulario2 +="             <div class='form-group row'>";
formulario2 +="                <div class='col-md-12 mb-4 mb-lg-0'>";
formulario2 +="                  <input id='bairro_cadastro' name='bairro_cadastro' type='text' maxlength='100' class='form-control' placeholder='Bairro' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";

formulario2 +="              <div class='form-group row'>";
formulario2 +="                <div class='col-md-3 mr-auto'>";
formulario2 +="                  <input type='submit' class='btn btn-block btn-primary text-white py-2 px-5' value='Cadastrar' required>";
formulario2 +="                </div>";
formulario2 +="              </div>";
formulario2 +="            </form>";

function criarTelaCadastro() {
    $("#texto_login_cadastro").text('Já possui cadastro?')
    //Altera o botão
    $("#botao_cadastro_login").text('Entrar')
    $("#botao_cadastro_login").attr("onclick", "criarTelaLogin()")
    //Altera os campos
    $("#conteudo-formulario-login-cadastro").empty()
    $("#conteudo-formulario-login-cadastro").append(formulario2)

    //mascara numero
    $("#cpf_cnpj_cadastro,#cep_cadastro, #numero_cadastro").on("input", function (e) {
        this.value = this.value.repflace(/[^0-9]/g, '');
    });


    //add options

    //ano nascimento
    let ano_min = 1950,
        ano_max = 2003,
        ano_nascimento = document.getElementById('ano_nasc_cadastro');

    for (let i = ano_min; i <= ano_max; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        ano_nascimento.appendChild(opt);
    }

    //mes nascimento
    let meses_nascimento = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

    let mes_nascimento = document.getElementById('mes_nasc_cadastro');

    for (let i = 0; i < 12; i++) {
        let opt = document.createElement('option');
        opt.value = i + 1;
        opt.innerHTML = meses_nascimento[i];
        mes_nascimento.appendChild(opt);
    }

    //dia nascimento
    let dia_min = 1,
        dia_max = 31,
        dia_nascimento = document.getElementById('dia_nasc_cadastro');

    for (let i = dia_min; i<=dia_max; i++){
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        dia_nascimento.appendChild(opt);
    }
}

function criarTelaLogin() {
    $("#texto_login_cadastro").text('Não é cadastrado ainda?')
    //Altera o botão
    $("#botao_cadastro_login").text('Cadastre-se Agora')
    $("#botao_cadastro_login").attr("onclick", "criarTelaCadastro()")
        //Altera os campos
    $("#conteudo-formulario-login-cadastro").empty()
    $("#conteudo-formulario-login-cadastro").append(formulario)
}

//setando background
var classes_banner = document.getElementById("banner").className
document.getElementById("banner").className = classes_banner + " banner-cadastro"

function verificaMes() {
    let meses_31 = ['1', '3', '5', '7', '8', '10', '12']

    //dia nascimento
    let dia_min,
        dia_max,
        dia_nascimento = document.getElementById('dia_nasc_cadastro');

    if($("#mes_nasc_cadastro").val() == 2) {
        $("#dia_nasc_cadastro").empty();
        dia_min = 1;
        dia_max = 28;
        for (let i = dia_min; i<=dia_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            dia_nascimento.appendChild(opt);
        }

    }else if(meses_31.includes($("#mes_nasc_cadastro").val())){
        $("#dia_nasc_cadastro").empty();
        dia_min = 1;
        dia_max = 31;
        for (let i = dia_min; i<=dia_max; i++) {
            let opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = i;
            dia_nascimento.appendChild(opt);
        }

    }else{
        $("#dia_nasc_cadastro").empty();
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
