const pool = require('../config/db');


const listarTallas = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_tallas()');
        // MySQL devuelve un array de arrays al usar CALL
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar tallas:', error);
        res.status(500).json({ mensaje: 'Error al listar tallas' });
    }
};

const listarEstados = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_estados_prenda()');
        // MySQL devuelve un array de arrays al usar CALL
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar stados:', error);
        res.status(500).json({ mensaje: 'Error al listar estados' });
    }
};

const listarTipos = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_tipos_prenda()');
        // MySQL devuelve un array de arrays al usar CALL
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar los tipos de prenda:', error);
        res.status(500).json({ mensaje: 'Error al listar los tipos de prenda' });
    }
};

const listarUbicaciones = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_ubicaciones()');
        // MySQL devuelve un array de arrays al usar CALL
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar los tipos de prenda:', error);
        res.status(500).json({ mensaje: 'Error al listar los tipos de prenda' });
    }
};

module.exports = {
  listarTallas,
  listarEstados,
  listarTipos,
  listarUbicaciones
};