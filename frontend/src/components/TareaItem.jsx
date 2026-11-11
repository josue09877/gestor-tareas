function TareaItem({ tarea, onCompletar, onEliminar }) {
  return (
    <li className={`tarea-item ${tarea.completada ? 'completada' : ''}`}>
      <div onClick={() => onCompletar(tarea)}>
        <strong>{tarea.titulo}</strong>
        {tarea.descripcion && <p>{tarea.descripcion}</p>}
      </div>
      <button onClick={() => onEliminar(tarea.id)}>Eliminar</button>
    </li>
  );
}

export default TareaItem;
