import "../styles/Note.css";

export default function Note(props: any) {
  return (
    <div className="note" style={{ backgroundColor: props.color }}>
      <h2>{props.title}</h2>

      <p>{props.text}</p>

      <button onClick={props.onDelete}>Delete</button>
    </div>
  );
}
