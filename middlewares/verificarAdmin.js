// middlewares/verificarAdmin.js
const verificarAdmin = (req, res, next) => {
  const { rol } = req.body; // por ahora tomamos el rol desde el body

  if (!rol) {
    return res.status(400).json({ mensaje: 'No se recibió el rol del usuario' });
  }

  if (rol !== 'administrador') {
    return res.status(403).json({ mensaje: 'Acceso denegado: se requiere rol administrador' });
  }

  // Si todo está bien, continúa al endpoint
  next();
};

module.exports = verificarAdmin;
