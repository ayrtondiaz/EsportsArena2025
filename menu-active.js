document.addEventListener("DOMContentLoaded", function() {
  // Obtener la URL actual
  const currentLocation = window.location.href;
  
  // Obtener todos los enlaces del menú
  const menuLinks = document.querySelectorAll('.nav-link, .dropdown-item');
  
  // Recorrer todos los enlaces y verificar si coinciden con la URL actual
  menuLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    
    // Si el enlace coincide con la URL actual o si la URL actual contiene el enlace
    // (para casos como info.html#about)
    if (currentLocation === linkHref || 
        (linkHref !== '#' && linkHref !== null && currentLocation.includes(linkHref))) {
      
      // Añadir la clase active
      link.classList.add('active');
      
      // Si es un elemento dropdown, también activar el enlace padre
      if (link.classList.contains('dropdown-item')) {
        const dropdownToggle = link.closest('.dropdown').querySelector('.dropdown-toggle');
        if (dropdownToggle) {
          dropdownToggle.classList.add('active');
        }
      }
    }
  });
  
  // Manejar clics en los enlaces para establecer el estado activo
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Remover la clase active de todos los enlaces
      menuLinks.forEach(l => l.classList.remove('active'));
      
      // Añadir la clase active al enlace clickeado
      this.classList.add('active');
      
      // Si es un elemento dropdown, también activar el enlace padre
      if (this.classList.contains('dropdown-item')) {
        const dropdownToggle = this.closest('.dropdown').querySelector('.dropdown-toggle');
        if (dropdownToggle) {
          dropdownToggle.classList.add('active');
        }
      }
    });
  });
});