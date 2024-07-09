const pool = require('../db');

const getAllEnrollments = async () => {
    const [rows] = await pool.execute('SELECT * FROM inscripcion');
    return rows;
};

const getEnrollmentById = async (idInscripcion) => {
    const [rows] = await pool.execute('SELECT * FROM inscripcion WHERE idInscripcion = ?', [idInscripcion]);
    return rows[0];
};

const createEnrollment = async (idCurso, idUsuario, fechaInscripcion, progreso) => {
    const [result] = await pool.execute(
        'INSERT INTO inscripcion (idCurso, idUsuario, fechaInscripcion, progreso) VALUES (?, ?, ?, ?)', 
        [idCurso, idUsuario, fechaInscripcion, progreso]
    );
    return result.insertId;
};

const updateEnrollment = async (idInscripcion, idCurso, idUsuario, fechaInscripcion, progreso, ultimaLeccionVista) => {
    await pool.execute(
        'UPDATE inscripcion SET idCurso = ?, idUsuario = ?, fechaInscripcion = ?, progreso = ?, ultimaLeccionVista = ? WHERE idInscripcion = ?', 
        [idCurso, idUsuario, fechaInscripcion, progreso, ultimaLeccionVista, idInscripcion]
    );
};

const deleteEnrollment = async (idInscripcion) => {
    await pool.execute('DELETE FROM inscripcion WHERE idInscripcion = ?', [idInscripcion]);
};

const getEnrollmentsByUserId = async (idUsuario) => {
    const [rows] = await pool.execute('SELECT * FROM inscripcion WHERE idUsuario = ?', [idUsuario]);
    return rows;
};

const getEnrollmentByUserIdAndCursoId = async (idUsuario, idCurso) => {
    const [rows] = await pool.execute('SELECT * FROM inscripcion WHERE idUsuario = ? AND idCurso = ?', [idUsuario, idCurso]);
    return rows;
};

const updateProgress = async (cursoId, userId, progreso, ultimaLeccionVista) => {
    await pool.execute('UPDATE inscripcion SET progreso = ?, ultimaLeccionVista = ? WHERE idCurso = ? AND idUsuario = ?', [progreso, ultimaLeccionVista, cursoId, userId]);
};

const updateLessonTime = async (cursoId, userId, tiempo, ultimaLeccionVista) => {
    await pool.execute('UPDATE inscripcion SET tiempoUltimaLeccion = ?, ultimaLeccionVista = ? WHERE idCurso = ? AND idUsuario = ?', [tiempo, ultimaLeccionVista, cursoId, userId]);
};

const countEnrollmentsByUserId = async (idUsuario) => {
    const [rows] = await pool.execute('SELECT COUNT(*) as total FROM inscripcion WHERE idUsuario = ?', [idUsuario]);
    return rows[0].total;
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getEnrollmentsByUserId,
    getEnrollmentByUserIdAndCursoId,
    updateProgress,
    updateLessonTime,
    countEnrollmentsByUserId
};
