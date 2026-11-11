import { useEffect, useState } from 'react';
import TareaForm from './components/TareaForm';
import TareaList from './components/TareaList';
import { obtenerTareas, crearTarea, actualizarTarea, eliminarTarea } from './services/api';
import './App.css';

function App() {
  const [tareas, setTareas] = useState([]);

  const cargarTareas = async () => {
    const respuesta = await obtenerTareas();
    setTareas(respuesta.data);
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const manejarCrear = async (nuevaTarea) => {
    await crearTarea(nuevaTarea);
    cargarTareas();
  };

  const manejarCompletar = async (tarea) => {
    await actualizarTarea(tarea.id, { ...tarea, completada: !tarea.completada });
    cargarTareas();
  };

  const manejarEliminar = async (id) => {
    await eliminarTarea(id);
    cargarTareas();
  };

  return (
    <div className="app">
      <h1>Gestor de Tareas</h1>
      <TareaForm onCrear={manejarCrear} />
      <TareaList
        tareas={tareas}
        onCompletar={manejarCompletar}
        onEliminar={manejarEliminar}
      />
    </div>
  );
}

export default App;
