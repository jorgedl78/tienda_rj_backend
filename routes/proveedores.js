const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedoresController');
const verificarAdmin = require('../middlewares/verificarAdmin');

// Endpoint para listar todos los proveedores
router.get('/', proveedoresController.listarProveedores);

// Endpoint para crear un proveedor
router.post('/', verificarAdmin, proveedoresController.crearProveedor);

// Endpoint para actualizar un proveedor
router.put('/:id', verificarAdmin, proveedoresController.actualizarProveedor);

// Endpoint para cambiar la clave de un proveedor
router.put('/:id/cambiar-clave', proveedoresController.cambiarClaveProveedor);

module.exports = router;
