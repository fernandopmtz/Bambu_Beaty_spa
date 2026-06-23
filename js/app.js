const botonIrArriba = document.getElementById('btn-arriba');


botonIrArriba.addEventListener('click', () => {
 // Nos desplaza al inicio de la página (coordenadas 0,0) de forma suave
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});