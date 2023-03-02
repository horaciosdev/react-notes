import React from "react";

export default function Nota(props: any) {
  return (
    <div>
      <h2>{props.titulo}</h2>
      <p>{props.corpo}</p>
      <button onClick={props.onDelete}>Excluir</button>
    </div>
  );
}
