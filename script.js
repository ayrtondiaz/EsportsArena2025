document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")

  mobileMenuBtn.addEventListener("click", function () {
    this.classList.toggle("active")
    nav.classList.toggle("active")
  })

  // Hero Slider
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev")
  const nextBtn = document.querySelector(".next")
  let currentSlide = 0
  let slideInterval

  // Initialize slider
  function initSlider() {
    // Set first slide as active
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")

    // Start auto slide
    startSlideInterval()
  }

  // Start auto slide interval
  function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  // Reset interval when manually changing slides
  function resetInterval() {
    clearInterval(slideInterval)
    startSlideInterval()
  }

  // Go to specific slide
  function goToSlide(index) {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Update current slide index
    currentSlide = index

    // Handle index overflow
    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  // Next slide function
  function nextSlide() {
    goToSlide(currentSlide + 1)
  }

  // Previous slide function
  function prevSlide() {
    goToSlide(currentSlide - 1)
  }

  // Event listeners for slider controls
  prevBtn.addEventListener("click", () => {
    prevSlide()
    resetInterval()
  })

  nextBtn.addEventListener("click", () => {
    nextSlide()
    resetInterval()
  })

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index)
      resetInterval()
    })
  })

  // Initialize slider
  initSlider()

  // Initialize GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)

  // Animate elements when they come into view
  const fadeElements = document.querySelectorAll(".team-card, .sponsor-logo, .section-title, .cta-box")
  fadeElements.forEach((element) => {
    element.classList.add("fade-in")

    ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => element.classList.add("active"),
      once: true,
    })
  })

  // Animate navbar on scroll
  // const header = document.querySelector("header")
  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 100) {
  //     header.style.backgroundColor = "rgba(26, 5, 48, 0.95)"
  //     header.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.3)"
  //   } else {
  //     header.style.backgroundColor = "rgba(26, 5, 48, 0.9)"
  //     header.style.boxShadow = "none"
  //   }
  // })

  // Carousel auto-play with custom timing
  const carouselElement = document.getElementById("hero-carousel")
  if (carouselElement) {
    const carousel = new bootstrap.Carousel(carouselElement, {
      interval: 5000,
    })
  }

  // Add flame animation to hero section
  const flameOverlays = document.querySelectorAll(".flame-overlay")
  flameOverlays.forEach((flame) => {
    gsap.to(flame, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })
  })

  // Add hover animations for team cards
  const teamCards = document.querySelectorAll(".team-card")
  teamCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        y: -10,
        boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
        duration: 0.3,
      })
    })

    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        duration: 0.3,
      })
    })
  })

  // Add glow effect to CTA button
  const ctaText = document.querySelector(".glow-text")
  gsap.to(ctaText, {
    textShadow: "0 0 20px rgba(0, 255, 102, 0.9), 0 0 30px rgba(0, 255, 102, 0.7)",
    duration: 1.5,
    repeat: -1,
    yoyo: true,
  })

  // Add parallax effect to sections
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
      y: 50,
      opacity: 0,
      duration: 1,
    })
  })

  // Add smooth scrolling for navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href.startsWith("#")) {
        e.preventDefault()
        const targetSection = document.querySelector(href)

        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 80,
            behavior: "smooth",
          })
        }
      }
    })
  })

  // Add random flicker effect to the logo
  const logo = document.querySelector(".navbar-brand")
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

  // Add typing effect to section titles
  const titles = document.querySelectorAll(".section-title")
  titles.forEach((title) => {
    const originalText = title.textContent
    const letters = originalText.split("")

    title.textContent = ""

    ScrollTrigger.create({
      trigger: title,
      start: "top 80%",
      onEnter: () => {
        let i = 0
        const interval = setInterval(() => {
          if (i < letters.length) {
            title.textContent += letters[i]
            i++
          } else {
            clearInterval(interval)
          }
        }, 100)
      },
      once: true,
    })
  })

  // Add neon effect to nav links
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        color: "#b57edc",
        textShadow: "0 0 10px rgba(155, 89, 182, 0.8), 0 0 20px rgba(155, 89, 182, 0.5)",
        duration: 0.3,
      })
    })

    link.addEventListener("mouseleave", () => {
      if (!link.classList.contains("active")) {
        gsap.to(link, {
          color: "var(--text-color)",
          textShadow: "none",
          duration: 0.3,
        })
      }
    })
  })

  // Add random neon flicker effect to header
  const header = document.querySelector("header")
  function randomFlicker() {
    const randomDelay = 2000 + Math.random() * 5000 // Random delay between 2-7 seconds
    const flickerDuration = 0.1

    setTimeout(() => {
      // Increase shadow intensity briefly
      gsap.to(header, {
        boxShadow: "0 0 25px rgba(155, 89, 182, 0.8)",
        duration: flickerDuration,
        onComplete: () => {
          // Return to normal
          gsap.to(header, {
            boxShadow: "0 0 15px rgba(155, 89, 182, 0.3)",
            duration: flickerDuration,
            onComplete: randomFlicker,
          })
        },
      })
    }, randomDelay)
  }

  randomFlicker()
})

// Animaciones para la sección social-media cuando aparece en el viewport
document.addEventListener('DOMContentLoaded', function() {
  // Función para verificar si un elemento está en el viewport
  function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
      );
  }

  // Función para activar las animaciones cuando la sección está visible
  function checkSocialMedia() {
      const socialMedia = document.querySelector('.social-media');
      
      if (socialMedia && isInViewport(socialMedia)) {
          socialMedia.classList.add('active');
          
          // Quitar el evento de scroll una vez activada la animación
          window.removeEventListener('scroll', checkSocialMedia);
      }
  }

  // Escuchar el evento de scroll
  window.addEventListener('scroll', checkSocialMedia);
  
  // Verificar al cargar la página
  checkSocialMedia();
  
  // Agregar efectos adicionales a las tarjetas de hosts
  const hostCards = document.querySelectorAll('.social-media .sponsor-logo');
  
  hostCards.forEach(card => {
      // Crear elemento de partículas para efecto resplandor
      const glowParticle = document.createElement('div');
      glowParticle.classList.add('glow-particle');
      card.appendChild(glowParticle);
      
      // Animación aleatoria para las partículas
      setInterval(() => {
          glowParticle.style.left = Math.random() * 100 + '%';
          glowParticle.style.top = Math.random() * 100 + '%';
          glowParticle.style.opacity = (Math.random() * 0.5 + 0.3);
          glowParticle.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
      }, 2000);
  });
  
  // Agregar efecto de paralaje al hacer hover
  hostCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const xCenter = rect.width / 2;
          const yCenter = rect.height / 2;
          
          // Calcular la distancia desde el centro (en porcentaje)
          const xOffset = (x - xCenter) / xCenter * 5;
          const yOffset = (y - yCenter) / yCenter * 5;
          
          // Aplicar transformación 3D sutil
          card.style.transform = `perspective(800px) rotateY(${xOffset}deg) rotateX(${-yOffset}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      // Restablecer transformación al salir
      card.addEventListener('mouseleave', () => {
          card.style.transform = '';
      });
  });
});

// Estilos adicionales necesarios para el JS
document.head.insertAdjacentHTML('beforeend', `
  <style>
      .social-media {
          opacity: 0.5;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
      }
      
      .social-media.active {
          opacity: 1;
          transform: translateY(0);
      }
      
      .glow-particle {
          position: absolute;
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, rgba(181, 126, 220, 0.8), transparent 70%);
          border-radius: 50%;
          filter: blur(8px);
          pointer-events: none;
          transition: all 1.5s ease;
          z-index: -1;
      }
  </style>
`);