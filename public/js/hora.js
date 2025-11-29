let selectedMovie = null;
let selectedTime = null;
        // Horarios disponibles
const showtimes = [
    {time: "12:20", format: "2D Español" },
    {time: "13:20", format: "2D Español" },
    {time: "17:00", format: "2D Español XL" },
    {time: "18:00", format: "2D Español" },
    {time: "22:00", format: "2D Inglés" }
];

function loadMovieDetails() {
    const movieData = JSON.parse(sessionStorage.getItem('selectedMovie'));        
    if (!movieData) {
        window.location.href = 'index.html';
        return;
    }

    selectedMovie = movieData;
            
            // Actualizar UI con datos de la película
    document.getElementById('moviePoster').src = movieData.image;
    document.getElementById('movieTitle').textContent = movieData.title;
    document.getElementById('movieRating').textContent = movieData.rating;
    document.getElementById('movieRating').style.backgroundColor = movieData.ratingColor;
    document.getElementById('movieDuration').textContent = movieData.duration;
    document.getElementById('movieDirector').textContent = `Dir: ${movieData.director}`;
    document.getElementById('movieSynopsis').textContent = movieData.synopsis;
    // Generar horarios
    generateShowtimes();
    }

function generateShowtimes() {
    const showtimesGrid = document.getElementById('showtimesGrid');
    showtimesGrid.innerHTML = '';

    showtimes.forEach(showtime => {
        const timeSlot = document.createElement('div');
        timeSlot.className = 'time-slot';
        timeSlot.innerHTML = `
            <div class="time">${showtime.time}</div>
            <div class="format">${showtime.format}</div>
        `;
                
        timeSlot.addEventListener('click', () => selectTime(showtime, timeSlot));
        showtimesGrid.appendChild(timeSlot);
    });
}

function selectTime(showtime, element) {
    // Remover selección previa
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
            
    // Seleccionar nuevo horario
    element.classList.add('selected');
    selectedTime = showtime;
            
    // Habilitar botón continuar
    document.getElementById('continueBtn').style.display = 'block';
}

function continueToSeats() {
    if (!selectedTime) {
        alert('Por favor selecciona un horario');
        return;
    }
    // Guardar selección en sessionStorage
    const selection = {
        movie: selectedMovie,
        showtime: selectedTime
    };
            
    sessionStorage.setItem('movieSelection', JSON.stringify(selection));
    window.location.href = 'asiento.html';
}

// Inicializar
document.addEventListener('DOMContentLoaded', loadMovieDetails);