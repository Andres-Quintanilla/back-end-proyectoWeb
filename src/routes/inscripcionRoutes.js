const express = require('express');
const enrollmentController = require('../controllers/inscripcionController');
const router = express.Router();

router.get('/', enrollmentController.getAllEnrollments);
router.get('/:id', enrollmentController.getEnrollmentById);
router.post('/', enrollmentController.createEnrollment);
router.put('/:id', enrollmentController.updateEnrollment);
router.delete('/:id', enrollmentController.deleteEnrollment);
router.get('/count/:userId', enrollmentController.countEnrollmentsByUserId); // Nueva ruta

module.exports = router;
