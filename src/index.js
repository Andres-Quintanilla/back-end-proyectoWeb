const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const leccionRoutes = require('./routes/leccionRoutes');
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const visualizacionRoutes = require('./routes/visualizacionRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const path = require('path');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Configurar la ruta para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/usuarios', userRoutes);
app.use('/cursos', cursoRoutes);
app.use('/lecciones', leccionRoutes);
app.use('/inscripciones', inscripcionRoutes);
app.use('/visualizaciones', visualizacionRoutes);
app.use('/categorias', categoriaRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola Mundo!');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
