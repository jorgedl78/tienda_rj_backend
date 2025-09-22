const mysql = require('mysql2/promise');
require('dotenv').config();

// Si no se define DB_PORT, usamos 3306 por defecto (para MySQL local)
const dbPort = process.env.DB_PORT || 3306;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',    // localhost por defecto
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mi_base_local',
    port: dbPort,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 20000,
    ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : undefined
});

module.exports = pool;

