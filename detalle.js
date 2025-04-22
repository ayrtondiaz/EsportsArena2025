document.addEventListener('DOMContentLoaded', function() {
    // Obtener parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtener datos del artículo
    const titulo = urlParams.get('titulo') || 'Título no disponible';
    const descripcion = urlParams.get('descripcion') || 'Descripción no disponible';
    const imagen = urlParams.get('imagen') || 'https://via.placeholder.com/900x400?text=Imagen+no+disponible';
    const fecha = urlParams.get('fecha') || formatDate(new Date());
    
    // Actualizar el contenido de la página
    document.getElementById('detalle-titulo').textContent = decodeURIComponent(titulo);
    document.getElementById('detalle-descripcion').textContent = decodeURIComponent(descripcion);
    document.getElementById('detalle-fecha').textContent = decodeURIComponent(fecha);
    
    // Para la imagen, verificar si es una URL o una imagen en base64
    const imagenSrc = imagen.startsWith('data:') ? imagen : decodeURIComponent(imagen);
    document.getElementById('detalle-imagen').src = imagenSrc;
    document.getElementById('detalle-imagen').alt = decodeURIComponent(titulo);
    
    // Actualizar el título de la página
    document.title = `${decodeURIComponent(titulo)} - Esports Arena | JUL 20`;
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Cargar noticias relacionadas
    loadRelatedNews(decodeURIComponent(titulo));
});

// Función para formatear la fecha
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

// Función para cargar noticias relacionadas
async function loadRelatedNews(currentTitle) {
    try {
        // Intentar cargar desde Google Sheets
        const news = await fetchGoogleSheetsData();
        
        // Filtrar la noticia actual para que no aparezca en HOT NEWS
        const filteredNews = news.filter(item => item.titulo !== currentTitle);
        
        displayRelatedNews(filteredNews);
    } catch (error) {
        console.error('Error al cargar noticias relacionadas:', error);
        // Cargar datos de demostración como fallback
        loadDemoRelatedNews(currentTitle);
    }
}

// Función para obtener datos de Google Sheets
async function fetchGoogleSheetsData() {
    // Usar los mismos valores que en news.js
    const sheetId = '1Xeb1mNnJtG9WqCnjoAkSHAn9IPWFjxzLAEh18k_W170'; // Reemplaza con tu ID de hoja de cálculo
    const sheetName = 'Sheet1'; // Reemplaza con el nombre de tu hoja
    const apiKey = 'AIzaSyCW78HsNubOFQR59MsvbrgT88fdZt4AozQ'; // Reemplaza con tu API key de Google
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;
    
    try {
        console.log('Fetching from URL:', url);
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Response not OK:', response.status, errorText);
            throw new Error(`Error al obtener datos de Google Sheets: ${response.status} ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Data received:', data);
        return processSheetData(data.values);
    } catch (error) {
        console.error('Error detallado:', error);
        throw error;
    }
}

// Procesar datos de la API de Sheets
function processSheetData(values) {
    // Asumiendo que la primera fila contiene encabezados
    const headers = values[0];
    const items = [];
    
    // Comenzar desde la segunda fila (índice 1)
    for (let i = 1; i < values.length; i++) {
        const row = values[i];
        const item = {};
        
        // Mapear valores a propiedades basadas en encabezados
        for (let j = 0; j < headers.length; j++) {
            item[headers[j].toLowerCase()] = row[j] || '';
        }
        
        // Añadir fecha si no existe
        if (!item.fecha) {
            item.fecha = formatDate(new Date());
        }
        
        items.push(item);
    }
    
    // Invertir el orden para mostrar las últimas filas primero
    return items.reverse();
}

// Función para mostrar noticias relacionadas
function displayRelatedNews(newsItems) {
    const hotNewsList = document.getElementById('hot-news-list');
    hotNewsList.innerHTML = '';
    
    // Mostrar hasta 3 noticias relacionadas
    const maxItems = Math.min(newsItems.length, 3);
    
    for (let i = 0; i < maxItems; i++) {
        const item = newsItems[i];
        
        const newsCard = document.createElement('div');
        newsCard.className = 'hot-news-card';
        
        newsCard.innerHTML = `
            <img src="${item.imagen}" alt="${item.titulo}" class="hot-news-image">
            <h3 class="hot-news-title-card">${item.titulo}</h3>
            <p class="card-date">${item.fecha || 'Sin fecha'}</p>
            <p class="hot-news-description">${truncateText(item.descripcion, 100)}</p>
            <a href="detalle.html?titulo=${encodeURIComponent(item.titulo)}&descripcion=${encodeURIComponent(item.descripcion)}&imagen=${encodeURIComponent(item.imagen)}&fecha=${encodeURIComponent(item.fecha || formatDate(new Date()))}" class="btn-ver-mas">VER MÁS</a>
        `;
        
        hotNewsList.appendChild(newsCard);
    }
}

// Función para truncar texto
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Datos de demostración para noticias relacionadas
function getDemoNewsData() {
    return [
        {
            titulo: 'Torneo de League of Legends',
            descripcion: 'Anunciamos los equipos clasificados para el torneo principal de League of Legends en Esports Arena 2025.',
            imagen: './assets/lol.jpg',
            fecha: '15 de junio, 2025'
        },
        {
            titulo: 'Zona Free-to-Play',
            descripcion: 'Conoce todos los detalles sobre la nueva zona de juego libre que estará disponible para todos los asistentes.',
            imagen: 'https://source.unsplash.com/random/300x200?gaming',
            fecha: '10 de junio, 2025'
        },
        {
            titulo: 'Streamers Invitados',
            descripcion: 'Revelamos la primera tanda de streamers y creadores de contenido que asistirán al evento.',
            imagen: 'https://source.unsplash.com/random/300x200?streamer',
            fecha: '5 de junio, 2025'
        },
        {
            titulo: 'Concurso de Cosplay',
            descripcion: 'Abrimos las inscripciones para el gran concurso de cosplay con premios increíbles para los ganadores.',
            imagen: 'https://source.unsplash.com/random/300x200?cosplay',
            fecha: '1 de junio, 2025'
        },
        {
            titulo: 'Experiencia VR',
            descripcion: 'Descubre la nueva zona de realidad virtual donde podrás probar los últimos juegos y tecnologías.',
            imagen: 'https://source.unsplash.com/random/300x200?vr',
            fecha: '28 de mayo, 2025'
        },
        {
            titulo: 'Concierto de Clausura',
            descripcion: 'Anunciamos el artista principal que cerrará el evento con un espectacular concierto en vivo.',
            imagen: 'https://source.unsplash.com/random/300x200?concert',
            fecha: '25 de mayo, 2025'
        }
    ];
}

// Cargar datos de demostración para noticias relacionadas
function loadDemoRelatedNews(currentTitle) {
    const demoNews = getDemoNewsData();
    // Invertir el orden para mostrar las últimas noticias primero
    const reversedNews = demoNews.reverse();
    // Filtrar la noticia actual para que no aparezca en HOT NEWS
    const filteredNews = reversedNews.filter(item => item.titulo !== currentTitle);
    displayRelatedNews(filteredNews);
}