document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("cardsContainer")
  const errorMessageElement = document.createElement("div")
  errorMessageElement.className = "error-message"
  errorMessageElement.style.display = "none"
  cardsContainer.parentNode.insertBefore(errorMessageElement, cardsContainer)

  // Función para obtener datos de Google Sheets
  async function fetchGoogleSheetsData() {
    // Necesitarás reemplazar estos valores con los tuyos
    const sheetId = "1Xeb1mNnJtG9WqCnjoAkSHAn9IPWFjxzLAEh18k_W170" // Reemplaza con tu ID de hoja de cálculo
    const sheetName = "Sheet1" // Reemplaza con el nombre de tu hoja
    const apiKey = "AIzaSyCW78HsNubOFQR59MsvbrgT88fdZt4AozQ" // Reemplaza con tu API key de Google

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`

    try {
      console.log("Fetching from URL:", url)
      const response = await fetch(url)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Response not OK:", response.status, errorText)
        throw new Error(`Error al obtener datos de Google Sheets: ${response.status} ${errorText}`)
      }

      const data = await response.json()
      console.log("Data received:", data)
      return processSheetData(data.values)
    } catch (error) {
      console.error("Error detallado:", error)
      throw error
    }
  }

  // Función alternativa usando Google Sheets publicado como CSV
  async function fetchPublicGoogleSheetsData() {
    // Publica tu hoja como CSV y obtén la URL
    const publicCsvUrl = "TU_URL_PUBLICA_CSV" // Reemplaza con tu URL pública

    try {
      const response = await fetch(publicCsvUrl)

      if (!response.ok) {
        throw new Error("Error al obtener datos de Google Sheets")
      }

      const csvText = await response.text()
      return processCSVData(csvText)
    } catch (error) {
      console.error("Error detallado:", error)
      throw error
    }
  }

  // Procesar datos de la API de Sheets
  function processSheetData(values) {
    // Asumiendo que la primera fila contiene encabezados
    const headers = values[0]
    const items = []

    // Comenzar desde la segunda fila (índice 1)
    for (let i = 1; i < values.length; i++) {
      const row = values[i]
      const item = {}

      // Mapear valores a propiedades basadas en encabezados
      for (let j = 0; j < headers.length; j++) {
        item[headers[j].toLowerCase()] = row[j] || ""
      }

      // Añadir fecha si no existe
      if (!item.fecha) {
        item.fecha = formatDate(new Date())
      }

      items.push(item)
    }

    // Invertir el orden para mostrar las últimas filas primero
    return items.reverse()
  }

  // Función para formatear la fecha
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("es-ES", options)
  }

  // Procesar datos CSV
  function processCSVData(csvText) {
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((header) => header.trim().toLowerCase())
    const items = []

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue

      const values = parseCSVLine(lines[i])
      const item = {}

      for (let j = 0; j < headers.length; j++) {
        item[headers[j]] = values[j] || ""
      }

      // Añadir fecha si no existe
      if (!item.fecha) {
        item.fecha = formatDate(new Date())
      }

      items.push(item)
    }

    // Invertir el orden para mostrar las últimas filas primero
    return items.reverse()
  }

  // Función auxiliar para analizar líneas CSV (maneja comillas)
  function parseCSVLine(line) {
    const values = []
    let currentValue = ""
    let insideQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        insideQuotes = !insideQuotes
      } else if (char === "," && !insideQuotes) {
        values.push(currentValue.trim())
        currentValue = ""
      } else {
        currentValue += char
      }
    }

    values.push(currentValue.trim())
    return values
  }

  // Modificar la función createContentCards para asegurar 12 noticias por página y 4 por fila
  function createContentCards(items) {
    // Mantener 12 elementos por página
    const itemsPerPage = 12
    const pages = []

    for (let i = 0; i < items.length; i += itemsPerPage) {
      pages.push(items.slice(i, i + itemsPerPage))
    }

    // Limpiar el contenedor de tarjetas
    cardsContainer.innerHTML = ""

    // Crear contenedores de página
    pages.forEach((pageItems, pageIndex) => {
      const pageNum = pageIndex + 1
      const pageContainer = document.createElement("div")
      pageContainer.className = "card-container"
      pageContainer.dataset.page = pageNum
      if (pageNum === 1) pageContainer.classList.add("active")

      // Para cada grupo de 4 elementos, crear una nueva fila
      for (let i = 0; i < pageItems.length; i += 4) {
        const rowDiv = document.createElement("div")
        rowDiv.className = "row mb-4" // Añadir margen inferior entre filas

        // Tomar hasta 4 elementos para esta fila
        const rowItems = pageItems.slice(i, i + 4)

        // Crear tarjetas para esta fila (hasta 4)
        rowItems.forEach((item) => {
          const colDiv = document.createElement("div")
          colDiv.className = "col-12 col-sm-6 col-md-3 mb-3" // 1 en móvil pequeño, 2 en móvil, 4 en tablet/desktop

          colDiv.innerHTML = `
            <div class="card h-100">
              <div class="overflow-hidden">
                <img src="${item.imagen || "https://via.placeholder.com/300x200"}" class="card-img-top" alt="${item.titulo || "Imagen"}">
              </div>
              <div class="card-body">
                <h5 class="card-title">${item.titulo || "Sin título"}</h5>
                <p class="card-date">${item.fecha || "Sin fecha"}</p>
                <hr>
                <p class="card-text text-truncate-3">${item.descripcion || "Sin descripción"}</p>
              </div>
              <div class="card-footer">
                <button class="btn btn-primary w-100" onclick="window.location.href='detalle.html?titulo=${encodeURIComponent(item.titulo || "Sin título")}&descripcion=${encodeURIComponent(item.descripcion || "Sin descripción")}&imagen=${encodeURIComponent(item.imagen || "https://via.placeholder.com/900x400")}&fecha=${encodeURIComponent(item.fecha || formatDate(new Date()))}'">Ver Más</button>
              </div>
            </div>
          `

          rowDiv.appendChild(colDiv)
        })

        // Si hay menos de 4 elementos en la última fila, añadir columnas vacías para mantener el layout
        if (rowItems.length < 4) {
          for (let j = rowItems.length; j < 4; j++) {
            const emptyCol = document.createElement("div")
            emptyCol.className = "col-12 col-sm-6 col-md-3 mb-3"
            rowDiv.appendChild(emptyCol)
          }
        }

        pageContainer.appendChild(rowDiv)
      }

      cardsContainer.appendChild(pageContainer)
    })

    // Actualizar la paginación
    updatePagination(pages.length)
  }

  // Actualizar la paginación
  function updatePagination(totalPages) {
    const paginationUl = document.querySelector(".pagination")

    // Limpiar la paginación existente (excepto los botones prev/next)
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")

    paginationUl.innerHTML = ""
    paginationUl.appendChild(prevBtn)

    // Crear los elementos de página
    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement("li")
      pageItem.className = "page-item" + (i === 1 ? " active" : "")

      const pageLink = document.createElement("a")
      pageLink.className = "page-link"
      pageLink.href = "#"
      pageLink.dataset.page = i
      pageLink.textContent = i

      pageLink.addEventListener("click", function (e) {
        e.preventDefault()
        const pageNum = Number.parseInt(this.dataset.page)
        updatePage(pageNum)
      })

      pageItem.appendChild(pageLink)
      paginationUl.appendChild(pageItem)
    }

    paginationUl.appendChild(nextBtn)

    // Actualizar los eventos de los botones prev/next
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const activePage = document.querySelector(".page-item.active .page-link")
      const currentPage = Number.parseInt(activePage.dataset.page)
      if (currentPage > 1) {
        updatePage(currentPage - 1)
      }
    })

    nextBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const activePage = document.querySelector(".page-item.active .page-link")
      const currentPage = Number.parseInt(activePage.dataset.page)
      if (currentPage < totalPages) {
        updatePage(currentPage + 1)
      }
    })
  }

  // Función para actualizar la página mostrada
  function updatePage(pageNum) {
    // Ocultar todas las páginas
    document.querySelectorAll(".card-container").forEach((container) => {
      container.classList.remove("active")
    })

    // Mostrar la página actual
    const currentPageContainer = document.querySelector(`.card-container[data-page="${pageNum}"]`)
    if (currentPageContainer) {
      currentPageContainer.classList.add("active")
    }

    // Actualizar la paginación
    document.querySelectorAll(".page-item").forEach((item) => {
      item.classList.remove("active")
    })

    const activePageLink = document.querySelector(`.page-link[data-page="${pageNum}"]`)
    if (activePageLink) {
      activePageLink.parentElement.classList.add("active")
    }

    // Actualizar estado de botones prev/next
    const totalPages = document.querySelectorAll(".card-container").length
    document.getElementById("prevBtn").classList.toggle("disabled", pageNum === 1)
    document.getElementById("nextBtn").classList.toggle("disabled", pageNum === totalPages)

    // Reiniciar animaciones para las tarjetas visibles
    const visibleCards = document.querySelectorAll(`.card-container[data-page="${pageNum}"] .card`)
    visibleCards.forEach((card, index) => {
      card.style.animation = "none"
      card.offsetHeight // Trigger reflow
      card.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`
    })
  }

  // Mostrar indicador de carga
  function showLoading() {
    // Crear un elemento de carga si no existe
    let loadingElement = document.getElementById("loading")
    if (!loadingElement) {
      loadingElement = document.createElement("div")
      loadingElement.id = "loading"
      loadingElement.className = "loading"
      loadingElement.innerHTML = `
              <div class="spinner"></div>
              <p>Cargando contenido...</p>
          `
      loadingElement.style.display = "flex"
      loadingElement.style.justifyContent = "center"
      loadingElement.style.alignItems = "center"
      loadingElement.style.padding = "40px"
      cardsContainer.parentNode.insertBefore(loadingElement, cardsContainer)
    } else {
      loadingElement.style.display = "flex"
    }
  }

  // Ocultar indicador de carga
  function hideLoading() {
    const loadingElement = document.getElementById("loading")
    if (loadingElement) {
      loadingElement.style.display = "none"
    }
  }

  // Mostrar mensaje de error
  function showError(message) {
    errorMessageElement.textContent = message
    errorMessageElement.style.display = "block"
  }

  // Ocultar mensaje de error
  function hideError() {
    errorMessageElement.style.display = "none"
  }

  // Cargar datos y mostrar contenido
  async function loadContent() {
    try {
      // Mostrar cargando
      showLoading()
      hideError()

      // Usar fetchGoogleSheetsData en lugar de fetchPublicGoogleSheetsData
      const items = await fetchGoogleSheetsData()

      // Crear tarjetas
      createContentCards(items)
    } catch (error) {
      // Mostrar mensaje de error
      showError("No se pudo cargar el contenido. Por favor, intente nuevamente más tarde.")
      console.error("Error detallado:", error)

      // Cargar datos de demostración como fallback
      loadDemoData()
    } finally {
      // Ocultar cargando
      hideLoading()
    }
  }

  // Cargar datos de ejemplo para demostración
  function loadDemoData() {
    const demoItems = [
      {
        titulo: "Torneo de League of Legends",
        descripcion:
          "Anunciamos los equipos clasificados para el torneo principal de League of Legends en Esports Arena 2025.",
        imagen: "./assets/lol.jpg",
        fecha: "15 de junio, 2025",
      },
      {
        titulo: "Zona Free-to-Play",
        descripcion:
          "Conoce todos los detalles sobre la nueva zona de juego libre que estará disponible para todos los asistentes.",
        imagen: "https://source.unsplash.com/random/300x200?gaming",
        fecha: "10 de junio, 2025",
      },
      {
        titulo: "Streamers Invitados",
        descripcion: "Revelamos la primera tanda de streamers y creadores de contenido que asistirán al evento.",
        imagen: "https://source.unsplash.com/random/300x200?streamer",
        fecha: "5 de junio, 2025",
      },
      {
        titulo: "Concurso de Cosplay",
        descripcion:
          "Abrimos las inscripciones para el gran concurso de cosplay con premios increíbles para los ganadores.",
        imagen: "https://source.unsplash.com/random/300x200?cosplay",
        fecha: "1 de junio, 2025",
      },
      {
        titulo: "Experiencia VR",
        descripcion: "Descubre la nueva zona de realidad virtual donde podrás probar los últimos juegos y tecnologías.",
        imagen: "https://source.unsplash.com/random/300x200?vr",
        fecha: "28 de mayo, 2025",
      },
      {
        titulo: "Concierto de Clausura",
        descripcion: "Anunciamos el artista principal que cerrará el evento con un espectacular concierto en vivo.",
        imagen: "https://source.unsplash.com/random/300x200?concert",
        fecha: "25 de mayo, 2025",
      },
      {
        titulo: "Merchandising Oficial",
        descripcion:
          "Presentamos la colección exclusiva de productos oficiales que estarán disponibles durante el evento.",
        imagen: "https://source.unsplash.com/random/300x200?merchandise",
        fecha: "20 de mayo, 2025",
      },
      {
        titulo: "Zona Gastronómica",
        descripcion: "Conoce todos los restaurantes y food trucks que estarán presentes para satisfacer tu apetito.",
        imagen: "https://source.unsplash.com/random/300x200?food",
        fecha: "15 de mayo, 2025",
      },
    ]

    // Invertir el orden para mostrar las últimas noticias primero
    createContentCards(demoItems.reverse())
  }

  // Iniciar carga de contenido
  // Si tienes problemas con la API de Google Sheets, comenta esta línea y descomenta la siguiente
  loadContent()

  // Para demostración, cargamos datos de ejemplo
  // loadDemoData();
})
