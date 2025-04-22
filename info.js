document.addEventListener("DOMContentLoaded", () => {
  // Initialize GSAP ScrollTrigger
  if (typeof gsap !== "undefined" && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger)
  }

  // Animate navbar on scroll
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
      header.style.backgroundColor = "rgba(26, 5, 48, 0.95)"
      header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)"
    } else {
      header.classList.remove("scrolled")
      header.style.backgroundColor = "rgba(26, 5, 48, 0.9)"
      header.style.boxShadow = "none"
    }
  })

  // Animate the info title and description
  const infoTitle = document.querySelector(".info-title")
  const infoDescription = document.querySelector(".info-description")

  if (typeof gsap !== "undefined") {
    if (infoTitle) {
      gsap.from(infoTitle, {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      })
    }

    if (infoDescription) {
      gsap.from(infoDescription, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      })
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse && navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }

        // Calculate header height for offset
        const headerHeight = document.querySelector("header").offsetHeight

        // Scroll to the target element with offset for fixed header
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight - 20, // 20px extra padding
          behavior: "smooth",
        })

        // Update URL without page reload
        history.pushState(null, null, targetId)
      }
    })
  })

  // Check for hash in URL on page load and scroll to that section
  window.addEventListener("load", () => {
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash)
      if (targetElement) {
        // Wait a bit for page to fully load
        setTimeout(() => {
          const headerHeight = document.querySelector("header").offsetHeight
          window.scrollTo({
            top: targetElement.offsetTop - headerHeight - 20,
            behavior: "smooth",
          })
        }, 300)
      }
    }
  })

  // FAQ Toggle Functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const questionContainer = item.querySelector(".faq-question-container")

    // Animate FAQ items on scroll
    if (typeof gsap !== "undefined" && gsap.from) {
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      })
    }

    // Add click event to toggle answer visibility
    if (questionContainer) {
      questionContainer.addEventListener("click", () => {
        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle current FAQ item
        item.classList.toggle("active")

        // Animate the icon rotation
        const icon = item.querySelector(".faq-icon")
        if (icon && typeof gsap !== "undefined") {
          if (item.classList.contains("active")) {
            gsap.to(icon, {
              rotate: 360,
              duration: 0.6,
              ease: "power2.out",
            })
          } else {
            gsap.to(icon, {
              rotate: 0,
              duration: 0.6,
              ease: "power2.out",
            })
          }
        }
      })
    }
  })

  // Animate form elements
  const formElements = document.querySelectorAll(".form-group")
  if (typeof gsap !== "undefined" && gsap.from) {
    formElements.forEach((element, index) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
      })
    })
  }

  // Add submit event for the form
  const contactForm = document.querySelector("form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Here you would normally handle the form submission
      // For now, let's just add a simple animation
      if (typeof gsap !== "undefined") {
        const formGroups = this.querySelectorAll(".form-group")

        gsap.to(formGroups, {
          opacity: 0.5,
          duration: 0.3,
          stagger: 0.1,
          onComplete: () => {
            // Show success message
            const successMessage = document.createElement("div")
            successMessage.className = "alert alert-success mt-4"
            successMessage.textContent = "¡Mensaje enviado con éxito!"

            contactForm.appendChild(successMessage)

            gsap.from(successMessage, {
              y: 20,
              opacity: 0,
              duration: 0.5,
            })

            // Reset form after 3 seconds
            setTimeout(() => {
              contactForm.reset()
              gsap.to(formGroups, {
                opacity: 1,
                duration: 0.3,
              })
              successMessage.remove()
            }, 3000)
          },
        })
      }
    })
  }

  // Add random flicker effect to the logo
  const logo = document.querySelector(".navbar-brand")
  if (logo && typeof gsap !== "undefined") {
    setInterval(() => {
      const randomOpacity = 0.8 + Math.random() * 0.2
      gsap.to(logo, {
        opacity: randomOpacity,
        duration: 0.1,
        onComplete: () => {
          gsap.to(logo, {
            opacity: 1,
            duration: 0.1,
          })
        },
      })
    }, 3000)
  }
})

// Función para verificar si un elemento está en el viewport
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= -rect.height &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) * 1.5 &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Función para activar las animaciones fade-in cuando los elementos están en el viewport
function activateFadeIn() {
  const fadeElements = document.querySelectorAll(".fade-in")

  // Excluir elementos de la sección de ubicación
  const filteredElements = Array.from(fadeElements).filter(el => {
    // Verificar si el elemento está dentro de la sección de ubicación
    const ubicacionSection = document.getElementById("ubicacion")
    return ubicacionSection ? !ubicacionSection.contains(el) : true
  })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Usar una clase en lugar de manipular estilos directamente
          setTimeout(() => {
            entry.target.classList.add("active")
          }, 150)
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px", // Iniciar animación antes de que el elemento esté completamente en vista
    },
  )

  filteredElements.forEach((element) => {
    observer.observe(element)
  })
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
  // Activar animaciones fade-in solo para elementos fuera de la sección de ubicación
  activateFadeIn()
  
  / Asegurar que los elementos de la sección de ubicación estén completamente visibles
  const ubicacionSection = document.getElementById("ubicacion")
  if (ubicacionSection) {
    const mapaContainer = document.querySelector(".mapa-container")
    const accesoBoxes = document.querySelectorAll(".acceso-box")
    
    // Hacer visible el mapa inmediatamente
    if (mapaContainer) {
      mapaContainer.style.opacity = "1"
      mapaContainer.style.transform = "none"
    }
    
    // Hacer visibles las cajas de acceso inmediatamente
    if (accesoBoxes.length > 0) {
      accesoBoxes.forEach(box => {
        box.style.opacity = "1"
        box.style.transform = "none"
      })
    }
  }
})