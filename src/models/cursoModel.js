const pool = require('../db');

const getAllCourses = async () => {
    const [rows] = await pool.execute(`
        SELECT curso.*, categoria.nombre AS categoriaNombre
        FROM curso
        JOIN categoria ON curso.categoriaId = categoria.idCategoria
    `);
    return rows;
};

const getCoursesByUser = async (userId) => {
    const [rows] = await pool.execute('SELECT * FROM curso WHERE userId = ?', [userId]);
    return rows;
};

const getCourseById = async (idCurso) => {
    const [rows] = await pool.execute(`
        SELECT curso.*, categoria.nombre AS categoriaNombre
        FROM curso
        JOIN categoria ON curso.categoriaId = categoria.idCategoria
        WHERE curso.idCurso = ?
    `, [idCurso]);
    return rows[0];
};

const getCourseByNameAndUser = async (nombre, userId) => {
    const [rows] = await pool.execute('SELECT * FROM curso WHERE nombre = ? AND userId = ?', [nombre, userId]);
    return rows[0];
};

const createCourse = async ({ nombre, descripcion, imagenPath, categoriaId, userId, videoLink }) => {
    const [result] = await pool.execute(
        'INSERT INTO curso (nombre, descripcion, imagenPath, categoriaId, userId, videoLink) VALUES (?, ?, ?, ?, ?, ?)', 
        [nombre, descripcion, imagenPath, categoriaId, userId, videoLink]
    );
    return result.insertId;
};

const updateCourse = async (idCurso, { nombre, descripcion, imagenPath, categoriaId, videoLink }) => {
    await pool.execute(
        'UPDATE curso SET nombre = ?, descripcion = ?, imagenPath = ?, categoriaId = ?, videoLink = ? WHERE idCurso = ?', 
        [nombre, descripcion, imagenPath, categoriaId, videoLink, idCurso]
    );
};

const deleteCourse = async (idCurso) => {
    await pool.execute('DELETE FROM inscripcion WHERE idCurso = ?', [idCurso]); // Eliminar inscripciones relacionadas
    await pool.execute('DELETE FROM curso WHERE idCurso = ?', [idCurso]);
};

const getUserEnrollment = async (userId, cursoId) => {
    const [rows] = await pool.execute(
        'SELECT * FROM inscripcion WHERE idUsuario = ? AND idCurso = ?',
        [userId, cursoId]
    );
    return rows;
};

const updateProgress = async (cursoId, userId, progreso, ultimaLeccionVista) => {
    await pool.execute(
        'UPDATE inscripcion SET progreso = ?, ultimaLeccionVista = ? WHERE idCurso = ? AND idUsuario = ?',
        [progreso, ultimaLeccionVista, cursoId, userId]
    );
};

const updateTime = async (cursoId, userId, tiempo, ultimaLeccionVista) => {
    await pool.execute(
        'UPDATE inscripcion SET tiempoUltimaLeccion = ?, ultimaLeccionVista = ? WHERE idCurso = ? AND idUsuario = ?',
        [tiempo, ultimaLeccionVista, cursoId, userId]
    );
};

module.exports = {
    getAllCourses,
    getCoursesByUser,
    getCourseById,
    getCourseByNameAndUser,
    createCourse,
    updateCourse,
    deleteCourse,
    getUserEnrollment,
    updateProgress,
    updateTime
};
