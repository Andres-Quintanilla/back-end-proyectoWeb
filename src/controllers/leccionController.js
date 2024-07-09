const lessonModel = require('../models/leccionModel');
const fs = require('fs');
const path = require('path');

const validateFields = (fields) => {
    for (const key in fields) {
        if (!fields[key]) {  // Cambiado de fields[key] === undefined a !fields[key] para verificar campos vacíos
            return `El campo ${key} no está definido.`;
        }
    }
    return null;
};

const getAllLessons = async (req, res) => {
    try {
        const lessons = await lessonModel.getAllLessons();
        res.json(lessons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getLessonsByCourse = async (req, res) => {
    const { cursoId } = req.params;

    if (cursoId === undefined) {
        return res.status(400).json({ message: 'El ID del curso no está definido.' });
    }

    try {
        const lessons = await lessonModel.getLessonsByCourse(cursoId);
        res.json(lessons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getLessonById = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        return res.status(400).json({ message: 'El ID de la lección no está definido.' });
    }

    try {
        const lesson = await lessonModel.getLessonById(id);
        res.json(lesson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const createLesson = async (req, res) => {
    const { nombre, videoLink, descripcion, cursoId } = req.body;
    const imagen = req.file;

    console.log({ nombre, videoLink, descripcion, cursoId, imagen });

    const validationError = validateFields({ nombre, videoLink, descripcion, cursoId });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const imagenPath = imagen ? path.join('uploads', imagen.filename) : null;

    try {
        const lessonId = await lessonModel.createLesson({ nombre, videoLink, descripcion, cursoId, imagenPath });
        const newLesson = await lessonModel.getLessonById(lessonId);
        res.json(newLesson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateLesson = async (req, res) => {
    const { id } = req.params;
    const { nombre, videoLink, descripcion, cursoId } = req.body;
    const imagen = req.file;

    console.log({ id, nombre, videoLink, descripcion, cursoId, imagen });

    const validationError = validateFields({ nombre, videoLink, descripcion, cursoId });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    const imagenPath = imagen ? path.join('uploads', imagen.filename) : req.body.imagenPath;

    try {
        await lessonModel.updateLesson(id, { nombre, videoLink, descripcion, imagenPath });
        const updatedLesson = await lessonModel.getLessonById(id);
        res.json(updatedLesson);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const deleteLesson = async (req, res) => {
    const { id } = req.params;

    if (id === undefined) {
        return res.status(400).json({ message: 'El ID de la lección no está definido.' });
    }

    try {
        await lessonModel.deleteLesson(id);
        res.json({ message: 'Lección eliminada' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllLessons,
    getLessonsByCourse,
    getLessonById,
    createLesson,
    updateLesson,
    deleteLesson
};
