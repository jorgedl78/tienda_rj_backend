const express = require('express');
const router = express.Router();
const tablasController = require('../controllers/tablasController');

// Endpoint para listar todas las tallas
router.get('/tallas', tablasController.listarTallas);

// Endpoint para listar todas los estados de prendas
router.get('/estados', tablasController.listarEstados);

// Endpoint para listar todas los tipos de prendas
router.get('/tipos', tablasController.listarTipos);

// Endpoint para listar todas las ubicaciones de prendas
router.get('/ubicaciones', tablasController.listarUbicaciones);


module.exports = router;