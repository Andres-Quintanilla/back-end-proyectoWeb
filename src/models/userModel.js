const pool = require('../db');

const getAllUsers = async () => {
    const [rows] = await pool.execute('SELECT * FROM usuarios');
    return rows;
};

const getUserById = async (id) => {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0];
};

const createUser = async (nombreUsuario, email, hashedPassword, tipoUsuario) => {
    const [result] = await pool.execute(
        'INSERT INTO usuarios (nombreUsuario, email, password, tipoUsuario) VALUES (?, ?, ?, ?)', 
        [nombreUsuario, email, hashedPassword, tipoUsuario]
    );
    return result.insertId;
};

const getUserByEmail = async (email) => {
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
};

const updateUser = async (id, nombreUsuario, email, hashedPassword, tipoUsuario) => {
    await pool.execute(
        'UPDATE usuarios SET nombreUsuario = ?, email = ?, password = ?, tipoUsuario = ? WHERE id = ?', 
        [nombreUsuario, email, hashedPassword, tipoUsuario, id]
    );
};

const deleteUser = async (id) => {
    await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    getUserByEmail,
    updateUser,
    deleteUser
};
