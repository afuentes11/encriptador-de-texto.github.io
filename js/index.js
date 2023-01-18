// I/O de texto
var texto_entrada = document.getElementById("texto-entrada");
var texto_salida = document.getElementById("texto-salida");

//Contenedores para cada ocasion
var con_texto = document.getElementById("con-texto");
var sin_texto = document.getElementById("sin-texto");

//botones
var btn_encriptar = document.getElementById("encriptar");
var btn_desencriptar = document.getElementById("desencriptar");
var btn_copiar = document.getElementById("copiar");

//Texto "Ningún mensaje fue encontrado"
var mensaje = document.getElementById('sin-mensaje');

// informacion
var informacion = document.getElementById('informacion');

var contenedor_salida = document.getElementById('contenedor-salida');

const entrada_de_texto = {
    //Cambia el área para mostrar el texto encriptado/desencriptado.
    existe: function(){
        con_texto.classList.remove('ocultar');
        sin_texto.classList.add('ocultar');
        
    },
    no_existe: function(){
        con_texto.classList.add('ocultar');
        sin_texto.classList.remove('ocultar');
    }
}


//Funcion para encriptar texto
const transformaciones_encriptar = {
    e: 'enter',
    i: 'imes',
    a: 'ai',
    o:'ober',
    u: 'ufat'
}

//Funcion para encriptar texto
const transformaciones_desencriptar = {
    enter: 'e',
    imes: 'i',
    ai: 'a',
    ober:'o',
    ufat: 'u'
}

let btn_funcion_pulsado = false;
function encriptar_desencriptar(accion , texto) {
    if(texto_entrada.value === ''){
        if(!btn_funcion_pulsado){

            contenedor_salida.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            btn_funcion_pulsado = true;
            entrada_de_texto.no_existe();
            mensaje.classList.add('animacion-sin-texto');
            setTimeout(function(){
                mensaje.classList.remove('animacion-sin-texto');
                btn_funcion_pulsado = false;
            }, 1500);
        }
    }else if(texto.match(/[A-ZÀ-Úà-ú]+/g)!==null){
        if(!btn_funcion_pulsado){
            btn_funcion_pulsado = true;
            entrada_de_texto.no_existe();
            informacion.classList.add('animacion-sin-texto');
            setTimeout(function(){
                informacion.classList.remove('animacion-sin-texto');
                btn_funcion_pulsado = false;
            }, 1500);
        }
    }
    else{

        contenedor_salida.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        let texto_encriptado = texto
        let transformaciones = (accion == 'encriptar') ? 
                                {...transformaciones_encriptar} : 
                                (accion == 'desencriptar') ?
                                {...transformaciones_desencriptar}: 
                                {}

        Object.keys(transformaciones).forEach(key => {
            let regex = new RegExp(key, 'g');
            texto_encriptado = texto_encriptado.replace(regex, transformaciones[key]);
        });

        texto_salida.textContent = texto_encriptado;
        entrada_de_texto.existe();
        btn_copiar.classList.remove('check');
        
    }
}

//evento clic en el boton encriptar
btn_encriptar.addEventListener("click", function(event){
    event.preventDefault();
    const texto = texto_entrada.value;
    encriptar_desencriptar('encriptar', texto)
});

//evento clic en el boton desencriptar
btn_desencriptar.addEventListener("click", function(event){
    event.preventDefault();
    const texto = texto_entrada.value;
    encriptar_desencriptar('desencriptar', texto)
});

let btn_copiar_pulsado = false;
btn_copiar.addEventListener("click", function(){
    if (!btn_copiar_pulsado){
        btn_copiar_pulsado = true;
        const texto = texto_salida.textContent;
        navigator.clipboard.writeText(texto).then(() => {
            btn_copiar.classList.add('check');
            setTimeout(function(){
                btn_copiar.classList.remove('check');
                btn_copiar_pulsado = false;
            }, 1500);
        }).catch(err => {
            console.log("Error al intentar copiar texto en el portapapeles: ", err);
        });
    }
});