import { useState } from 'react';

function TareaForm({ onCrear }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onCrear({ titulo, descripcion });
    setTitulo('');
    setDescripcion('');
  };

  return (
    <form className="tarea-form" onSubmit={manejarEnvio}>
      <input
        type="text"
        placeholder="Titulo de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripcion (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TareaForm;
