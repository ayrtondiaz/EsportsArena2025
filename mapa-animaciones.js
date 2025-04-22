// Animaciones para el mapa y la sección de ubicación
document.addEventListener('DOMContentLoaded', function() {
  // Registrar el plugin ScrollTrigger si GSAP está disponible
  if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animación para el mapa
    gsap.from('.mapa-container', {
      scrollTrigger: {
        trigger: '.mapa-container',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });
    
    // Animación para los bloques de acceso
    const accesosBoxes = document.querySelectorAll('.acceso-box');
    accesosBoxes.forEach((box, index) => {
      gsap.from(box, {
        scrollTrigger: {
          trigger: box,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        x: index % 2 === 0 ? -30 : 30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power2.out'
      });
    });
    
    // Efecto de resplandor para el mapa
    gsap.to('.map-glow-effect', {
      boxShadow: 'inset 0 0 40px rgba(181, 126, 220, 0.8)',
      repeat: -1,
      yoyo: true,
      duration: 2
    });
    
    // Efecto de pulsación para la dirección principal
    gsap.to('.direccion-principal', {
      boxShadow: '0 0 15px rgba(181, 126, 220, 0.8)',
      repeat: -1,
      yoyo: true,
      duration: 1.5
    });
  }
  
  // Efecto de hover para el mapa
  const mapaContainer = document.querySelector('.mapa-container');
  if (mapaContainer) {
    mapaContainer.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 15px 40px rgba(156, 90, 217, 0.6)';
    });
    
    mapaContainer.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
    });
  }
  
  // Función para activar las animaciones fade-in
  function activateFadeIn() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('active');
          }, 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Activar las animaciones fade-in
  activateFadeIn();
});

// Efecto de zoom suave al hacer clic en el mapa
document.addEventListener('DOMContentLoaded', function() {
  const mapa = document.querySelector('.animated-map');
  if (mapa) {
    mapa.addEventListener('click', function() {
      // Añadir clase para efecto visual al hacer clic
      this.classList.add('map-clicked');
      
      // Quitar la clase después de la animación
      setTimeout(() => {
        this.classList.remove('map-clicked');
      }, 500);
    });
  }
});