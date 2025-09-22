const express = require('express');
const router = express.Router();
const prendasController = require('../controllers/prendasController');

// Endpoint para listar todas las prendas
router.get('/', prendasController.listarPrendas);

// Crear una nueva prenda
router.post('/', prendasController.crearPrenda);

// Actualizar una prenda
router.put('/:id', prendasController.actualizarPrenda);

// Eliminar una prenda
router.delete('/:id', prendasController.eliminarPrenda);

module.exports = router;
