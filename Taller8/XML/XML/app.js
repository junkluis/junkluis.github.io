var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/plain');
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
            /*Aquí deben procesar el archivo y cargar la información en el contenedor especificado*/
            LeerCancionesXML();

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('      ');
    }
}

function LeerCancionesXML(){
    if (window.XMLHttpRequest){
        xmlhttp=new XMLHttpRequest();
    }
    else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET","datos.xml",false);
    xmlhttp.send();

    xmlDoc = xmlhttp.responseXML;

    var foros = xmlDoc.getElementsByTagName("cancion");
    listaCanciones = document.getElementById("lista-canciones");
    for(var i=0;i<foros.length;i++)
    {
        console.log(foros[i].getAttribute("titulo"));
        var titulo = foros[i].getAttribute("titulo");
        var lis = document.createElement('li');
        var txtTitulo = document.createTextNode(titulo);
        lis.appendChild(txtTitulo);
        listaCanciones.appendChild(lis);   
    }

}