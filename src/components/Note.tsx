import { FaEdit, FaTrash } from "react-icons/fa";

export default function Note(props: any) {
  const { note } = props;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = new Date(note.date).toLocaleDateString("pt-br", options);
  const lastUpdate = new Date(note.lastUpdate).toLocaleDateString(
    "pt-br",
    options
  );
  return (
    <div
      className="flex flex-col justify-start items-center w-80 min-h-[15rem] p-4 rounded-xl gap-2 shadow-md shadow-gray-400"
      style={{ backgroundColor: note.color }}
    >
      <h1 className="font-semibold text-center text-xl">{note.title}</h1>
      <p className="mb-3">{note.text}</p>

      <div className="mt-auto">
        <p className="text-xs">
          <span className="font-bold mr-5">Created on:</span>
          <span className="float-right">{date}</span>
        </p>
        <p className="text-xs">
          <span className="font-bold mr-5">Last Updated:</span>
          <span className="float-right">{lastUpdate}</span>
        </p>
      </div>
      <div className="flex pt-2 border-t-2 w-full border-gray-300 justify-center items-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={() => props.onEdit(note.id)}
        >
          <FaEdit /> Edit
        </button>
        <button
          type="button"
          className="btn-danger"
          onClick={() => props.onDelete(note.id)}
        >
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
}
