const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('Backend de Tienda de Consignación funcionando!');
});

const proveedoresRoutes = require('./routes/proveedores');
app.use('/api/proveedores', proveedoresRoutes);

const prendasRoutes = require('./routes/prendas');
app.use('/api/prendas', prendasRoutes);

const tablasRoutes = require('./routes/tablas');
app.use('/api/tablas', tablasRoutes);

const authRouter = require('./routes/auth');
app.use('/api',authRouter);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
