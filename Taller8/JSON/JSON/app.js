var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            /*Aquí deben procesar el JSON y mostrar la respuesta en el HTML*/
            LeerCancionesJSON();
        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('     ');
    }
}

function LeerCancionesJSON(){
    if (window.XMLHttpRequest){
        JSONhttp = new XMLHttpRequest();
    }
    else{
        JSONhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    JSONhttp.open('GET', "datos.json");
    JSONhttp.responseType = 'json';
    JSONhttp.send();
    JSONhttp.onload = function() {
        var canciones = JSONhttp.response;
        imprimirCanciones(canciones);
    }
}

function imprimirCanciones(jsonObj){
    var listaCanciones = document.getElementById("lista-canciones");
    for (i = 0; i < jsonObj.length; i++) {
        var lis = document.createElement('li');
        var txtTitulo = document.createTextNode(jsonObj[i].titulo);
        lis.appendChild(txtTitulo);
        listaCanciones.appendChild(lis);
   }
}