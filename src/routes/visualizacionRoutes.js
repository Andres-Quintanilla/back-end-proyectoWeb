const express = require('express');
const visualizationController = require('../controllers/visualizacionController');
const router = express.Router();

// Rutas para visualizaciones
router.get('/', visualizationController.getAllVisualizations);
router.get('/:id', visualizationController.getVisualizationById);
router.post('/', visualizationController.createVisualization);
router.put('/:id', visualizationController.updateVisualization);
router.delete('/:id', visualizationController.deleteVisualization);

module.exports = router;
