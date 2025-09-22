const pool = require('../config/db');

const listarPrendas = async (req, res) => {
    try {
        // Llamamos al procedimiento almacenado
        const [rows] = await pool.query('CALL sp_listar_prendas()');
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al listar prendas:', error);
        res.status(500).json({ mensaje: 'Error al listar prendas' });
    }
};

const crearPrenda = async (req, res) => {
  try {

    //console.log(req.body);

    const {
      descripcion,
      talla,        // opcional
      idProveedor,
      idTipo,
      idEstado,
      precio_sugerido,
      disponible,    // opcional (true por defecto)
      idUbicacion
    } = req.body;

    // Validaciones mínimas
    if (!descripcion || !idProveedor || !idTipo || !idEstado || !idUbicacion || (precio_sugerido === undefined || precio_sugerido === null)) {
      console.log('Faltan campos obligatorios: descripcion, idProveedor, idTipo, idEstado, precio');
      return res.status(400).json({ mensaje: 'Faltan campos obligatorios: descripcion, idProveedor, idTipo, idEstado, precio' });
    }

    // normalizo valores
    const tallaVal = talla || null;
    const disponibleVal = typeof disponible === 'boolean' ? disponible : true;
    const precioVal = Number(precio_sugerido);
    if (Number.isNaN(precioVal)) {
      return res.status(400).json({ mensaje: 'El campo precio debe ser numérico' });
    }

    // Llamada AL SP correcto y con el orden de parámetros que definimos:
    // sp_insertar_prenda(
    //   IN p_descripcion,
    //   IN p_talla,
    //   IN p_precio,
    //   IN p_disponible,
    //   IN p_id_proveedor,
    //   IN p_id_estado,
    //   IN p_id_tipo,
    //   IN p_id_ubicacion
    // )

    const [result] = await pool.query(
      'CALL sp_insertar_prenda(?, ?, ?, ?, ?, ?, ?, ?)',
      [descripcion, tallaVal, precioVal, disponibleVal, idProveedor, idEstado, idTipo, idUbicacion]
    );

    // El SP devuelve LAST_INSERT_ID() => result[0][0].id_prenda
    const idPrenda = result?.[0]?.[0]?.id_prenda ?? null;

    /*return res.status(201).json({
      mensaje: 'Prenda creada correctamente',
      id_prenda: idPrenda
    });*/

    res.json(result[0][0]); 

  } catch (error) {
    console.error('Error al crear prenda:', error);

    // Manejo simple de FK faltante
    if (error && (error.code === 'ER_NO_REFERENCED_ROW_2' || error.code === 'ER_NO_REFERENCED_ROW')) {
      return res.status(400).json({ mensaje: 'Proveedor, tipo o estado referenciados no existen' });
    }

    return res.status(500).json({ mensaje: 'Error al crear prenda' });
  }
};

// Actualizar prenda
const actualizarPrenda = async (req, res) => {
  const { id } = req.params;
  //console.log(req.body);
  const { descripcion, talla, idEstado, idTipo, idProveedor, precio_sugerido, idUbicacion } = req.body;

  try {
    const [result] = await pool.query(
      "CALL sp_actualizar_prenda(?, ?, ?, ?, ?, ?, ?, ?)",
      [id, descripcion, talla, precio_sugerido, idProveedor, idEstado, idTipo, idUbicacion]
    );
      // result[0] contiene las filas devueltas por el SELECT dentro del SP
    res.json(result[0]);
  } catch (error) {
    console.error("Error al actualizar prenda:", error);
    res.status(500).json({ error: "Error al actualizar prenda" });
  }
};


// Eliminar prenda
const eliminarPrenda = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("CALL sp_eliminar_prenda(?)", [id]);
    res.json({ message: "Prenda eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar prenda:", error);
    res.status(500).json({ error: "Error al eliminar prenda" });
  }
};


module.exports = {
  listarPrendas,
  crearPrenda,
  actualizarPrenda,
  eliminarPrenda
};
