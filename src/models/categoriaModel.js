const db = require('../db');

const getAllCategorias = async () => {
    try {
        const [results] = await db.query('SELECT * FROM categoria');
        return results;
    } catch (err) {
        throw err;
    }
};

module.exports = {
    getAllCategorias
};
