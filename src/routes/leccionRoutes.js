const express = require('express');
const lessonController = require('../controllers/leccionController');
const router = express.Router();

// Rutas para lecciones
router.get('/', lessonController.getAllLessons);
router.get('/:id', lessonController.getLessonById);
router.post('/', lessonController.createLesson);
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

module.exports = router;
