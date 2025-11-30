require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;

const publicPath = path.join(__dirname, '..', 'public');
const carteleraPath = path.join(__dirname, '..', 'data', 'cartelera.json');

console.log('Ruta de public:', publicPath);
console.log('Existe public?:', fs.existsSync(publicPath));

// --- CONEXIÓN A MONGODB ---
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/admin'; 

console.log('Conectando a MongoDB...');
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB (Base de datos: admin)'))
    .catch(err => {
        console.error('Error conectando a MongoDB:', err);
        console.log('Usando datos locales como respaldo...');
    });

// Esquema para MongoDB
const CineSchema = new mongoose.Schema({}, { strict: false, collection: 'cine-we1' });
const CineModel = mongoose.model('CineData', CineSchema);

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));

// --- DATOS DE RESPALDO ---
let carteleraData = { carousel: [], cartelera: [], preventa: [] };

try {
    if (fs.existsSync(carteleraPath)) {
        carteleraData = JSON.parse(fs.readFileSync(carteleraPath, 'utf8'));
        console.log(' Cartelera local cargada correctamente');
    } else {
        console.log(' cartelera.json no encontrado, usando datos vacíos');
        carteleraData = {
            carousel: [
                {
                    img: "https://cdn.discordapp.com/attachments/539935961652527105/1432763375598960650/IMG_9189.jpg",
                    title: "One Piece Banner"
                }
            ],
            cartelera: [
                {
                    id: "1",
                    titulo: "Película de Ejemplo",
                    poster: "https://via.placeholder.com/300x450/333/fff?text=Poster+Ejemplo",
                    sinopsis: "Esta es una película de ejemplo para probar el sistema.",
                    duracion: 120,
                    genero: "Acción, Aventura",
                    clasificacion: "TP",
                    funciones: [
                        {"id": "1-1", "hora": "14:00", "sala": "Sala 1", "formato": "2D"},
                        {"id": "1-2", "hora": "17:30", "sala": "Sala 1", "formato": "2D"}
                    ]
                }
            ],
            preventa: []
        };
    }
} catch (error) {
    console.error(' Error cargando cartelera local:', error);
}

// --- ENDPOINTS (igual que antes) ---
app.get('/api/cartelera', async (req, res) => {
    try {
        console.log('Consultando MongoDB...');
        
        const datosMongo = await CineModel.findOne();
        
        if (datosMongo) {
            console.log('Datos obtenidos de MongoDB');
            return res.json(datosMongo);
        } else {
            console.log(' MongoDB vacío, usando datos locales');
            res.json(carteleraData);
        }
        
    } catch (error) {
        console.error(' Error en MongoDB, usando datos locales:', error);
        res.json(carteleraData);
    }
});

// --- RUTAS PARA PÁGINAS ---
app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.send(`
            <h1>🎬 CINE-KALAF</h1>
            <p>Servidor funcionando pero no se encontró index.html</p>
            <p>Ruta buscada: ${indexPath}</p>
            <p><a href="/api/cartelera">Ver API</a></p>
        `);
    }
});

app.get('/peliculas', (req, res) => {
    res.sendFile(path.join(publicPath, 'peliculas.html'));
});

app.get('/pelicula', (req, res) => {
    res.sendFile(path.join(publicPath, 'pelicula.html'));
});

app.get('/asientos', (req, res) => {
    res.sendFile(path.join(publicPath, 'asientos.html'));
});

app.get('/compra', (req, res) => {
    res.sendFile(path.join(publicPath, 'compra.html'));
});

app.get('/confirmacion', (req, res) => {
    res.sendFile(path.join(publicPath, 'confirmacion.html'));
});

// Manejo de rutas no encontradas
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

// --- INICIAR SERVIDOR ---
app.listen(PORT, () => {
    console.log(`\n SERVIDOR CINE-KALAF INICIADO!`);
    console.log(` URL: http://localhost:${PORT}`);
    console.log(` API: http://localhost:${PORT}/api/cartelera`);
    
    console.log(`\n PÁGINAS DISPONIBLES:`);
    console.log(`    Inicio: http://localhost:${PORT}/`);
    console.log(`    Película: http://localhost:${PORT}/pelicula`);
    console.log(`    Asientos: http://localhost:${PORT}/asientos`);
    console.log(`    Carrito: http://localhost:${PORT}/carrito`);
    console.log(`    Confirmación: http://localhost:${PORT}/confirmacion`);
    
    console.log(`\n Ruta public: ${publicPath}`);
    console.log(` Existe public: ${fs.existsSync(publicPath)}`);
});