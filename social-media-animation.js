document.addEventListener("DOMContentLoaded", () => {
  // Crear el elemento de frecuencia de radio
  const radioFrequency = document.createElement("div")
  radioFrequency.className = "radio-frequency"
  document.querySelector(".social-media").appendChild(radioFrequency)

  // Animación para los hosts al hacer scroll
  const sponsorLogos = document.querySelectorAll(".social-media .sponsor-logo")

  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  // Función para animar los elementos cuando están en el viewport
  function animateOnScroll() {
    sponsorLogos.forEach((logo, index) => {
      if (isInViewport(logo)) {
        setTimeout(() => {
          logo.style.opacity = "1"
          logo.style.transform = "translateY(0)"
        }, index * 150)
      }
    })
  }

  // Inicialmente ocultar los logos
  sponsorLogos.forEach((logo) => {
    logo.style.opacity = "0"
    logo.style.transform = "translateY(30px)"
    logo.style.transition = "all 0.5s ease"
  })

  // Ejecutar la animación al cargar y al hacer scroll
  animateOnScroll()
  window.addEventListener("scroll", animateOnScroll)

  // Efecto de audio equalizer para el botón de YouTube
  const btnWatch = document.querySelector(".btn-watch")
  if (btnWatch) {
    // Crear el indicador de "en vivo"
    const liveIndicator = document.createElement("span")
    liveIndicator.className = "live-indicator"
    btnWatch.prepend(liveIndicator)

    // Agregar texto de horario debajo del botón
    const scheduleInfo = document.createElement("div")
    scheduleInfo.className = "schedule-info"
    scheduleInfo.innerHTML = "Próximo programa: Martes 19:30hs"
    btnWatch.parentNode.appendChild(scheduleInfo)
  }

  // Efecto hover para los hosts
  sponsorLogos.forEach((logo) => {
    logo.addEventListener("mouseenter", function () {
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.4), 0 0 20px rgba(181, 126, 220, 0.8)"
    })

    logo.addEventListener("mouseleave", function () {
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)"
    })
  })
})
