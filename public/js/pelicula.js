// peliculas.js - Página de selección de horarios

let peliculasData = [];

async function cargarPeliculas() {
    try {
        const response = await fetch('/api/cartelera');
        const data = await response.json();
        peliculasData = data.cartelera || [];
        mostrarPeliculas();
    } catch (error) {
        console.error('Error cargando películas:', error);
        // Datos de respaldo
        peliculasData = [
            {
                id: "4",
                titulo: "Captain America",
                poster: "https://cdn.discordapp.com/attachments/537054307556524053/1401783450016415754/CaptainAmerica.png",
                sinopsis: "El Capitán América regresa en una nueva aventura llena de acción y heroísmo.",
                duracion: 115,
                genero: "Acción, Aventura, Ciencia Ficción",
                clasificacion: "TP",
                funciones: [
                    {"id": "4-1", "hora": "12:20"},
                    {"id": "4-2", "hora": "13:20"},
                    {"id": "4-3", "hora": "17:00"},
                    {"id": "4-4", "hora": "18:00"},
                    {"id": "4-5", "hora": "22:00"}
                ]
            },
            {
                id: "5",
                titulo: "Down Twisted",
                poster: "https://cdn.discordapp.com/attachments/537054307556524053/1401783455850827829/DownTwisted.png",
                sinopsis: "Un joven Depredador marginado de su clan busca probar su valía en una peligrosa misión.",
                duracion: 105,
                genero: "Acción, Terror, Ciencia Ficción",
                clasificacion: "+14",
                funciones: [
                    {"id": "5-1", "hora": "13:40"},
                    {"id": "5-2", "hora": "14:40"},
                    {"id": "5-3", "hora": "16:20"}
                ]
            }
        ];
        mostrarPeliculas();
    }
}

function mostrarPeliculas() {
    const movieListings = document.getElementById('movieListings');
    
    if (peliculasData.length === 0) {
        movieListings.innerHTML = '<p class="no-movies">No hay películas disponibles en este momento.</p>';
        return;
    }

    movieListings.innerHTML = peliculasData.map(pelicula => `
        <article class="movie-card">
            <div class="movie-poster">
                <img src="${pelicula.poster}" alt="${pelicula.titulo}" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=Imagen+No+Disponible'">
            </div>

            <div class="movie-info">
                <h3>${pelicula.titulo}</h3>
                <div class="movie-tags">
                    <span class="tag" style="background-color: ${getRatingColor(pelicula.clasificacion)};">${pelicula.clasificacion}</span>
                    <span class="tag" style="background-color: #6c757d;">${pelicula.duracion} min</span>
                    <span class="tag" style="background-color: #17a2b8;">${pelicula.genero}</span>
                </div>
                <div class="movie-details">
                    <p><strong>${pelicula.duracion}min | ${pelicula.clasificacion}</strong></p>
                    <p><strong>Género:</strong> ${pelicula.genero}</p>
                    <p>${pelicula.sinopsis}</p>
                </div>
            </div>

            <div class="movie-showtimes">
                ${pelicula.funciones.map(funcion => `
                    <div class="showtime-row">
                        <div class="showtime-format">
                            <span>Español</span>
                            <span class="format-icon">2D</span>
                        </div>
                        <button class="time-button" onclick="seleccionarHorario('${pelicula.id}', '${funcion.hora}', '${pelicula.titulo}')">
                            ${funcion.hora}
                        </button>
                    </div>
                `).join('')}
            </div>
        </article>
    `).join('');
}

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

function seleccionarHorario(peliculaId, horario, tituloPelicula) {
    // Guardar selección en sessionStorage
    const seleccion = {
        peliculaId: peliculaId,
        horario: horario,
        titulo: tituloPelicula
    };
    
    sessionStorage.setItem('seleccionPelicula', JSON.stringify(seleccion));
    
    // Redirigir a asientos
    window.location.href = 'asiento.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', cargarPeliculas);