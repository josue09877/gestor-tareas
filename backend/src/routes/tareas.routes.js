const { Router } = require('express');
const router = Router();
const {
  getTareas,
  crearTarea,
  actualizarTarea,
  eliminarTarea,
} = require('../controllers/tareas.controller');
 
router.get('/tareas', getTareas);
router.post('/tareas', crearTarea);
router.put('/tareas/:id', actualizarTarea);
router.delete('/tareas/:id', eliminarTarea);
 
module.exports = router;
