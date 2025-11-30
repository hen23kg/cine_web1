require('dotenv').config();
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admin';

const datosCompletos = {
    carousel: [
        {
            img: "https://cdn.discordapp.com/attachments/539935961652527105/1432763375598960650/IMG_9189.jpg",
            title: "One Piece Banner"
        },
        {
            img: "https://cdn.discordapp.com/attachments/539935961652527105/1433879483282096178/IMG_9266.jpg",
            title: "Banner Película 1"
        },
        {
            img: "https://pbs.twimg.com/media/G4WyJUwbwAAxXH9.jpg",
            title: "Doctor Who Christmas Special 2026"
        }
    ],
    cartelera: [
        {
            id: "1",
            titulo: "Nada es lo que parece 3",
            poster: "https://image.tmdb.org/t/p/w500/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg",
            sinopsis: "Los Cuatro Jinetes regresan para una nueva generación de magos, llevando la ilusión a nuevos extremos.",
            duracion: 115,
            genero: "Suspenso, Thriller",
            clasificacion: "TP",
            funciones: [
                {"id": "1-1", "hora": "14:00", "sala": "Sala 1", "formato": "2D"},
                {"id": "1-2", "hora": "17:30", "sala": "Sala 1", "formato": "2D"},
                {"id": "1-3", "hora": "21:00", "sala": "Sala 1", "formato": "2D"}
            ]
        },
        {
            id: "2",
            titulo: "Spider-Man: Across the Spider-Verse",
            poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
            sinopsis: "Miles Morales se catapulta a través del Multiverso y se encuentra con un equipo de Spider-Gente encargado de proteger su existencia.",
            duracion: 140,
            genero: "Animación, Acción",
            clasificacion: "Todo Público",
            funciones: [
                {"id": "2-1", "hora": "15:00", "sala": "Sala 2", "formato": "3D"},
                {"id": "2-2", "hora": "18:15", "sala": "Sala 2", "formato": "3D"},
                {"id": "2-3", "hora": "21:30", "sala": "Sala 2", "formato": "3D"}
            ]
        }
    ],
    preventa: [
        {
            id: "p1",
            titulo: "K-Pop: Demon Hunters",
            poster: "https://variety.com/wp-content/uploads/2025/10/Kpop-Demon-Hunters-1.webp",
            sinopsis: "Un grupo de chicas de K-Pop lleva una doble vida cazando demonios en este vibrante filme animado.",
            duracion: 130,
            genero: "Animación, Acción, Música",
            clasificacion: "+14",
            fechaEstreno: "2024-12-15"
        }
    ]
};

async function initDatabase() {
    try {
        console.log('conectando a MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('conectado a MongoDB');

        const CineSchema = new mongoose.Schema({}, { strict: false, collection: 'cine-we1' });
        const CineModel = mongoose.model('CineData', CineSchema);

        await CineModel.deleteMany({});
        console.log('colección limpiada');

        await CineModel.create(datosCompletos);
        console.log('datos insertados en MongoDB');

        const conteo = await CineModel.countDocuments();
        console.log(`documentos en la colección: ${conteo}`);

        console.log('Base de datos inicializada con éxito!');
        console.log(`películas: ${datosCompletos.cartelera.length}`);
        console.log(`carousel: ${datosCompletos.carousel.length}`);
        console.log(`preventas: ${datosCompletos.preventa.length}`);

        process.exit(0);
    } catch (error) {
        console.error('Error inicializando la base de datos:', error);
        process.exit(1);
    }
}

initDatabase();