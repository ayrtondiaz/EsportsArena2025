document.addEventListener("DOMContentLoaded", () => {
  // Añadir clase al body para identificar que estamos en la página de contacto
  document.body.classList.add("contacto-page")

  // Inicializar animaciones de desplazamiento
  initScrollAnimations()

  // Inicializar el formulario de contacto
  initContactForm()

  // Inicializar el comportamiento del header al hacer scroll
  initHeaderScroll()
})

// Función para inicializar las animaciones de desplazamiento
function initScrollAnimations() {
  // Seleccionar todos los elementos con la clase fade-in
  const fadeElements = document.querySelectorAll(".fade-in")

  // Configurar ScrollTrigger para cada elemento
  fadeElements.forEach((element) => {
    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        onEnter: () => element.classList.add("active"),
      },
    })
  })

  // Animate the info title and description
  const infoTitle = document.querySelector(".info-title")
  const infoDescription = document.querySelector(".info-description")

  gsap.from(infoTitle, {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  })

  gsap.from(infoDescription, {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.3,
    ease: "power2.out",
  })
}

// Función para inicializar el comportamiento de las FAQs
function initFAQs() {
  // Seleccionar todos los contenedores de preguntas
  const faqQuestionContainers = document.querySelectorAll(".faq-question-container")

  // Agregar evento de clic a cada contenedor de pregunta
  faqQuestionContainers.forEach((container) => {
    container.addEventListener("click", function () {
      // Obtener el elemento padre (faq-item)
      const faqItem = this.parentElement

      // Alternar la clase 'active' en el elemento faq-item
      faqItem.classList.toggle("active")
    })
  })
}

// Función para inicializar el formulario de contacto con Formspree
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const formResponse = document.getElementById("form-response")
  const submitBtn = document.getElementById("submit-btn")

  if (contactForm) {
    // Agregar el atributo action con la URL de Formspree
    contactForm.setAttribute("action", "https://formspree.io/f/xblojdpl")
    contactForm.setAttribute("method", "POST")

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Cambiar el texto del botón y deshabilitarlo durante el envío
      submitBtn.textContent = "ENVIANDO..."
      submitBtn.disabled = true

      // Crear un objeto FormData con los datos del formulario
      const formData = new FormData(contactForm)

      // Enviar los datos a Formspree usando fetch
      fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("Error en el envío del formulario. Por favor, inténtalo de nuevo.")
        })
        .then((data) => {
          // Mostrar mensaje de éxito
          formResponse.innerHTML =
            '<div class="alert alert-success">¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.</div>'
          formResponse.style.display = "block"

          // Restablecer el formulario
          contactForm.reset()
        })
        .catch((error) => {
          // Mostrar mensaje de error
          formResponse.innerHTML = `<div class="alert alert-danger">${error.message}</div>`
          formResponse.style.display = "block"
        })
        .finally(() => {
          // Restablecer el botón
          submitBtn.textContent = "ENVIAR MENSAJE"
          submitBtn.disabled = false

          // Ocultar el mensaje después de 5 segundos
          setTimeout(() => {
            formResponse.style.display = "none"
          }, 5000)
        })
    })
  }
}

// Función para inicializar el comportamiento del header al hacer scroll
function initHeaderScroll() {
  const header = document.querySelector("header")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })
}

// Función para animar elementos cuando entran en el viewport
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in")

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top
    const windowHeight = window.innerHeight

    if (elementPosition < windowHeight - 100) {
      element.classList.add("active")
    }
  })
}

// Iniciar la animación al cargar la página y al hacer scroll
window.addEventListener("load", animateOnScroll)
window.addEventListener("scroll", animateOnScroll)

// Declare gsap
const gsap = window.gsap

