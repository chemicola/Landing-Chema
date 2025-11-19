// ==================================
// FUNCIONALIDAD DEL MENÚ HAMBURGUESA
// ==================================

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// ==================================
// FUNCIONALIDAD DEL NAVBAR OCULTABLE
// ==================================

const header = document.getElementById('header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('navbar-hidden');
    } else {
        header.classList.remove('navbar-hidden');
    }
    
    lastScrollY = currentScrollY;
});

// ==================================
// FUNCIONALIDAD DEL FORMULARIO
// ==================================

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contacto-form');
    const contactFeedback = document.getElementById('contact-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // IMPORTANTE: Evitar que el formulario se envíe de forma tradicional
            event.preventDefault();
            event.stopPropagation();

            // Preparamos los datos del formulario
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Feedback visual: mostramos que se está enviando
            if (submitButton) {
                submitButton.textContent = "Enviando...";
                submitButton.disabled = true;
            }
            
            if (contactFeedback) {
                contactFeedback.textContent = "";
                contactFeedback.style.color = "";
            }

            // Enviamos el formulario a Formspree usando fetch
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Éxito: mostramos mensaje verde y limpiamos el formulario
                    if (contactFeedback) {
                        contactFeedback.textContent = "¡Mensaje enviado con éxito!";
                        contactFeedback.style.color = "#4ade80";
                    }
                    contactForm.reset();
                } else {
                    // Error del servidor
                    return response.json().then(data => {
                        let errorMessage = "Hubo un error al enviar el mensaje.";
                        if (data && data.errors) {
                            errorMessage = data.errors.map(error => error.message).join(", ");
                        }
                        if (contactFeedback) {
                            contactFeedback.textContent = errorMessage;
                            contactFeedback.style.color = "#ef4444";
                        }
                    });
                }
            })
            .catch(error => {
                // Error de red o conexión
                console.error('Error:', error);
                if (contactFeedback) {
                    contactFeedback.textContent = "Error de conexión. Inténtalo de nuevo.";
                    contactFeedback.style.color = "#ef4444";
                }
            })
            .finally(() => {
                // Restauramos el botón a su estado original
                if (submitButton) {
                    submitButton.textContent = "Enviar Mensaje";
                    submitButton.disabled = false;
                }
            });
        });
    }
});