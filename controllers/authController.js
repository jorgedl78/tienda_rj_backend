const pool = require('../config/db');

const loginUsuario = async (req, res) => {
  const { email, clave } = req.body;

  

  if (!email || !clave) {
    return res.status(400).json({ mensaje: 'Faltan email o clave' });
  }

  try {
    const [rows] = await pool.query('CALL sp_login_usuario(?, ?)', [email, clave]);

    const usuario = rows[0][0];

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Email o clave incorrectos' });
    }

    res.json({
      mensaje: 'Login exitoso',
      usuario: {
        id: usuario.id_usuario,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ mensaje: 'Error en login' });
  }
};

module.exports = {
  loginUsuario
};
