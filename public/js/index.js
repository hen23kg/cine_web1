const moviesData = {
    cartelera: [
        {
            id: 1,            
            title: "DAMSIEL",
            image: "https://image.tmdb.org/t/p/w500/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg", // Nota: Esta imagen en realidad es de 'Damsel' en TMDB, pero mantuve tu título.
            rating: "TP",
            ratingColor: "#007bff",
            duration: "1h 55m",
            director: "Ruben Fleischer",
            cast: "Jesse Eisenberg, Woody Harrelson, Morgan Freeman",
            synopsis: "Los Cuatro Jinetes regresan para una nueva generación de magos, llevando la ilusión a nuevos extremos."
        },
        {
            id: 2,
            title: "Spider-Man: Across the Spider-Verse",
            image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            rating: "Todo Público",
            ratingColor: "#5cb85c",
            duration: "2h 20m",
            director: "Joaquim Dos Santos",
            cast: "Shameik Moore, Hailee Steinfeld, Oscar Isaac",
            synopsis: "Miles Morales se catapulta a través del Multiverso y se encuentra con un equipo de Spider-Gente encargado de proteger su existencia."
        },
        {
            id: 3,
            title: "CoComelon: La Película",
            image: "https://variety.com/wp-content/uploads/2021/12/Moonbug-CoComelon.jpg?w=1000&h=563&crop=1",
            rating: "Todo Público",
            ratingColor: "#5cb85c",
            duration: "1h 30m",
            director: "Por confirmar",
            cast: "Animación",
            synopsis: "JJ y sus amigos se embarcan en aventuras musicales inolvidables llenas de aprendizaje y diversión."
        },
        {            
            id: 4,
            title: "The Mummy (Reestreno)",
            image: "https://pbs.twimg.com/media/G475-JzXgAAawdu.jpg:large",
            rating: "+14",
            ratingColor: "#f0ad4e",
            duration: "2h 04m",
            director: "Stephen Sommers",
            cast: "Brendan Fraser, Rachel Weisz",
            synopsis: "Un aventurero estadounidense despierta accidentalmente a una momia maldita con poderes sobrenaturales."
        },
        {
            id: 5,
            title: "IN THEARES MAY1",
            image: "https://pbs.twimg.com/media/G5keKfcWgAAKAvF.jpg?name=orig",
            rating: "+13",
            ratingColor: "#f0ad4e", 
            duration: "2h 10m",     
            director: "Jake Schreier",
            cast: "Florence Pugh, Sebastian Stan, David Harbour, Wyatt Russell, Julia Louis-Dreyfus",
            synopsis: "Un grupo de supervillanos y antihéroes reformados es reclutado por el gobierno para realizar operaciones encubiertas de alto riesgo."
        },
        {
            id: 6,
            title: "Overcooked: La Película",
            image: "https://deadline.com/wp-content/uploads/2025/11/Overcooked.jpg?w=1024",
            rating: "Todo Público",
            ratingColor: "#5cb85c",
            duration: "1h 40m",
            director: "Ghost Town Games",
            cast: "Animación, El Rey Cebolla, Kevin",
            synopsis: "El caos se desata en la cocina. Los chefs deben unirse para salvar el Reino de la Cebolla de una antigua maldición comestible, cocinando en los entornos más peligrosos y absurdos jamás vistos."
        },
        {
            id: 7,
            title: "Godzilla Minus One",
            image: "https://pbs.twimg.com/media/G4uJ0DubMAAsuyL.jpg:large",
            rating: "Todo Público",
            ratingColor: "#5cb85c",
            duration: "2h 05m",
            director: "Takashi Yamazaki",
            cast: "Ryunosuke Kamiki, Minami Hamabe",
            synopsis: "Japón, devastado tras la guerra, enfrenta una nueva amenaza: Godzilla."
        },
        {
            id: 8,
            title: "Oppenheimer (IMAX)",
            image: "https://pbs.twimg.com/media/G3zALCWXUAAvqzB.jpg?name=orig",
            rating: "+18",
            ratingColor: "#d9534f",
            duration: "3h 00m",
            director: "Christopher Nolan",
            cast: "Cillian Murphy, Emily Blunt, Robert Downey Jr.",
            synopsis: "La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica."
        },
        {
            id: 9,
            title: "Stranger Things: Temporada Final",
            image: "https://variety.com/wp-content/uploads/2025/10/Stranger-Things-Collage.jpg?crop=0px%2C34px%2C1920px%2C1080px&resize=1000%2C563",
            rating: "+10",
            ratingColor: "#f0ad4e",
            duration: "Series",
            director: "Hermanos Duffer",
            cast: "Millie Bobby Brown, Finn Wolfhard",
            synopsis: "La conclusión épica de la batalla de Hawkins contra Vecna y el Upside Down."
        }
    ],
    preventa: [
        {
            id: 11,
            title: "K-Pop: Demon Hunters",
            image: "https://variety.com/wp-content/uploads/2025/10/Kpop-Demon-Hunters-1.webp?w=1000&h=563&crop=1",
            rating: "+14",
            ratingColor: "#f0ad4e",
            duration: "Por confirmar",
            director: "Maggie Kang",
            cast: "Animación",
            synopsis: "Un grupo de chicas de K-Pop lleva una doble vida cazando demonios."
      },
      {
            id: 1,
            title: "Empire: Preview 2026",
            image: "https://images.bauerhosting.com/empire/2025/11/empjan26-cn-odyssey-cover-newsstand.jpg?auto=format&w=1200&q=80",
            rating: "TP",
            ratingColor: "#007bff",
            duration: "",
            director: "",
            cast: "",
            synopsis: ""
        },
        {
            id: "7",
            title: "WONKA",
            image: "https://image.tmdb.org/t/p/w500/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
            rating: "+13",
            ratingColor: "#f0ad4e", 
            duration: "1h 56m",
            director: "Paul King",
            cast: "Timothée Chalamet, Calah Lane, Hugh Grant, Olivia Colman, Rowan Atkinson",
            synopsis: "Armado únicamente con muchos sueños y trabajando muy duro, el joven chocolatero Willy Wonka logra cambiar el mundo, un bocado delicioso a la vez."
        }
    ]
};

function generateMovieCards() {
    const carteleraGrid = document.getElementById('movieGridCartelera');
    const preventaGrid = document.getElementById('movieGridPreventa');

    carteleraGrid.innerHTML = '';
    preventaGrid.innerHTML = '';

    moviesData.cartelera.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.setAttribute('data-movie-id', movie.id);
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <span class="rating-badge" style="background-color: ${movie.ratingColor};">${movie.rating}</span>
        `;
        carteleraGrid.appendChild(movieCard);
    });

    moviesData.preventa.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.setAttribute('data-movie-id', movie.id);
        movieCard.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <span class="rating-badge" style="background-color: ${movie.ratingColor};">${movie.rating}</span>
        `;
        preventaGrid.appendChild(movieCard);
    });

            addMovieCardListeners();
        }

function addMovieCardListeners() {
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', function() {
            const movieId = this.getAttribute('data-movie-id');
            const movie = [...moviesData.cartelera, ...moviesData.preventa].find(m => m.id == movieId);

            if (movie) {
                sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
                window.location.href = 'hora.html';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', generateMovieCards);