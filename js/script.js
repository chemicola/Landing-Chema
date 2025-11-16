// ==================================
// FUNCIONALIDAD DEL MENÚ HAMBURGUESA
// ==================================

// Seleccionamos el botón hamburguesa del DOM
const hamburger = document.getElementById('hamburger');

// Seleccionamos el menú de navegación
const nav = document.getElementById('nav');

// Seleccionamos todos los enlaces del menú
const navLinks = document.querySelectorAll('.nav-link');

// Añadimos un evento click al botón hamburguesa
hamburger.addEventListener('click', () => {
    // Toggle: si tiene la clase 'active', la quita; si no la tiene, la añade
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Cerramos el menú cuando se hace click en cualquier enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Quitamos las clases 'active' para cerrar el menú
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ==================================
// FUNCIONALIDAD DEL NAVBAR OCULTABLE
// ==================================

// Seleccionamos el header del DOM
const header = document.getElementById('header');

// Variable para guardar la posición anterior del scroll
let lastScrollY = window.scrollY;

// Añadimos un evento de escucha al scroll de la ventana
window.addEventListener('scroll', () => {
    // Guardamos la posición actual del scroll
    const currentScrollY = window.scrollY;
    
    // Verificamos si estamos haciendo scroll hacia abajo
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Si hacemos scroll hacia abajo y hemos bajado más de 100px,
        // añadimos la clase para ocultar el navbar
        header.classList.add('navbar-hidden');
    } else {
        // Si hacemos scroll hacia arriba, quitamos la clase
        // para mostrar el navbar nuevamente
        header.classList.remove('navbar-hidden');
    }
    
    // Actualizamos la posición anterior con la posición actual
    // para la próxima vez que se ejecute el evento
    lastScrollY = currentScrollY;
});

// ==================================
// PREVENCIÓN DEL ENVÍO DEL FORMULARIO
// (Solo para demostración - en producción conectarías con un backend)
// ==================================

// Seleccionamos el formulario de contacto
const contactForm = document.getElementById('contacto-form');

// Añadimos un evento de envío al formulario
contactForm.addEventListener('submit', (e) => {
 // Prevenimos el comportamiento por defecto (recargar la página)
e.preventDefault();
 
// NOTA: Se ha quitado el alert() para evitar que bloquee la página.
    // En un proyecto real, aquí iría la lógica para enviar los datos 
    // a un servicio como Netlify Forms, Formspree, o un backend propio.
console.log('Formulario enviado (simulación).');

// Reseteamos el formulario (limpiamos los campos)
contactForm.reset();

    // Opcional: Mostrar un mensaje de éxito no-intrusivo
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.innerText = '¡Enviado con éxito!';
    submitButton.disabled = true;

    setTimeout(() => {
        submitButton.innerText = 'Enviar Mensaje';
        submitButton.disabled = false;
    }, 3000);
});