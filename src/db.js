const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'proyectoWeb',
    password: 'root',
    port: 3306,
});

module.exports = pool;
