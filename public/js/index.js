const moviesData = {
    cartelera: [
        {
            id: 1,
            title: "Nada es lo que parece 3",
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
            title: "Marty Supreme",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1437815263864033420/MARTY_SUPREME_-_Payoff_Poster.jpg?ex=691b34d0&is=6919e350&hm=b1bae2442f9c65342648117a7a45f889b5ad2ec948c5e327cbc0295316b2b06a",
            rating: "+18",
            ratingColor: "#d9534f", 
            duration: "1h 50m", 
            director: "Josh Safdie",
            cast: "Timothée Chalamet, Gwyneth Paltrow, Tyler, the Creator",
            synopsis: "Una historia original ficticia inspirada en la vida del legendario y excéntrico campeón de tenis de mesa (ping-pong), Marty Reisman."
        },
        {
            id: 5,
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
            id: 6,
            title: "Avatar: Fire and Ash",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1438971531555373148/image0.jpg?ex=691acc6b&is=69197aeb&hm=eedab32d1f13dbd99afab6845e83897a6cb9f40dfc1d840ac809884c94164d46",
            rating: "TP",
            ratingColor: "#007bff",
            duration: "3h 10m",
            director: "James Cameron",
            cast: "Sam Worthington, Zoe Saldaña, Sigourney Weaver, Stephen Lang, Oona Chaplin",
            synopsis: "Jake Sully y Neytiri se enfrentan a una nueva amenaza: el Pueblo de las Cenizas, un clan agresivo de Na'vi volcánicos que mostrará el lado más oscuro de Pandora."
        },
        {
            id: 7,
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
            id: 8,
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
            id: 9,
            title: "Stranger Things: The First Shadow",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1434210557149450271/image0.jpg?ex=691b46ab&is=6919f52b&hm=1ba4c8a0eb07f06a80755bdfce130256cc83bdbfa2c5766fde8e4b018dd361d2",
            rating: "TP",
            ratingColor: "#007bff",
            duration: "2h 30m",
            director: "Stephen Daldry",
            cast: "Louis McCartney, Ella Karuna Williams",
            synopsis: "Hawkins, 1959: una ciudad normal con preocupaciones normales, antes de que el mundo se pusiera del revés."
        },
        {
            id: 10,
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
            id: 11,
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
            id: 12,
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
            id: 13,
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
            id: 14,
            title: "Toy Story 5",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1437915702836334672/Toy-Story-5-poster.png?ex=691ae99a&is=6919981a&hm=553638a95655338c43178977c57519bb3fe019ac256cf7c0f14840065004d74a",
            rating: "Todo Público",
            ratingColor: "#5cb85c",
            duration: "1h 40m",
            director: "Andrew Stanton",
            cast: "Tom Hanks, Tim Allen",
            synopsis: "Woody, Buzz y el resto de la pandilla regresan para enfrentarse a un nuevo desafío: la tecnología. Los juguetes tendrán que competir contra tablets y dispositivos electrónicos para recuperar la atención de los niños."
        },
        {
            id: 15,
            title: "One Piece: El arco final",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1432763375598960650/IMG_9189.jpg?ex=691b48e0&is=6919f760&hm=51cebeb18e83057c8d00d533b0dbf749e83398456824e978589791610b0b479b",
            rating: "+10",
            ratingColor: "#f0ad4e",
            duration: "2h",
            director: "Eiichiro Oda (Supervisor)",
            cast: "Mayumi Tanaka, Kazuya Nakai",
            synopsis: "Luffy se acerca al final de su viaje para convertirse en el Rey de los Piratas."
        },
        {
            id: 16,
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
            id: 17,
            title: "Taylor Swift: The Eras Tour (Final)",
            image: "https://cdn.discordapp.com/attachments/539935961652527105/1438965600176046253/IMG_9466.jpg?ex=691ac6e5&is=69197565&hm=727d2e1a2c20b8fa66b1021de643411ffccb5980f25db0f950c1478fa06da229",
            rating: "+13",
            ratingColor: "#f0ad4e",
            duration: "3h 00m",
            director: "Sam Wrench",
            cast: "Taylor Swift",
            synopsis: "Documental sobre el final de una era: el último show de la gira más grande de la historia."
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