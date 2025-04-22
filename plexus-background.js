document.addEventListener("DOMContentLoaded", () => {
    // Check if device is mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches
  
    // Skip canvas setup if on mobile
    if (isMobile) {
      console.log("Mobile device detected, skipping plexus animation")
      return
    }
  
    // Canvas setup
    const canvas = document.getElementById("plexus-canvas")
    if (!canvas) return // Salir si no existe el canvas
  
    const ctx = canvas.getContext("2d")
    const container = document.getElementById("plexus-background-container")
  
    // Set canvas to match container size
    function resizeCanvas() {
      if (container) {
        canvas.width = container.offsetWidth
        canvas.height = container.offsetHeight
      }
    }
  
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
  
    // Using only the three specified colors
    const colors = [
      "#16003D", // Darkest purple
      "#270F4E", // Medium dark purple
      "#583C7F", // Lightest purple
    ]
  
    // Particles
    const particlesArray = []
    const numberOfParticles = 80
    const maxDistance = 150
  
    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 1
        this.speedY = (Math.random() - 0.5) * 1
        // Use primarily the lighter color for better visibility, but occasionally use the others
        this.color = Math.random() > 0.3 ? "#583C7F" : colors[Math.floor(Math.random() * colors.length)]
      }
  
      update() {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY
  
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX
        }
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY
        }
      }
  
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }
  
    // Create particles
    function init() {
      particlesArray.length = 0 // Clear array if it exists
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle())
      }
    }
  
    // Connect particles with lines
    function connect() {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)
  
          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - distance / maxDistance
  
            // Draw line
            ctx.beginPath()
            ctx.strokeStyle = particlesArray[a].color
            ctx.globalAlpha = opacity * 0.8
            ctx.lineWidth = 1
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }
  
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
  
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }
  
      // Connect particles
      connect()
  
      // Add glow effect
      ctx.shadowBlur = 15
      ctx.shadowColor = "#583C7F"
  
      requestAnimationFrame(animate)
    }
  
    // Initialize and start animation
    init()
    animate()
  })
  