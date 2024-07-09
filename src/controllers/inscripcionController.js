const enrollmentModel = require('../models/inscripcionModel');

const validateFields = (fields) => {
    for (const key in fields) {
        if (fields[key] === undefined) {
            return `El campo ${key} no está definido.`;
        }
    }
    return null;
};

const getAllEnrollments = async (req, res) => {
    const { userId, cursoId } = req.query;
    try {
        let enrollments;
        if (userId && cursoId) {
            enrollments = await enrollmentModel.getEnrollmentByUserIdAndCursoId(userId, cursoId);
        } else if (userId) {
            enrollments = await enrollmentModel.getEnrollmentsByUserId(userId);
        } else {
            enrollments = await enrollmentModel.getAllEnrollments();
        }
        res.json(enrollments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getEnrollmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const enrollment = await enrollmentModel.getEnrollmentById(id);
        res.json(enrollment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createEnrollment = async (req, res) => {
    const { idCurso, idUsuario, fechaInscripcion, progreso } = req.body;

    const validationError = validateFields({ idCurso, idUsuario, fechaInscripcion, progreso });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const formattedDate = new Date(fechaInscripcion).toISOString().split('T')[0];

    try {
        const existingEnrollment = await enrollmentModel.getEnrollmentByUserIdAndCursoId(idUsuario, idCurso);
        if (existingEnrollment.length > 0) {
            return res.status(409).json({ message: 'Ya estás matriculado en este curso' });
        }

        const enrollmentId = await enrollmentModel.createEnrollment(idCurso, idUsuario, formattedDate, progreso);
        const newEnrollment = await enrollmentModel.getEnrollmentById(enrollmentId);
        res.json(newEnrollment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateEnrollment = async (req, res) => {
    const { id } = req.params;
    const { idCurso, idUsuario, fechaInscripcion, progreso, ultimaLeccionVista } = req.body;

    const validationError = validateFields({ idCurso, idUsuario, fechaInscripcion, progreso, ultimaLeccionVista });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const formattedDate = new Date(fechaInscripcion).toISOString().split('T')[0];

    try {
        await enrollmentModel.updateEnrollment(id, idCurso, idUsuario, formattedDate, progreso, ultimaLeccionVista);
        const updatedEnrollment = await enrollmentModel.getEnrollmentById(id);
        res.json(updatedEnrollment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteEnrollment = async (req, res) => {
    const { id } = req.params;
    try {
        await enrollmentModel.deleteEnrollment(id);
        res.json({ message: 'Inscripción eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateProgress = async (req, res) => {
    const { cursoId, userId, progreso, ultimaLeccionVista } = req.body;
    try {
        await enrollmentModel.updateProgress(cursoId, userId, progreso, ultimaLeccionVista);
        res.json({ message: 'Progreso actualizado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateLessonTime = async (req, res) => {
    const { cursoId, userId, tiempo, ultimaLeccionVista } = req.body;
    try {
        await enrollmentModel.updateLessonTime(cursoId, userId, tiempo, ultimaLeccionVista);
        res.json({ message: 'Tiempo de lección actualizado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const countEnrollmentsByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
        const total = await enrollmentModel.countEnrollmentsByUserId(userId);
        res.json({ total });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    updateProgress,
    updateLessonTime,
    countEnrollmentsByUserId
};
