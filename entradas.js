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
  
  