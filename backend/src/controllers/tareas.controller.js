const pool = require('../db');
  
const getTareas = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM tareas ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las tareas' });
  }
};
  
const crearTarea = async (req, res) => {
  const { titulo, descripcion } = req.body;
  if (!titulo) {
    return res.status(400).json({ mensaje: 'El titulo es obligatorio' });
  }
  try {
    const resultado = await pool.query(
      'INSERT INTO tareas (titulo, descripcion) VALUES ($1, $2) RETURNING *',
      [titulo, descripcion]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la tarea' });
  }
};
  
const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, completada } = req.body;
  try {
    const resultado = await pool.query(
      'UPDATE tareas SET titulo = $1, descripcion = $2, completada = $3 WHERE id = $4 RETURNING *',
     [titulo, descripcion, completada, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar la tarea' });
  }
};
  
const eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar la tarea' });
  }
};
  
module.exports = { getTareas, crearTarea, actualizarTarea, eliminarTarea };