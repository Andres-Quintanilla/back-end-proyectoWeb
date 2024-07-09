const categoriaModel = require('../models/categoriaModel');

const getAllCategorias = async (req, res) => {
    try {
        const categorias = await categoriaModel.getAllCategorias();
        res.json(categorias);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

module.exports = {
    getAllCategorias
};
