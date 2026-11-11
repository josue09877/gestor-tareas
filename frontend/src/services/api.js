import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

export const obtenerTareas = () => api.get('/tareas');
export const crearTarea = (tarea) => api.post('/tareas', tarea);
export const actualizarTarea = (id, tarea) => api.put(`/tareas/${id}`, tarea);
export const eliminarTarea = (id) => api.delete(`/tareas/${id}`);

export default api;
