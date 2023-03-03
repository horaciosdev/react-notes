export default function NewNoteForm(props: any) {
  const { title, setTitle } = props;
  const { text, setText } = props;

  return (
    <form className="flex flex-col max-w-xs w-96 shadow-md shadow-gray-800 justify-center item-center gap-4 bg-white mt-5 p-5 rounded-xl">
      <h1 className="text-center text-xl font-bold">New Note</h1>
      <label className="flex flex-col justify-center items-center">
        Title:
        <input
          className="input-primary"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label className="flex flex-col justify-center items-center">
        Text:
        <textarea
          className="textarea-primary h-40"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </label>
      <div className="flex justify-center items-center gap-3">
        <button
          className="btn-success w-40"
          type="submit"
          onClick={() => props.addNewNote()}
        >
          Add Note
        </button>

        <button
          className="btn-danger w-40"
          onClick={() => props.handleCancelNote()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
