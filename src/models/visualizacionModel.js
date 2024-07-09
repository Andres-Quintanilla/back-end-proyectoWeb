const pool = require('../db');

const getAllVisualizations = async () => {
    const [rows] = await pool.execute('SELECT idVisualizacion, idLeccion, idUsuario, DATE_FORMAT(fechaVisualizacion, "%Y-%m-%d") AS fechaVisualizacion FROM visualizacion');
    return rows;
};

const getVisualizationById = async (idVisualizacion) => {
    const [rows] = await pool.execute('SELECT idVisualizacion, idLeccion, idUsuario, DATE_FORMAT(fechaVisualizacion, "%Y-%m-%d") AS fechaVisualizacion FROM visualizacion WHERE idVisualizacion = ?', [idVisualizacion]);
    return rows[0];
};

const createVisualization = async (idLeccion, idUsuario, fechaVisualizacion) => {
    const [result] = await pool.execute(
        'INSERT INTO visualizacion (idLeccion, idUsuario, fechaVisualizacion) VALUES (?, ?, ?)', 
        [idLeccion, idUsuario, fechaVisualizacion]
    );
    return result.insertId;
};

const updateVisualization = async (idVisualizacion, idLeccion, idUsuario, fechaVisualizacion) => {
    await pool.execute(
        'UPDATE visualizacion SET idLeccion = ?, idUsuario = ?, fechaVisualizacion = ? WHERE idVisualizacion = ?', 
        [idLeccion, idUsuario, fechaVisualizacion, idVisualizacion]
    );
};

const deleteVisualization = async (idVisualizacion) => {
    await pool.execute('DELETE FROM visualizacion WHERE idVisualizacion = ?', [idVisualizacion]);
};

module.exports = {
    getAllVisualizations,
    getVisualizationById,
    createVisualization,
    updateVisualization,
    deleteVisualization
};
