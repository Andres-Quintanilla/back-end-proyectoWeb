const express = require('express');
const courseController = require('../controllers/cursoController');
const upload = require('../utils/upload');
const router = express.Router();

// Rutas para cursos
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/user/:userId', courseController.getCoursesByUser); // Nueva ruta
router.post('/', upload.single('imagen'), courseController.createCourse); // Usar upload.single para subir una imagen
router.put('/:id', upload.single('imagen'), courseController.updateCourse); // Usar upload.single para actualizar una imagen
router.delete('/:id', courseController.deleteCourse);

// Nuevas rutas para progreso y tiempo de visualización
router.put('/progreso', courseController.updateProgress);
router.put('/tiempo', courseController.updateTime);

// Nueva ruta para verificar la inscripción del usuario
router.get('/inscripcion', courseController.getUserEnrollment);

module.exports = router;
