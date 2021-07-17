
console.log('executando o arquivo teste.js');

const inputBairro = document.getElementById('bairro');
const inputLogradouro = document.getElementById('logradouro');
const inputLocalidade = document.getElementById('localidade');
const inputCEP = document.getElementById('cep');
const botaoConsultar = document.getElementById('consultar');

//88306834

const ViaCepService = {
    get(cep, callbackSuccess, callbackError){
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    callbackSuccess(xhttp.responseText);
                } else {
                    callbackError('Erro de consulta');
                }
            }
        };
        xhttp.open('GET', url, true);
        xhttp.send();
    }
};

botaoConsultar.addEventListener('click' , () => {
    const cep = inputCEP.value;
    const casoSucesso = function(obj){
        inputBairro.value = obj.bairro;
        inputLogradouro.value = obj.logradouro;
        inputLocalidade.value = obj.localidade;
    };
    const casoErro = function(erro){
        console.log('A consulta retornou um erro: ', erro);
    };
    ViaCepService.get(cep, casoSucesso, casoErro);
});