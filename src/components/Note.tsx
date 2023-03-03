export default function Note(props: any) {
  return (
    <div
      className="flex flex-col justify-start items-center w-80 min-h-[15rem] p-4 rounded-xl gap-2 shadow-md shadow-gray-400"
      style={{ backgroundColor: props.color }}
    >
      <h2 className="font-semibold text-center text-xl mb-3">{props.title}</h2>
      <p className="mb-3">{props.text}</p>

      <div className="flex mt-auto pt-2 border-t-2 w-full border-gray-300 justify-center items-center gap-3">
        <button type="button" className="btn-danger" onClick={props.onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
