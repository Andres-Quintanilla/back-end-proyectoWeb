// src/controllers/visualizationController.js
const visualizationModel = require('../models/visualizacionModel');

const validateFields = (fields) => {
    for (const key in fields) {
        if (fields[key] === undefined) {
            return `El campo ${key} no está definido.`;
        }
    }
    return null;
};

const getAllVisualizations = async (req, res) => {
    try {
        const visualizations = await visualizationModel.getAllVisualizations();
        res.json(visualizations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getVisualizationById = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        return res.status(400).json({ message: 'El ID de la visualización no está definido.' });
    }

    try {
        const visualization = await visualizationModel.getVisualizationById(id);
        res.json(visualization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createVisualization = async (req, res) => {
    const { idLeccion, idUsuario, fechaVisualizacion } = req.body;

    const validationError = validateFields({ idLeccion, idUsuario, fechaVisualizacion });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const visualizationId = await visualizationModel.createVisualization(idLeccion, idUsuario, fechaVisualizacion);
        const newVisualization = await visualizationModel.getVisualizationById(visualizationId);
        res.json(newVisualization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateVisualization = async (req, res) => {
    const { id } = req.params;
    const { idLeccion, idUsuario, fechaVisualizacion } = req.body;

    const validationError = validateFields({ idLeccion, idUsuario, fechaVisualizacion });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        await visualizationModel.updateVisualization(id, idLeccion, idUsuario, fechaVisualizacion);
        const updatedVisualization = await visualizationModel.getVisualizationById(id);
        res.json(updatedVisualization);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteVisualization = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        return res.status(400).json({ message: 'El ID de la visualización no está definido.' });
    }

    try {
        await visualizationModel.deleteVisualization(id);
        res.json({ message: 'Visualización eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllVisualizations,
    getVisualizationById,
    createVisualization,
    updateVisualization,
    deleteVisualization
};
