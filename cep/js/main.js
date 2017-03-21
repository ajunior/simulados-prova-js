var cep = $('#cep');
var cepError = $('#cepError');
var uf = $('#uf');
var cidade = $('#cidade');
var bairro = $('#bairro');
var rua = $('#rua');

cep.addEventListener('keyup', getLocalizacao(), false);

function getLocalizacao(){
    let cepValue = cep.value;
    if (/^(\d{8})$/.test(cepValue)) {
        cepError.style.display = 'none';
        cep.style.borderColor = '#ccc';
        let url = `https://viacep.com.br/ws/${cepValue}/json/`;
    
        makeRequest({
            url: url,
            sucessfulCallback: (response) => {
                let infoLocation = JSON.parse(response);
                rua.val = infoLocation.logradouro;
                bairro.value = infoLocation.bairro;
                cidade.value = infoLocation.localidade;
                uf.value = infoLocation.uf;
            }
        });
    } else {
        cepError.style.display = 'block';
        cep.style.borderColor = '#f00';
    }
}

function makeRequest({
    method = 'get',
    url = '/',
    data = null,
    sucessfulCallback = () => {},
    errorCallback = () => {},
    headers = null // [["Content-Type", "application/json"],...]
}){
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 400) {
            sucessfulCallback(xhr.responseText);
        } else {
            errorCallback();
        }
    }

    if(headers) {
        headers.forEach((header) => xhr.setRequestHeader(...header));
    }
    xhr.open(method, url, true);
    xhr.send(data);
}
