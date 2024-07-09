const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

const validateFields = (fields) => {
    for (const key in fields) {
        if (!fields[key]) {
            return `El campo ${key} no está definido.`;
        }
    }
    return null;
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();
        res.json(users);
    } catch (err) {
        console.error('Error al obtener todos los usuarios:', err.message);
        res.status(500).send('Server error');
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID del usuario no está definido.' });
    }

    try {
        const user = await userModel.getUserById(id);
        res.json(user);
    } catch (err) {
        console.error('Error al obtener el usuario por ID:', err.message);
        res.status(500).send('Server error');
    }
};

const createUser = async (req, res) => {
    const { nombreUsuario, email, password, tipoUsuario } = req.body;

    const validationError = validateFields({ nombreUsuario, email, password, tipoUsuario });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await userModel.createUser(nombreUsuario, email, hashedPassword, tipoUsuario);
        const newUser = await userModel.getUserById(userId);
        res.json(newUser);
    } catch (err) {
        console.error('Error al crear el usuario:', err.message);
        res.status(500).send('Server error');
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const validationError = validateFields({ email, password });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const user = await userModel.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        res.json({ id: user.id, nombreUsuario: user.nombreUsuario });
    } catch (err) {
        console.error('Error al iniciar sesión:', err.message);
        res.status(500).send('Server error');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombreUsuario, email, password, tipoUsuario } = req.body;

    const validationError = validateFields({ id, nombreUsuario, email, password, tipoUsuario });
    if (validationError) {
        return res.status(400).json({ message: validationError });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.updateUser(id, nombreUsuario, email, hashedPassword, tipoUsuario);
        const updatedUser = await userModel.getUserById(id);
        res.json(updatedUser);
    } catch (err) {
        console.error('Error al actualizar el usuario:', err.message);
        res.status(500).send('Server error');
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'El ID del usuario no está definido.' });
    }

    try {
        await userModel.deleteUser(id);
        res.json({ message: 'Usuario eliminado' });
    } catch (err) {
        console.error('Error al eliminar el usuario:', err.message);
        res.status(500).send('Server error');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};
