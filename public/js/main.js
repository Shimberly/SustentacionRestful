var contCuento;
class Usuario {

    constructor(obj) {
        this.user = obj.user;
        this.pass = obj.pass;
        this.nombre = obj.nombre;
        var cuentos = [];
        $.each(obj.cuentos, function (i, emp) {

            var cnt = new Cuento();
            cnt.conObj(emp)
            cuentos.push(cnt);
        });
        this.cuentos = cuentos;
    }
};

class Cuento {


    conObj(obj) {
        //alert(obj.nombre);
        this.nombre = obj.nombre;
        this.descripcion = obj.descripcion;
        this.credito = obj.credito;

        var pregunta = [];
        $.each(obj.pregunta, function (i, emp) {
            var pr = new Pregunta();
            pr.conObj(emp);
            pregunta.push(pr);
        });
        this.pregunta = pregunta;

        var pagina = [];
        $.each(obj.pagina, function (i, emp) {
            var pg = new Pagina();
            pg.conObj(emp);
            pagina.push(pg);
        });
        this.pagina = pagina;

    }
    directo(nombre, descripcion, credito, img, aud) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.credito = credito;

        var pregunta = [];
        $.each(img, function (i, emp) {
            var pr = new Pregunta();
            pr.directo(emp, aud[i]);
            pregunta.push(pr);
        });

        var pagina = [];
        $.each(img, function (i, emp) {
            var pg = new Pagina();
            pg.directo(emp, aud[i]);
            pagina.push(pg);
        });

        this.pagina = pagina;

    }
};

class Pagina {
    conObj(obj) {
        this.imagen = obj.imagen;
        this.audio = obj.audio;
    }
    directo(img, aud) {
        this.imagen = img;
        this.audio = aud;
    }
}

//ConObjt= Para leer de Json
//Directo=para guardar en Json

class Pregunta {
    conObj(obj) {
        //alert(obj.nombre);
        this.img1 = obj.img1;
        this.img2 = obj.img2;
        this.audio = obj.audio;
        this.respuesta = obj.respuesta;
    }
    directo(img1, img2, audio, respuesta) {
        this.img1 = img1;
        this.img2 = img2;
        this.audio = audio;
        this.respuesta = respuesta;
    }
};





function leer() {
    var usuarios = [];

    $.getJSON('datos.json', function (data) {

        $.each(data, function (i, emp) {
            //var usr= new Usuario();
            usuarios.push(new Usuario(emp));
        });
    });
    //alert(usuarios.length);
    return usuarios;

};

/*Agregar otra hoja*/
$(".nHoja").click(function () {

    var texto = "<div class='item'>\
                      <div class='container escenas'>\
                        <div>Pagina " + contCuento + "</div>\
                      </div>\
                    </div>"

    $(".carousel-inner").append(texto);
    $(".nav-dots").append("<li data-target='#myCarousel' data-slide-to=" + contCuento + " class='nav-dot col-md-2'><div class='hojas'>" + contCuento + "</div></li>");
    contCuento++;
    sliderDrop();
});
/*Eliminar otra hoja*/

$(".bHoja").click(function () {
    contCuento--;
    //$(".carousel-control").simulate('click');

    $(".item:last").remove();
    $(".nav-dot:last").remove();
});


/*DIV PREGUNTAS*/

$("#SeleccionarP").hide();
$("#SeleccionarP2").hide();
/*$(".bActividad").click(function () {
    alert("Hola");
});*/


//BOTONES PREHUNTAS/ACTIVIDADES
//PREGUNTA 1 IMG
$('.subirAct').click(function () {
    //alert("HOLA");
   
    $('#SeleccionarP').show();
    $("#SeleccionarP2").hide();

});

//PREGUNTA 2 COLORES
$('.subirAct2').click(function () {
    //alert("HOLA");
    
    $('#SeleccionarP2').show();
    $("#SeleccionarP").hide();

});
 var preguntas = [];
   
$("#guardar").click(function () {
    
    var imagenesCuento = [];
    var audiosCuento = [];
    
    //esta bandera sirve para saber si todas las hojas estan llenas
    var flag = 0;
    $(".escenas").each(function (index) {
        var rutaI = $(this).find("img").attr("src");
        var rutaA = $(this).find("audio").children().attr("src");
        //alert(rutaA);
        //alert("ruta: "+ruta);
        if (rutaI == undefined || rutaA == undefined) {
            alert("Llena todas las hojas.");
            flag++;
            return false;
        } else {
            imagenesCuento.push(rutaI);
            audiosCuento.push(rutaA);
        }
    });

    //si todas las hojas estan llenas se puede guardar sino no
    if (flag == 0) {

      
        var cuento = new Cuento();
        cuento.directo($("#nombre").val(), $("#descripcion").val(), $("#credito").val(), imagenesCuento, audiosCuento);
        cuento.pregunta=preguntas;
        //alert("Se guardo el cuento " + cuento.nombre);
       
    };
        $.ajax({
            url: '/guardarCuento',
            type: 'POST',
            data: cuento,
            cache: false,
          
            success: function (data) {
                 $.ajax({
                        url: '/ultimoid',
                        method: 'GET',

                        success: function (data) {

                            var idcuento = data[0].idcuento;

                             $.each(cuento.pagina, function (i, emp) {
                                    var params = {
                                        id: idcuento,
                                        imagen: emp.imagen,
                                        audio: emp.audio
                                    }

                                  $.ajax({
                                        url: '/insertarImg',
                                        method: 'POST',
                                        data: params,
                                        success: function (data) {
                                            console.log("yeiIMg");

                                        },
                                        error: function () {
                                            console.log("error w");

                                        }
                                    });

                             });
                            $.each(cuento.pregunta, function (i, emp) {
                                //alert("repetir preg");
                                    var params = {
                                        id: idcuento,
                                        pregunta: emp,
                                    }

                                  $.ajax({
                                        url: '/guardarPregunta',
                                        method: 'POST',
                                        data: params,
                                        success: function (data) {
                                            console.log("pregunta guardada we");
                                              window.location.href = "/";

                                        },
                                        error: function () {
                                            console.log("error pregunta");

                                        }
                                    });

                             });

                            

                        },
                        error: function () {
                            console.log("error w");

                        }
                    });
                alert("Se guardó el cuento " + cuento.nombre);
                window.location.href = "/";
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error pokemon");
            }
        });
     
});

/*GUARDAR PREGUNTA EN JSON*/
$("#btnGuardarP1").click(function () {
    
    var img1 = $(".fondoP1").find("img").attr("src");
    var img2 = $(".fondoP2").find("img").attr("src");
    var audio = $(".fondoAudioP").find("audio").children().attr("src");
    var respuesta = $(".respuesta").val();
    
    if(img1 == undefined || img2 == undefined || audio == undefined || respuesta == undefined){
        alert("Completa la actividad");
        
    }else{
        alert("Se guardó la actividad!");
   
        var pregunta = new Pregunta();
        pregunta.directo(img1,img2, audio, respuesta);
        preguntas.push(pregunta);
        
        $("#SeleccionarP").hide();
        $('.subirAct').attr("disabled",true);
        $("#SeleccionarP2").hide();
        $("#btnGuardarP1").attr("disabled", true);
    }
   
});

$("#btnGuardarP2").click(function () {
    
    var img1 = $(".fondo2P1").find("img").attr("src");
    var img2 = $(".fondo2P2").find("img").attr("src");
    var audio = $(".fondoAudioP2").find("audio").children().attr("src");
    var respuesta = $(".respuesta2").val();
    
    if(img1 == undefined || img2 == undefined || audio == undefined || respuesta == undefined){
        alert("Completa la actividad");
        
    }else{
        alert("Se guardó la actividad!");
   
        var pregunta = new Pregunta();
        pregunta.directo(img1,img2, audio, respuesta);
        preguntas.push(pregunta);

        $("#SeleccionarP").hide();
        $("#SeleccionarP2").hide();
        $('.subirAct2').attr("disabled", "disabled");
    }
   
});
$("#btnGuardar2P1").click(function () {
    
     var img1 = $(".fondoP1").find("img").attr("src");
    var img2 = $(".fondoP2").find("img").attr("src");
    var audio = $(".fondoAudioP").find("audio").children().attr("src");
    var respuesta = $(".respuesta").val();
    
    if(img1 == undefined || img2 == undefined || audio == undefined || respuesta == undefined){
        alert("Completa la actividad");
        
    }else{
        alert("Se guardó la actividad!");
   
        var pregunta = new Pregunta();
        pregunta.directo(img1,img2, audio, respuesta);
         preguntas[0]=pregunta;

    }
   
});

$("#btnGuardar2P2").click(function () {
    
    var img1 = $(".fondo2P1").find("img").attr("src");
    var img2 = $(".fondo2P2").find("img").attr("src");
    var audio = $(".fondoAudioP2").find("audio").children().attr("src");
    var respuesta = $(".respuesta2").val();
    
    if(img1 == undefined || img2 == undefined || audio == undefined || respuesta == undefined){
        alert("Completa la actividad");
        
    }else{
        alert("Se guardó la actividad!");
   
        var pregunta = new Pregunta();
        pregunta.directo(img1,img2, audio, respuesta);
        preguntas[1]=pregunta;

    }
   
});
/*FIN GUARDAR PREGUNTA EN JSON*/


/*Salir pero con alerta*/
$("#salir").click(function () {
    window.onbeforeunload = confirmExit;

    function confirmExit() {
        return "Seguro desea salir?";
    }
});


//SUBIR ARCHIVOS AUDIO Y SONIDO

$(".messages").hide();
//queremos que esta variable sea global
var fileExtension = "";
//función que observa los cambios del campo file y obtiene información

$('#imagen').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

//IMAGEN PREGUNTA 1
$('#imagen1').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen1")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#imagen2').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen2")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#imagen3').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen3")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#imagen4').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#imagen4")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageE("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

//FINAL PREGUNTAS

$('#audio').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#audio")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    showMessageA("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#audioAP').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#audioAP")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageP("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});

$('#audioAP2').change(function () {
    //obtenemos un array con los datos del archivo
    var file = $("#audioAP2")[0].files[0];
    //obtenemos el nombre del archivo
    var fileName = file.name;
    //obtenemos la extensión del archivo
    fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
    //obtenemos el tamaño del archivo
    var fileSize = file.size;
    //obtenemos el tipo de archivo image/png ejemplo
    var fileType = file.type;
    //mensaje con la información del archivo
    //showMessageP("<span>Archivo para subir: " + fileName + ", peso total: " + fileSize + " bytes.</span>");
});


//al enviar el formulario
$('.subirImg').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioI")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            message = $("<span>Subiendo la imagen, por favor espere...</span>");
            showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span>La imagen ha subido correctamente.</span>");
            showMessageE(message);
            if (isImage(fileExtension)) {
		//alert(data);
                $(".fondoEscenas").html("<img id='draggable' class='ui-widget-content' src='images/cuentos/" + data + "' />");
                $("#draggable").draggable({
                    revert: true
                });
            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageE(message);
        }
    });
});

//AUDIOS

$('.subirAudio').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioA")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessageA(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessageA(message);
            if (isImage(fileExtension)) {
                $(".fondoAudio").html("<audio id='draggableAudio' controls><source src='images/cuentos/" + data + "' type='audio/mp3'></audio>");
                $("#draggableAudio").draggable({
                    revert: true
                });

            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageA(message);
        }
    });
});

//AUDIO PREGUNTAS

$('.subirAudioP').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessageP(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessageP(message);
            if (isImage(fileExtension)) {
                $(".fondoAudioP").html("<audio controls><source src='images/cuentos/" + data + "' type='audio/mp3'></audio>");
                console.log(data);
                /*<audio controls>
                              <source src="../img/cuentos/000938162_prev.mp3" type="audio/mp3">
                </audio>*/
            }
        },
        //si ha ocurrido un err        
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageP(message);
        }
    });
});
$('.subirAudioP2').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioA2P")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            message = $("<span\>Subiendo el audio, por favor espere...</span>");
            showMessageP2(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            message = $("<span\>El audio ha subido correctamente.</span>");
            showMessageP2(message);
            if (isImage(fileExtension)) {
                $(".fondoAudioP2").html("<audio controls><source src='images/cuentos/" + data + "' type='audio/mp3'></audio>");
                console.log(data);
                /*<audio controls>
                              <source src="../img/cuentos/000938162_prev.mp3" type="audio/mp3">
                </audio>*/
            }
        },
        //si ha ocurrido un err        
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            showMessageP2(message);
        }
    });
});
//CARGA DE ARCHIVO PREGUNTA 1

//al enviar el formulario
$('.subirImgP').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP2")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondoP1").html("<img id='img1' class='ui-widget-content' src='images/cuentos/" + data + "' />");

            }
        },
        //si ha ocurrido un error
        error: function () {
            // message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});


$('.subirImgP2').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioAP3")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondoP2").html("<img id='img2' class='ui-widget-content' src='images/cuentos/" + data + "' />");

            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});

$('.subirImg2P').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioA2P2")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondo2P1").html("<img id='img1' class='ui-widget-content' src='images/cuentos/" + data + "' />");

            }
        },
        //si ha ocurrido un error
        error: function () {
            // message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});


$('.subirImg2P2').click(function () {
    //información del formulario
    var formData = new FormData($(".formularioA2P3")[0]);
    var message = "";
    //hacemos la petición ajax  
    $.ajax({
        url: '/subir',
        type: 'POST',
        // Form data
        //datos del formulario
        data: formData,
        //necesario para subir archivos via ajax
        cache: false,
        contentType: false,
        processData: false,
        //mientras enviamos el archivo
        beforeSend: function () {
            // message = $("<span>Subiendo la imagen, por favor espere...</span>");
            //showMessageE(message)
        },
        //una vez finalizado correctamente
        success: function (data) {
            // message = $("<span>La imagen ha subido correctamente.</span>");
            //showMessageE(message);
            if (isImage(fileExtension)) {
                $(".fondo2P2").html("<img id='img2' class='ui-widget-content' src='images/cuentos/" + data + "' />");

            }
        },
        //si ha ocurrido un error
        error: function () {
            message = $("<span>Ha ocurrido un error.</span>");
            //showMessageE(message);
        }
    });
});


//como la utilizamos demasiadas veces, creamos una función para 
//evitar repetición de código
function showMessageE(message) {
    $(".messagesE").html("").show();
    $(".messagesE").html(message);
}

function showMessageA(message) {
    $(".messagesA").html("").show();
    $(".messagesA").html(message);
}

function showMessageP(message) {
    $(".messagesP").html("").show();
    $(".messagesP").html(message);
}
function showMessageP2(message) {
    $(".messagesP2").html("").show();
    $(".messagesP2").html(message);
}
//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension) {
    switch (extension.toLowerCase()) {
        case 'jpg':
        case 'gif':
        case 'png':
        case 'jpeg':
            return true;
            break;
        case 'mp3':
        case 'wav':
        case 'mp4':
        case 'm4a':
            return true;
            break;
        default:
            return false;
            break;
    }
}

/// //FIN ARCHIVOS AUDIO Y SONIDO

/*ARRASTRAR IMAGENES*/


/* LISTAR CUENTOS */
function leerCuento() {
     var datos="";
     var numero=1;
     var params = {
        idusuario : numero
     }
     $.ajax({
        url: '/listarCuentoPorUsuario',
        type: 'POST',
        data: params,
        cache: false,
       
        success: function (data) {
            
            //console.log(data);
            datos=data;
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
           
        }
    });
    
    
    
    alert("Disfruta de todos los cuentos!" + datos);
   
    //<img id='imghome' src='" + elem.pagina[0].imagen + "' alt=''>\
    $.each(datos, function (index, elem) {
        var img;
        var datosidcuento=elem.idcuento;
     
        $.ajax({
            url: '/listarImg',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {

                //console.log(data);
                img=data[0].imagen;
                
                 $("#ListaCuento").append("<div class='col-md-4 portfolio-item'>\
                <div id='idh5'>\
                        <button id='btnLista' onclick='enviar("+ elem.idcuento +")'>\
                        <h3 id='idh3'>" + elem.nombre + "</h3>\
                        <img id='imghome' src='" + img + "' alt=''>\
                        <p>" + elem.descripcion + "</p>\
                        </button><br>\
                        <button class='btn-success' onclick='enviarEditar("+ elem.idcuento +")'>Editar</button>\
                        <button class='btn-danger' onclick='eliminarCuento("+elem.idcuento+")'>Eliminar</button>\
                </div></div>");
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
        
    });
  
};


/* EDITAR CUENTO LALALA*/
function editarCuento(){
    var j = localStorage.getItem("var");
    
    var elem = {idcuento: j} 
   
    $.ajax({
            url: '/listarCuentoPorId',
            type: 'POST',
            data: elem,
            cache: false,

            success: function (data) {
                console.log("datos id : "+data[0].nombre);
                $("#idcuento").val(data[0].idcuento);
                $("#nombre").val(data[0].nombre);
                $("#descripcion").val(data[0].descripcion);
                $("#credito").val(data[0].creditos);
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
    
    
     $.ajax({
            url: '/listarImg',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {

                console.log(data);
                console.log(data.length);
                
                
                $.each(data, function (index, elem) {
                    $(".carousel-inner").append("<div id="+index+" class='item'> \
                                        <img src='" + elem.imagen + "' alt='ImagenCuento'>\
                                        <div class='container escenas'>\
                                            <div class='carousel-caption'>\
                                                <audio controls><source src='"+elem.audio+"'></audio>\
                                            </div>\
                                        </div>\
                                        </div>");
                    
                $(".nav-dots").append("<li data-target='#myCarousel' data-slide-to="+index+" class='nav-dot col-md-2'>\
                    <div id='hojitas"+index+"' class='hojas '><img src='" + elem.imagen + "' alt='ImagenCuento'></div>\
                    </li>");
                   
                    if(index==0){
                        $(".carousel-inner").find('.item').addClass('item active');
                         $(".nav-dots").find('.nav-dot').addClass('nav-dot active');
                    }

                sliderDrop();
                    
                

                    
                    
                });
                
                contCuento = $(".nav-dot").length;
                //EDITAR PREGUNTAS
                    
                    $.ajax({
                        url: '/listarPreguntas',
                        type: 'POST',
                        data: elem,
                        cache: false,

                        success: function (data) {
                            preguntas.removeAll;
                            if(data.length==1){
                                $(".fondoAudioP").append("<audio controls><source src='" + data[0].audio + "' type='audio/mp3'></audio>");
                                $(".fondoP1").html("<img id='img1' class='ui-widget-content' src='" +  data[0].img1 + "' />");
                                $(".fondoP2").html("<img id='img1' class='ui-widget-content' src='" +  data[0].img2 + "' />");
                                $(".respuesta").val( data[0].respuesta);
                                
                                var pregunta = new Pregunta();
                                pregunta.directo(data[0].img1,data[0].img2, data[0].audio, data[0].respuesta);
                                preguntas.push(pregunta);

                            }
                            if(data.length==2){
                                $(".fondoAudioP").append("<audio controls><source src='" + data[0].audio + "' type='audio/mp3'></audio>");
                                $(".fondoP1").html("<img id='img1' class='ui-widget-content' src='" +  data[0].img1 + "' />");
                                $(".fondoP2").html("<img id='img1' class='ui-widget-content' src='" +  data[0].img2 + "' />");
                                $(".respuesta").val( data[0].respuesta);
                                var pregunta = new Pregunta();
                                pregunta.directo(data[0].img1,data[0].img2, data[0].audio, data[0].respuesta);
                                preguntas.push(pregunta);
                                
                                $(".fondoAudioP2").append("<audio controls><source src='" + data[1].audio + "' type='audio/mp3'></audio>");
                                $(".fondo2P1").html("<img id='img1' class='ui-widget-content' src='" +  data[1].img1 + "' />");
                                $(".fondo2P2").html("<img id='img1' class='ui-widget-content' src='" +  data[1].img2 + "' />");
                                $(".respuesta2").val( data[1].respuesta);
                                var pregunta2 = new Pregunta();
                                pregunta2.directo(data[1].img1,data[1].img2, data[1].audio, data[1].respuesta);
                                preguntas.push(pregunta2);
                            }
                          
                        },
                        //si ha ocurrido un error
                        error: function () {
                            console.log("error");

                        }
                    });
               
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
        
}


//GUARDAR EDITAR CUENTO
function guardarEditar(){
    
    var imagenesCuento = [];
    var audiosCuento = [];
      
    //esta bandera sirve para saber si todas las hojas estan llenas
    var flag = 0;
    $(".escenas").each(function (index) {
        var rutaI = $(this).parent().find("img").attr("src");
        var rutaA = $(this).children().find("source").attr("src");
        //alert("I "+ rutaI);
        //alert("ruta: "+rutaA);
        if (rutaI == undefined || rutaA == undefined) {
            alert("Llena todas las hojas.");
            flag++;
            return false;
        } else {
            console.log("holi");
            imagenesCuento.push(rutaI);
            audiosCuento.push(rutaA);
        }
    });

    //si todas las hojas estan llenas se puede guardar sino no
    if (flag == 0) {

      
        var cuento = new Cuento();
        cuento.directo($("#nombre").val(), $("#descripcion").val(), $("#credito").val(), imagenesCuento, audiosCuento);
        cuento.pregunta=preguntas;
        
        var params = {
            cuento : cuento,
            idcuento: $("#idcuento").val()
        }
       
    
        $.ajax({
            url: '/editarCuento',
            type: 'POST',
            data: params,
            cache: false,
          
            success: function (data) {
                //alert("se editoooo");
                         $.ajax({
                                url: '/eliminarPaginasPorCuento',
                                method: 'POST',
                                data: params,
                                success: function (data) {
                                    console.log("borro paginas");
                                    $.ajax({
                                            url: '/eliminarPreguntasPorCuento',
                                            method: 'POST',
                                            data: params,
                                            success: function (data) {
                                                console.log("borro preguntas");
                                                console.log("pag lenght: "+ cuento.pagina.length);
                                                $.each(cuento.pagina, function (i, emp) {
                         
                          
                                                        var params = {
                                                            id: $("#idcuento").val(),
                                                            imagen: emp.imagen,
                                                            audio: emp.audio
                                                        }

                                                      $.ajax({
                                                            url: '/insertarImg',
                                                            method: 'POST',
                                                            data: params,
                                                            success: function (data) {
                                                                console.log("guardar paginas");

                                                            },
                                                            error: function () {
                                                                console.log("error paginas");

                                                            }
                                                        });

                                                 });
                                                
                                                
                                                 $.each(cuento.pregunta, function (i, emp) {
                                                        //alert("repetir preg");
                                                            var params = {
                                                                id: $("#idcuento").val(),
                                                                pregunta: emp,
                                                            }

                                                          $.ajax({
                                                                url: '/guardarPregunta',
                                                                method: 'POST',
                                                                data: params,
                                                                success: function (data) {
                                                                    console.log("pregunta guardada we");

                                                                },
                                                                error: function () {
                                                                    console.log("error pregunta");

                                                                }
                                                            });

                                                     });
                                                alert("Se editó el cuento " + cuento.nombre);
                                                window.location.href = "/";
                                               
                                            },
                                            error: function () {
                                                console.log("error borrar preguntas");

                                            }
                                      });
                                     
                                },
                                error: function () {
                                    console.log("error borrar paginas");

                                }
                             
                          });
               

                },
                error: function () {
                    console.log("error w");

                }
            });

        };  
        //window.location.href = "/";

            }

function eliminarCuento(btn) {  
    //alert("Hola eliminar cuento"+btn);
    //AQUIIIIIIII ESTABA EL ERROR
    //var j = localStorage.getItem("var");
    var elem = {idcuento: btn}; //Variable transformada en objeto para enviarla en data
    
    //alert("Hola eliminar cuento");
   
    
    $.ajax({
            url: '/eliminarPaginasPorCuento',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {
            
                   //alert("Se ha eliminado las paginas");
                    $.ajax({
                        url: '/eliminarPreguntasPorCuento',
                        type: 'POST',
                        data: elem,
                        cache: false,

                        success: function (data) {

                            //alert("Se ha eliminado las preguntas");
                            $.ajax({
                                url: '/eliminarCuento',
                                type: 'POST',
                                data: elem,
                                cache: false,

                            success: function (data) {

                            alert("Se ha eliminado el cuento!");
                            window.location = "/listarCuentos";

                        },
                                //si ha ocurrido un error
                                error: function () {
                                    console.log("error");
                        }
                        });
                            
                    },
                        //si ha ocurrido un error
                        error: function () {
                            console.log("error");
                    }
                    });
          
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");
            }
    });
    
    
 
  
};
/* LEER USUARIOS */
function leerUsuarios() {
     var datos="";
     $.ajax({
        url: '/listarUsuarios',
        type: 'GET',
       
        cache: false,
        contentType: false,
        processData: false,
        
        success: function (data) {
               //alert("1"); 
               console.log(data);
               datos=data;
               $.each(datos, function (index, elem) {
                   
               $("#ListaUsuario").append("<div class='col-md-4 portfolio-item'>\
                        <div id='idh4'>\
                                <button id='btnLista' onclick='enviarUsuario("+ elem.idusuario +")'>\
                                <h3 id='idh3'>" + elem.nombre + "</h3>\<img id='imghome' src='/images/caticon.png'>\
                                </button>\
                        </div></div>");
                  
               });
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
             alert("eror"); 
           
        }
    });
    
};

//ENVIAR USUARIO PARA SU LECTURA INDIVIDUAL

function enviarUsuario(btn) {  
    //alert("btn: "+btn);
    localStorage.setItem("var", btn);
    window.location = "/usuario";
};


function guardarUsuario() {
    //alert( "usuario"+ $("#usuario").val());
    //alert( "pass"+ $("#pass").val());
    //alert( "nobre"+ $("#nombre").val());
    var params ={
        usuario:$("#usuario").val(),
        pass:$("#pass").val(),
        nombre:$("#nombre").val()
    } 
    
     $.ajax({
        url: '/GuardarUsuario',
        type: 'POST',
       data: params,
        cache: false,
       
        success: function (data) {
            
            console.log(data);
            datos=data;
            alert("Se guardó el usuario "+ $("#usuario").val());
            window.location = "/usuarios";
        },
        //si ha ocurrido un error
        error: function () {
            console.log("error");
           
        }
    });
};


var idRespuesta;

//CUENTO
function recibirCuento() {
    var j = localStorage.getItem("var")
    alert("Disfruta del cuento!");

    var elem = {idcuento: j} //Variable transformada en objeto para enviarla en data

    $.ajax({
            url: '/listarImg',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {

                console.log(data);
                console.log(data.length);
                
                
                $.each(data, function (index, elem) {
                    $(".carousel-inner").append("<div class='item'> \
                                        <img src='" + elem.imagen + "' alt='ImagenCuento'>\
                                        <div class='container'>\
                                            <div class='carousel-caption'>\
                                                <audio controls class='ocultar'><source src='"+elem.audio+"'></audio>\
                                                <button id='reproducir' onclick='reproducir(this)'><img src='images/repro.png'></button>\
                                            </div>\
                                        </div>\
                                        </div>");
                    if(index==0){
                        $(".carousel-inner").find('.item').addClass('item active');
                    }


                });
          
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
    
    $.ajax({
            url: '/listarCuentoPorId',
            type: 'POST',
            data: elem,
            cache: false,

            success: function (data) {
                //console.log("datos id : "+data[0].nombre);
                $(".cuentoTitulo").html("<a href='#'>"+data[0].nombre+"</a>");
                $(".descripcion").html(data[0].descripcion);
                $(".credito").html("Créditos: "+data[0].creditos);
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
     $.ajax({
            url: '/listarPreguntas',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {

                //console.log(data);
                //console.log(data.length);
                 
            $.each(data, function (i, elem2) {
              $(".carousel-inner").append("<div class='item'> \
                                    <img src='images/fondoPregunta.jpg' alt='ImagenCuento'>\
                                    <div class='container'>\
                                        <div class='carousel-caption'>\
                                            <h3>PREGUNTA "+(i+1)+"</h3>\
                                            <button id='reproducir' onclick='mst("+(i+1)+")'><img src='images/interrogacion.png'></button>\
                                        </div>\
                                    </div>\
                                    </div>");
                
                $(".cntCuento").append("<div id='preguntas"+(i+1)+"' class='ocultar'>\
                          <div class='panel panel-default'>\
                                <div class='panel-heading'>\
                                    <h3 class='panel-title'>ACTIVIDAD</h3>\
                                </div>\
                                <div class='panel-body'>\
                                        <div class='col-md-4 col-sm-4 fondoAudio'>\
                                            <br><br><br>\
                                            <audio controls id='audioPregunta' class='ocultar'><source src='"+ elem2.audio+"'></audio>\
                                            <button id='reproducirPre"+(i+1)+"' onclick='reproducirPregunta"+(i+1)+"()'><img src='images/repro.png'></button>\
                                        </div>\
                                        <div class='col-md-8 col-sm-8 fondoPreguntas'>\
                                            <button id='valImg1' onclick = 'validarimg1()'><img id='img1' src='" + elem2.img1 + "' alt=''></button>\
                                            <button id='valImg2' onclick = 'validarimg2()'><img id='img2' src='" + elem2.img2 + "' alt=''></button>\
                                        </div>\
                                </div>\
                            </div>\
                      </div>");
               
                idRespuesta = elem2.respuesta;
            });
         },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
        });
    
    
};

function recibirUsuario() {  
    //alert("hola");
    var j = localStorage.getItem("var")
    var elem = {idusuario: j} //Variable transformada en objeto para enviarla en data
    
    $.ajax({
            url: '/mostrarUsuario',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {
            
            $("#usuario").val(data[0].usuario);
            $("#pass").val(data[0].pass);
            $("#nombre").val(data[0].nombre);
            
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
    });
};

function actualizarUsuario() {  
    //alert("Hola actualizar");
    
    var j = localStorage.getItem("var")
    
    var elem = {idusuario: j,usuario:$("#usuario").val(),pass:$("#pass").val(),nombre:$("#nombre").val()} //Variable transformada en objeto para enviarla en data
    
       $.ajax({
            url: '/actualizarUsuario',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {
                
            alert("Se ha actualizado el usuario "+$("#usuario").val());
            window.location = "/usuarios";
          
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");

            }
    });
    
};

function eliminarUsuario() {  
    //alert("Hola eliminar");
    var j = localStorage.getItem("var")
    var elem = {idusuario: j} //Variable transformada en objeto para enviarla en data
     $.ajax({
            url: '/eliminarUsuario',
            type: 'POST',
            data: elem,
            cache: false,
          
            success: function (data) {
            
           alert("Se ha eliminado correctamente!");
           window.location = "/usuarios";
            },
            //si ha ocurrido un error
            error: function () {
                console.log("error");
            }
    });
};

function reproducir(btn) {
   $(btn).parent().find('audio')[0].play();
};
function reproducirPregunta1(btn) {
   
   $("#reproducirPre1").parent().find('audio')[0].play();
};
function reproducirPregunta2(btn) {
   
   $("#reproducirPre2").parent().find('audio')[0].play();
};

/*PREGUNTAS*/
function mst(i) {
    var prg='#preguntas'+i;
    $(prg).removeClass("ocultar");
    $(prg).addClass("mostrar");
    
    $("#myCarousel").removeClass("mostrar");
    $("#myCarousel").addClass("ocultar");
};

function ocl() {
    $("#myCarousel").removeClass("ocultar");
    $("#myCarousel").addClass("mostrar");
    $("#preguntas1").removeClass("mostrar");
    $("#preguntas1").addClass("ocultar");
    $("#preguntas2").removeClass("mostrar");
    $("#preguntas2").addClass("ocultar");
};

//PASAR VARIABLE
function enviar(btn) {  
    localStorage.setItem("var", btn);
    window.location = "/cuento";
};


function enviarEditar(btn) {  
    localStorage.setItem("var", btn);
    window.location = "/editarCuento";
};


/*CARGAR ACTIVIDADES EN LOS CUENTOS*/

function validarimg1(){
     if(idRespuesta == 1){
        alert("FELICIDADES!!! LO CONSEGUISTE");
        $("#valImg1").removeClass('pintarRspCorrecta');
        $("#valImg1").addClass('limpiarRspCorrecta');
        ocl();
       }else{
            alert("La respuesta era la otra opcion :c ! Intenta de nuevo");
            $("#valImg2").removeClass('limpiarRspCorrecta');
            $("#valImg2").addClass('pintarRspCorrecta');
        
       }
}
function validarimg2(){
     if(idRespuesta == 2){
        alert("FELICIDADES!!! LO CONSEGUISTE");
         $("#valImg2").removeClass('pintarRspCorrecta');
         $("#valImg2").addClass('limpiarRspCorrecta');
        ocl();
       }else{
        alert("La respuesta era la otra opcion :c ! Intenta de nuevo");
        $("#valImg1").removeClass('limpiarRspCorrecta');
        $("#valImg1").addClass('pintarRspCorrecta');
        
       }
}
sliderDrop();

function sliderDrop() {
    $(".item").droppable({
        drop: function (event, ui) {

            if (ui.draggable.attr("id") == "draggable") {
                //alert("img");
                var id = ui.draggable.attr("src");
                if($(this).find("img").attr("src")==undefined){
                    //alert("desde item undefined");
                    $(this).children().append("<img src='" + id + "'>");
                }else{
                    //alert("desde item lleno");
                    $(this).find("img").attr("src",id);
                }
                var numero=$(this).attr("id");
                //alert(numero);
                $("#hojitas"+numero).children().attr("src",id);

            } else {
                //alert("audio");
                
                
                var id = ui.draggable.children().attr("src");
                //alert($(this).find("audio").children().attr("src"));
                if($(this).find("audio").children().attr("src")==undefined){
                    //alert("desde item undefined");
                    $(this).children().prepend("<audio controls><source src='" + id + "' type='audio/mp3'></audio>");
                }else{
                    //alert("desde item lleno");
                    $(this).find("source").attr("src",id);
                }
            }


        }
    });
}

function crearCuento(){
    
    contCuento=5;
}