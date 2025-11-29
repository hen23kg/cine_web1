// Obtener datos de la cartelera desde el backend
async function cargarCartelera() {
    try {
        const response = await fetch('http://localhost:3000/api/cartelera');
        const peliculas = await response.json();
        mostrarCartelera(peliculas);
    } catch (error) {
        console.error('Error al cargar la cartelera:', error);
        mostrarError('No se pudo cargar la cartelera. Intente más tarde.');
    }
}

// Mostrar películas en la cartelera
function mostrarCartelera(peliculas) {
    const carteleraContainer = document.getElementById('cartelera');
    
    if (!peliculas || peliculas.length === 0) {
        carteleraContainer.innerHTML = '<p>No hay películas disponibles en este momento.</p>';
        return;
    }
    
    const peliculasHTML = peliculas.map(pelicula => `
        <div class="pelicula-card" data-id="${pelicula.id}">
            <img src="${pelicula.poster}" alt="${pelicula.titulo}" class="pelicula-poster">
            <div class="pelicula-titulo">${pelicula.titulo}</div>
        </div>
    `).join('');
    
    carteleraContainer.innerHTML = peliculasHTML;
    
    // Agregar event listeners a las tarjetas de películas
    document.querySelectorAll('.pelicula-card').forEach(card => {
        card.addEventListener('click', () => {
            const peliculaId = card.getAttribute('data-id');
            window.location.href = `pelicula.html?id=${peliculaId}`;
        });
    });
}

// Mostrar mensaje de error
function mostrarError(mensaje) {
    const carteleraContainer = document.getElementById('cartelera');
    carteleraContainer.innerHTML = `<p class="error">${mensaje}</p>`;
}

// Cargar la cartelera cuando la página esté lista
document.addEventListener('DOMContentLoaded', cargarCartelera);c