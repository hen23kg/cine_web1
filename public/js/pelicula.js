// pelicula.js - Cliente
let peliculasData = [];

// Función para cargar películas desde MongoDB
async function cargarPeliculas() {
    try {
        const response = await fetch('/api/cartelera');
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        peliculasData = data.cartelera || [];
        mostrarPeliculas();
        
    } catch (error) {
        console.error('Error cargando películas:', error);
        cargarDatosRespaldo();
    }
}

// Datos de respaldo basados en la imagen
function cargarDatosRespaldo() {
    peliculasData = [
        {
            id: "1",
            titulo: "NADA ES LO QUE PARECE 3",
            poster: "https://via.placeholder.com/300x450/333/fff?text=NADA+ES+LO+QUE+PARECE+3",
            sinopsis: "Un rico de diarrestes sobre la ludicrónica retirada de los Nosenen con los nuevos atlases Greenbart, Smith y Seesa mientras absten a peligrosos animales.",
            duracion: 120,
            genero: "Aventura, Comedia",
            clasificacion: "TP",
            director: "Ruben Réscher",
            protagonistas: "Jaseo Elisabetey, Woody Hand son, Dave Faroo",
            pais: "EE. UU. (2025)",
            funciones: [
                {"id": "1-1", "hora": "10:00", "sala": "Sala 1", "formato": "2D"},
                {"id": "1-2", "hora": "11:00", "sala": "Sala 1", "formato": "2D"}
            ]
        },
        {
            id: "2",
            titulo: "DEPREDADOR: TIERRAS SALVAJES",
            poster: "https://via.placeholder.com/300x450/333/fff?text=DEPREDADOR+TIERRAS+SALVAJES",
            sinopsis: "Un joven Depredador marginado de su clan encuentra un aliado poco probable en su viaje en busca del adversario Adriano.",
            duracion: 110,
            genero: "Acción, Ciencia Ficción",
            clasificacion: "+14",
            director: "Dan Tachereberg",
            protagonistas: "Bile Farring, Dimitrios Schaeier-Kolomotzky",
            pais: "EE. UU. (2025)",
            formatos: [
                {"tipo": "In Oro", "acceso": false},
                {"tipo": "MÁS", "acceso": false}
            ],
            funciones: [] // Sin horarios disponibles
        }
    ];
    mostrarPeliculas();
}

// Mostrar películas en la interfaz
function mostrarPeliculas() {
    const movieListings = document.getElementById('movieListings');
    
    if (!movieListings) {
        console.error('Elemento movieListings no encontrado');
        return;
    }
    
    if (peliculasData.length === 0) {
        movieListings.innerHTML = '<p class="no-movies">No hay películas disponibles en este momento.</p>';
        return;
    }

    movieListings.innerHTML = peliculasData.map(pelicula => `
        <article class="movie-card">
            <div class="movie-poster">
                <img src="${pelicula.poster}" alt="${pelicula.titulo}" 
                     onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=Imagen+No+Disponible'">
            </div>

            <div class="movie-info">
                <h3>${pelicula.titulo}</h3>
                <div class="movie-tags">
                    <span class="tag" style="background-color: ${getRatingColor(pelicula.clasificacion)};">
                        ${pelicula.clasificacion}
                    </span>
                    <span class="tag" style="background-color: #6c757d;">
                        ${pelicula.duracion} min
                    </span>
                    <span class="tag" style="background-color: #17a2b8;">
                        ${pelicula.genero.split(',')[0]}
                    </span>
                </div>
                <div class="movie-details">
                    <p><strong>${pelicula.duracion}min | ${pelicula.clasificacion}</strong></p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p class="sinopsis">${pelicula.sinopsis}</p>
                    ${pelicula.director ? `<p><strong>Director:</strong> ${pelicula.director}</p>` : ''}
                    ${pelicula.protagonistas ? `<p><strong>Protagonistas:</strong> ${pelicula.protagonistas}</p>` : ''}
                    ${pelicula.pais ? `<p><strong>País:</strong> ${pelicula.pais}</p>` : ''}
                </div>
            </div>

            <div class="movie-showtimes">
                ${pelicula.funciones && pelicula.funciones.length > 0 ? `
                    <h4>Horarios Disponibles</h4>
                    ${pelicula.funciones.map(funcion => `
                        <div class="showtime-row">
                            <div class="showtime-info">
                                <span class="sala">${funcion.sala || 'Sala 1'}</span>
                                <span class="formato">${funcion.formato || '2D'}</span>
                            </div>
                            <button class="time-button" 
                                    onclick="seleccionarHorario('${pelicula.id}', '${funcion.hora}', '${pelicula.titulo}', '${funcion.sala || 'Sala 1'}', '${funcion.formato || '2D'}')">
                                ${funcion.hora}
                            </button>
                        </div>
                    `).join('')}
                ` : pelicula.formatos && pelicula.formatos.length > 0 ? `
                    <h4>Formatos Disponibles</h4>
                    ${pelicula.formatos.map(formato => `
                        <div class="showtime-row">
                            <div class="showtime-format">
                                <span class="format-icon">${formato.tipo}</span>
                            </div>
                            <span class="no-access">${formato.acceso ? 'Disponible' : 'No habría acceso'}</span>
                        </div>
                    `).join('')}
                ` : '<p class="no-access">No hay funciones disponibles</p>'}
            </div>
        </article>
    `).join('');
}

// Función auxiliar para colores de clasificación
function getRatingColor(clasificacion) {
    const colors = {
        'TP': '#28a745',
        'Todo Público': '#28a745',
        '+10': '#17a2b8',
        '+13': '#ffc107',
        '+14': '#fd7e14',
        '+18': '#dc3545'
    };
    return colors[clasificacion] || '#6c757d';
}

// Seleccionar horario
function seleccionarHorario(peliculaId, horario, tituloPelicula, sala, formato) {
    const seleccion = {
        movie: {
            id: peliculaId,
            title: tituloPelicula
        },
        showtime: {
            time: horario,
            sala: sala,
            format: formato
        }
    };
    
    sessionStorage.setItem('movieSelection', JSON.stringify(seleccion));
    window.location.href = 'asiento.html';
}

// Verificar estado del servidor
async function verificarServidor() {
    try {
        const response = await fetch('/api/health');
        if (response.ok) {
            console.log('✅ Servidor conectado correctamente');
        } else {
            console.warn('⚠️ Servidor respondió con error');
        }
    } catch (error) {
        console.error('❌ No se pudo conectar al servidor:', error);
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎬 Inicializando CINE-KALAF...');
    verificarServidor();
    cargarPeliculas();
});