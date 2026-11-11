import TareaItem from './TareaItem';

function TareaList({ tareas, onCompletar, onEliminar }) {
  if (tareas.length === 0) {
    return <p className="vacio">No hay tareas todavia. Agrega la primera.</p>;
  }

  return (
    <ul className="tarea-list">
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          onCompletar={onCompletar}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}

export default TareaList;
