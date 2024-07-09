const courseModel = require('../models/cursoModel');
const lessonModel = require('../models/leccionModel'); // Asegúrate de tener el modelo de lecciones

const getAllCourses = async (req, res) => {
    try {
        const courses = await courseModel.getAllCourses();
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener los cursos:', error);
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
};

const getCoursesByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const courses = await courseModel.getCoursesByUser(userId);
        res.json(courses);
    } catch (error) {
        console.error('Error al obtener los cursos del usuario:', error);
        res.status(500).json({ error: 'Error al obtener los cursos del usuario' });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.getCourseById(id);
        res.json(course);
    } catch (error) {
        console.error('Error al obtener el curso:', error);
        res.status(500).json({ error: 'Error al obtener el curso' });
    }
};

const createCourse = async (req, res) => {
    const { nombre, categoriaId, descripcion, userId, videoLink } = req.body;
    const imagenPath = req.file ? req.file.filename : ''; // Asegúrate de guardar solo el nombre del archivo

    if (!nombre || !descripcion || !categoriaId || !userId || !videoLink) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const existingCourse = await courseModel.getCourseByNameAndUser(nombre, userId);
        if (existingCourse) {
            return res.status(409).json({ success: false, error: 'El curso ya existe para este usuario' });
        }

        const courseId = await courseModel.createCourse({ nombre, categoriaId, descripcion, imagenPath, userId, videoLink });
        res.json({ success: true, courseId });
    } catch (error) {
        console.error('Error al crear el curso:', error);
        res.json({ success: false, error });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoriaId, videoLink } = req.body;
    const imagenPath = req.file ? req.file.filename : '';

    try {
        await courseModel.updateCourse(id, { nombre, descripcion, imagenPath, categoriaId, videoLink });
        res.json({ success: true });
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.json({ success: false, error });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        await courseModel.deleteCourse(id);
        res.json({ success: true });
    } catch (error) {
        console.error('Error al eliminar el curso:', error);
        res.json({ success: false, error });
    }
};

const createLesson = async (req, res) => {
    const { cursoId, nombre, tipo, contenidoPath } = req.body;

    try {
        const lessonId = await lessonModel.createLesson(cursoId, nombre, tipo, contenidoPath);
        res.json({ success: true, lessonId });
    } catch (error) {
        console.error('Error al crear la lección:', error);
        res.json({ success: false, error });
    }
};

const getUserEnrollment = async (req, res) => {
    const { userId, cursoId } = req.query;
    try {
        const enrollment = await courseModel.getUserEnrollment(userId, cursoId);
        res.json(enrollment);
    } catch (error) {
        console.error('Error al obtener la inscripción del usuario:', error);
        res.status(500).json({ error: 'Error al obtener la inscripción del usuario' });
    }
};

const updateProgress = async (req, res) => {
    const { cursoId, userId, progreso, ultimaLeccionVista } = req.body;
    try {
        await courseModel.updateProgress(cursoId, userId, progreso, ultimaLeccionVista);
        res.json({ message: 'Progreso actualizado' });
    } catch (error) {
        console.error('Error al actualizar el progreso:', error);
        res.status(500).json({ message: 'Error al actualizar el progreso' });
    }
};

const updateTime = async (req, res) => {
    const { cursoId, userId, tiempo, ultimaLeccionVista } = req.body;
    try {
        await courseModel.updateTime(cursoId, userId, tiempo, ultimaLeccionVista);
        res.json({ message: 'Tiempo de lección guardado' });
    } catch (error) {
        console.error('Error al guardar el tiempo de lección:', error);
        res.status(500).json({ message: 'Error al guardar el tiempo de lección' });
    }
};

module.exports = {
    getAllCourses,
    getCoursesByUser,
    createCourse,
    updateCourse,
    deleteCourse,
    createLesson,
    getCourseById,
    getUserEnrollment,
    updateProgress,
    updateTime
};
