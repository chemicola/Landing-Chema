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

// 1. Seleccionamos los elementos
const contactForm = document.getElementById('contacto-form');
const contactFeedback = document.getElementById('contact-feedback');

// 2. Añadimos el evento 'submit'
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        // A. Evitamos que la página se recargue
        event.preventDefault();

        // B. Preparamos los datos
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // C. Feedback visual: "Enviando..."
        if(submitButton) {
            submitButton.textContent = "Enviando...";
            submitButton.disabled = true;
        }
        if(contactFeedback) {
            contactFeedback.textContent = "";
            contactFeedback.className = ""; // Limpiar colores previos
        }

        // D. Petición real a Formspree
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Éxito: Mensaje verde y limpiar form
                contactFeedback.textContent = "¡Mensaje enviado con éxito!";
                contactFeedback.style.color = "#4ade80"; // Verde
                contactForm.reset();
            } else {
                // Error: Mensaje rojo
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        contactFeedback.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        contactFeedback.textContent = "Hubo un error al enviar el mensaje.";
                    }
                    contactFeedback.style.color = "#ef4444"; // Rojo
                });
            }
        })
        .catch(error => {
            // Error de red
            contactFeedback.textContent = "Error de conexión. Inténtalo de nuevo.";
            contactFeedback.style.color = "#ef4444";
        })
        .finally(() => {
            // Restaurar el botón
            if(submitButton) {
                submitButton.textContent = "Enviar Mensaje";
                submitButton.disabled = false;
            }
        });
    });
}