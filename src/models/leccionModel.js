const pool = require('../db');

const getAllLessons = async () => {
    const [rows] = await pool.execute('SELECT * FROM leccion');
    return rows;
};

const getLessonsByCourse = async (cursoId) => {
    const [rows] = await pool.execute('SELECT * FROM leccion WHERE cursoId = ?', [cursoId]);
    return rows;
};

const getLessonById = async (idLeccion) => {
    const [rows] = await pool.execute('SELECT * FROM leccion WHERE idLeccion = ?', [idLeccion]);
    return rows[0];
};

const createLesson = async ({ nombre, videoLink, descripcion, cursoId, imagenPath }) => {
    const [result] = await pool.execute(
        'INSERT INTO leccion (nombre, videoLink, descripcion, cursoId, imagenPath) VALUES (?, ?, ?, ?, ?)', 
        [nombre, videoLink, descripcion, cursoId, imagenPath]
    );
    return result.insertId;
};

const updateLesson = async (idLeccion, { nombre, videoLink, descripcion, imagenPath }) => {
    await pool.execute(
        'UPDATE leccion SET nombre = ?, videoLink = ?, descripcion = ?, imagenPath = ? WHERE idLeccion = ?', 
        [nombre, videoLink, descripcion, imagenPath, idLeccion]
    );
};

const deleteLesson = async (idLeccion) => {
    await pool.execute('DELETE FROM leccion WHERE idLeccion = ?', [idLeccion]);
};

module.exports = {
    getAllLessons,
    getLessonsByCourse,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};
