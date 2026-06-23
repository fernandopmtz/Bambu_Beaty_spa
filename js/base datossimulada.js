// SIMULACIÓN DE BASE DE DATOS DE SERVICIOS
const datosServicios = {
    "Masaje Descontracturante": {
        descripcion: "Terapia de presión profunda para liberar nudos musculares y tensión crónica en cuello y espalda.",
        duracion: "60 min",
        precio: "$45.000"
    },
    "Corte y Coloración": {
        descripcion: "Asesoría de imagen, tintura premium y corte estilizado con lavado spa incluido.",
        duracion: "120 min",
        precio: "$65.000"
    },
    "Manicura Permanente": {
        descripcion: "Limpieza profunda, esmaltado en gel de larga duración y exquisito masaje de manos.",
        duracion: "45 min",
        precio: "$25.000"
    },
    "Limpieza Facial Profunda": {
        descripcion: "Exfoliación, extracción de impurezas, mascarilla calmante y aparatología de vanguardia.",
        duracion: "50 min",
        precio: "$35.000"
    },
    "Pedicura Spa Rejuvenecedora": {
        descripcion: "Baño de pies, exfoliación, hidratación profunda con parafina y esmaltado tradicional.",
        duracion: "60 min",
        precio: "$28.000"
    }
};

$(document).ready(function() {
    // 1. LÓGICA DEL MODAL DE RESERVA (AQUÍ INYECTAMOS LA INFO DINÁMICA)
    $('#reservaModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); 
        var nombreServicio = button.data('bs-servicio'); 
        
        // Buscar el servicio en nuestra "Base de Datos simulada"
        var detalles = datosServicios[nombreServicio];
        var modal = $(this);
        
        // Inyectar los datos en el modal
        modal.find('#dinamicoTituloServicio').text(nombreServicio);
        modal.find('#modalServicioOculto').val(nombreServicio); // Para el envío del formulario
        
        if (detalles) {
            modal.find('#dinamicoDescServicio').text(detalles.descripcion);
            modal.find('#dinamicoDuracion').text(detalles.duracion);
            modal.find('#dinamicoPrecio').text(detalles.precio);
        }

        // Resetear alertas y form
        $('#alertaExito').addClass('d-none');
        $('#formularioReserva').show();
        $('.modal-footer').show();
        $('#formularioReserva')[0].reset();
    });

    // Simulación de envío de reserva
    $('#btnConfirmarReserva').click(function() {
        $('#formularioReserva').hide();
        $('.modal-footer').hide();
        $('#alertaExito').removeClass('d-none');
        
        setTimeout(function() {
            $('#reservaModal').modal('hide');
        }, 2500);
    });

    // 2. LÓGICA DEL MODAL DE COMENTARIOS (La misma que ya teníamos)
    $('#btnPublicarComentario').click(function() {
        var nombre = $('#inputNombreAutor').val().trim();
        var texto = $('#inputTextoComentario').val().trim();
        var cantidadEstrellas = $('#selectEstrellas').val();

        if(nombre === "" || texto === "") {
            alert("Por favor, completa tu nombre y el comentario.");
            return;
        }

        var estrellasHTML = '';
        for(var i = 0; i < cantidadEstrellas; i++) {
            estrellasHTML += '<i class="fa-solid fa-star"></i>';
        }

        var nuevoItemHTML = `
        <div class="carousel-item">
            <div class="comentario-card">
                <p>"${texto}"</p>
                <h4>- ${nombre}</h4>
                <div class="estrellas">${estrellasHTML}</div>
            </div>
        </div>`;

        $('#contenedorComentarios').append(nuevoItemHTML);
        var totalComentarios = $('.carousel-item').length;
        $('#carruselComentarios').carousel(totalComentarios - 1);

        $('#formComentario').hide();
        $('.modal-footer').hide();
        $('#alertaComentarioExito').removeClass('d-none');

        setTimeout(function() {
            $('#modalNuevoComentario').modal('hide');
            $('#alertaComentarioExito').addClass('d-none');
            $('#formComentario').show();
            $('.modal-footer').show();
            $('#formComentario')[0].reset();
        }, 2500);
    });
});