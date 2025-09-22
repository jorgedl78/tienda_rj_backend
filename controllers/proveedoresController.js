const pool = require('../config/db');
const bcrypt = require('bcrypt');

const listarProveedores = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_proveedores()');
        // MySQL devuelve un array de arrays al usar CALL
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar proveedores:', error);
        res.status(500).json({ mensaje: 'Error al listar proveedores' });
    }
};

const crearProveedor = async (req, res) => {
    try {
        const { nombre, contacto, email, clave } = req.body;

        if (!nombre || !email || !clave) {
            return res.status(400).json({ mensaje: 'Nombre, email y clave son obligatorios' });
        }

        // Hashear la clave antes de guardar
        const saltRounds = 10;
        const claveHash = await bcrypt.hash(clave, saltRounds);

        // Llamar al procedimiento almacenado
        const [result] = await pool.query('CALL sp_insertar_proveedor(?, ?, ?, ?)', [
            nombre,
            contacto || null,
            email,
            claveHash
        ]);

        // result[0] contiene el ID del nuevo proveedor
        res.status(201).json({
            mensaje: 'Proveedor creado correctamente',
            id_proveedor: result[0][0].id_proveedor
        });
    } catch (error) {
        console.error('Error al crear proveedor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }
        res.status(500).json({ mensaje: 'Error al crear proveedor' });
    }
};

const actualizarProveedor = async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, contacto, email } = req.body;

        if (!nombre || !email) {
            return res.status(400).json({ mensaje: 'Nombre y email son obligatorios' });
        }

        // Llamamos al procedimiento almacenado
        await pool.query('CALL sp_actualizar_proveedor(?, ?, ?, ?)', [
            id,
            nombre,
            contacto || null,
            email
        ]);

        res.json({ mensaje: 'Proveedor actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar proveedor:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }
        res.status(500).json({ mensaje: 'Error al actualizar proveedor' });
    }
};

const cambiarClaveProveedor = async (req, res) => {
    try {
        const id = req.params.id;
        const { nuevaClave } = req.body;

        if (!nuevaClave || nuevaClave.length < 4) {
            return res.status(400).json({ mensaje: 'La nueva clave es obligatoria y debe tener al menos 4 caracteres' });
        }

        // Hashear la nueva clave
        const saltRounds = 10;
        const claveHash = await bcrypt.hash(nuevaClave, saltRounds);

        // Llamar al procedimiento almacenado
        await pool.query('CALL sp_actualizar_clave_proveedor(?, ?)', [
            id,
            claveHash   // solo actualizamos la clave
        ]);

        res.json({ mensaje: 'Clave actualizada correctamente' });
    } catch (error) {
        console.error('Error al cambiar la clave del proveedor:', error);
        res.status(500).json({ mensaje: 'Error al cambiar la clave' });
    }
};

module.exports = {
    listarProveedores,
    crearProveedor,
    actualizarProveedor,
    cambiarClaveProveedor
};


