
console.log('executando o arquivo teste.js');

const inputBairro = document.getElementById('bairro');
const inputLogradouro = document.getElementById('logradouro');
const inputLocalidade = document.getElementById('localidade');
const inputCEP = document.getElementById('cep');
const botaoConsultar = document.getElementById('consultar');

//88306834

const http = {
    post(url, params){
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(xhttp.responseText);
                    } else {
                        reject('Erro');
                    }
                }
            };
            xhttp.open('POST', url, true);
            xhttp.send(params);
        });
    },
    get(url) {
        return new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        resolve(xhttp.responseText);
                    } else {
                        reject('Erro');
                    }
                }
            };
            xhttp.open('GET', url, true);
            xhttp.send();
        });
    }
};

const ViaCepService = {
    baseUrl () {
        return 'https://viacep.com.br';
    },

    consultaCep(cep) {
        const url = `${this.baseUrl()}/ws/${cep}/json/`;
        return http.get(url);
    },

    cadastraCep(cep, logradouro, localidade) {
        const url = `${this.baseUrl()}/ws/cadastra-cep/${cep}`;
        const params = {
            cep: cep,
            logradouro: logradouro,
            localidade: localidade
        };
        return http.post(url, params);
    }
};

const exibirModal = () => {};
const fecharModal = () => {};

botaoConsultar.addEventListener('click' , () => {
    exibirModal('Carregando...');
    const cep = inputCEP.value;
    ViaCepService.consultaCep(cep)
        .then((str) => {
            const obj = JSON.parse(str);
            inputBairro.value = obj.bairro;
            inputLogradouro.value = obj.logradouro;
            inputLocalidade.value = obj.localidade;
            fecharModal();
        }).catch((erro) => {
            console.log('Promise retornou um erro: ', erro);
            fecharModal();
        }
    );
});
