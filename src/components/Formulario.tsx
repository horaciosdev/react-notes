import React, { useState } from "react";

export default function Formulario(props: any) {
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    props.onSubmit({
      titulo: titulo,
      corpo: corpo,
    });
    setTitulo("");
    setCorpo("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Título:
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>
      <br />
      <label>
        Corpo:
        <textarea value={corpo} onChange={(e) => setCorpo(e.target.value)} />
      </label>
      <br />
      <button type="submit">Adicionar Nota</button>
    </form>
  );
}
