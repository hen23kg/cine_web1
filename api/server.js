const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors());
app.use(express.json());

// ========== CONFIGURACIÓN CORRECTA ==========
// Tus archivos HTML están en cine_web1/public/
const projectRoot = path.join(__dirname, '..');
const publicPath = path.join(projectRoot, 'public'); // ¡Esta es la carpeta correcta!

console.log('Ubicación del servidor:', __dirname);
console.log('Carpeta public encontrada:', fs.existsSync(publicPath));
console.log('Path de public:', publicPath);

// Verificar qué hay en la carpeta public
if (fs.existsSync(publicPath)) {
    console.log('Archivos en public/:');
    const files = fs.readdirSync(publicPath);
    files.forEach(file => {
        console.log('   -', file);
    });
} else {
    console.log('Carpeta public NO existe');
}


app.use(express.static(publicPath));

// También servir desde la raíz por compatibilidad
app.use(express.static(projectRoot));


const carteleraPath = path.join(__dirname, 'data', 'cartelera.json');
let carteleraData = { carousel: [], cartelera: [], preventa: [] };

try {
    if (fs.existsSync(carteleraPath)) {
        carteleraData = JSON.parse(fs.readFileSync(carteleraPath, 'utf8'));
        console.log('Cartelera cargada correctamente');
        console.log(`   - Carousel: ${carteleraData.carousel.length} imágenes`);
        console.log(`   - Cartelera: ${carteleraData.cartelera.length} películas`);
        console.log(`   - Preventa: ${carteleraData.preventa.length} próximos estrenos`);
    } else {
        console.log('cartelera.json no encontrado');
    }
} catch (error) {
    console.error('Error cargando cartelera:', error);
}

// ========== ENDPOINTS DE LA API ==========
app.get('/api/cartelera', (req, res) => {
    try {
        console.log('Enviando datos completos de cartelera');
        res.json(carteleraData);
    } catch (error) {
        console.error('Error en API cartelera:', error);
        res.status(500).json({ error: 'Error al cargar la cartelera' });
    }
});

app.get('/api/pelicula/:id', (req, res) => {
    try {
        const peliculaId = req.params.id;
        console.log('Buscando película ID:', peliculaId);
        
        let pelicula = carteleraData.cartelera.find(p => p.id === peliculaId);
        if (!pelicula) {
            pelicula = carteleraData.preventa.find(p => p.id === peliculaId);
        }
        
        if (!pelicula) {
            return res.status(404).json({ error: 'Película no encontrada' });
        }
        
        res.json({ pelicula });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar la película' });
    }
});

app.get('/api/funcion/:peliculaId/:horario', (req, res) => {
    try {
        const { peliculaId, horario } = req.params;
        
        const asientosOcupados = [];
        const asientosOcupadosCount = Math.floor(Math.random() * 20) + 10;
        
        for (let i = 0; i < asientosOcupadosCount; i++) {
            const fila = String.fromCharCode(65 + Math.floor(Math.random() * 8));
            const numero = Math.floor(Math.random() * 8) + 1;
            asientosOcupados.push(`${fila}${numero}`);
        }
        
        res.json({ 
            asientosOcupados,
            sala: 'SALA ' + (Math.floor(Math.random() * 8) + 1),
            precio: 10.00
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar información de asientos' });
    }
});

// Ruta principal - index.html está en public/
app.get('/', (req, res) => {
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        console.log('🏠 Sirviendo index.html desde public/');
        res.sendFile(indexPath);
    } else {
        res.send(`
            <h1>Bienvenido a CINEMAX</h1>
            <p>Servidor funcionando correctamente </p>
            <p>Pero no se encontró index.html en: ${publicPath}</p>
            <p>Archivos en public/: ${fs.readdirSync(publicPath).join(', ')}</p>
            <p><a href="/api/cartelera">Ver API de cartelera</a></p>
        `);
    }
});

app.get('/index.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/pelicula.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'pelicula.html'));
});

app.get('/asientos.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'asientos.html'));
});

app.get('/compra.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'compra.html'));
});

app.get('/confirmacion.html', (req, res) => {
    res.sendFile(path.join(publicPath, 'confirmacion.html'));
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


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - No encontrado`);
    
    // Intentar servir index.html como fallback (SPA)
    const indexPath = path.join(publicPath, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send(`
            <h1>Página no encontrada</h1>
            <p>La página <strong>${req.url}</strong> no existe.</p>
            <p><a href="/">Ir al inicio</a></p>
            <p><a href="/api/cartelera">Ver API</a></p>
        `);
    }
});


app.listen(PORT, () => {
    console.log(`\n¡SERVIDOR CINEMAX INICIADO CORRECTAMENTE!`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api/cartelera`);
    
    console.log(`\n PÁGINAS DISPONIBLES:`);
    console.log(`   Inicio: http://localhost:${PORT}/`);
    console.log(`   Película: http://localhost:${PORT}/pelicula.html`);
    console.log(`   Asientos: http://localhost:${PORT}/asientos.html`);
    console.log(`   Compra: http://localhost:${PORT}/compra.html`);
    console.log(`   Confirmación: http://localhost:${PORT}/confirmacion.html`);
    
    console.log(`\n ENDPOINTS API:`);
    console.log(`   Cartelera: http://localhost:${PORT}/api/cartelera`);
});