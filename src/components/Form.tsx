import { useState } from "react";
import { INote } from "../interfaces/INote";

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

export default function Form(props: any) {
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newNote: INote = {
      id: Date.now(),
      date: Date.now(),
      lastUpdate: Date.now(),
      title: titulo,
      text: corpo,
      color: getRandomColor(),
    };

    props.addNote(newNote);

    setTitulo("");
    setCorpo("");
    setSearch("");
    setOpenModal(false);
  }

  const handleSearch = (searchInput: string) => {
    setSearch(searchInput);
    props.searchNotes(searchInput);
  };

  const handleOpenModal = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
    if (search) {
      setTitulo(search);
    }
  };

  const handleCancelNote = () => {
    setTitulo("");
    setCorpo("");
    setOpenModal(false);
  };
  return (
    <>
      <div className="flex justify-center space-x-2 p-5">
        <label className="flex flex-col justify-center items-center">
          <input
            className="input-primary"
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn-success"
          onClick={() => handleOpenModal()}
        >
          Add Note
        </button>
      </div>
      {openModal && (
        <div className="z-10 fixed min-h-full min-w-full inset-0 bg-gray-800/[.8] flex justify-center items-start">
          <form
            className="flex flex-col max-w-xs w-96 shadow-md shadow-gray-800 justify-center item-center gap-4 bg-white mt-5 p-5 rounded-xl"
            onSubmit={handleSubmit}
          >
            <label className="flex flex-col justify-center items-center">
              Title:
              <input
                className="input-primary"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>
            <label className="flex flex-col justify-center items-center">
              Text:
              <textarea
                className="textarea-primary h-40"
                value={corpo}
                onChange={(e) => setCorpo(e.target.value)}
              />
            </label>
            <div className="flex justify-center items-center gap-3">
              <button className="btn-success w-40" type="submit">
                Add Note
              </button>
              <button
                className="btn-danger w-40"
                onClick={() => handleCancelNote()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
