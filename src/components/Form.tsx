import { useState } from "react";
import { INote } from "../interfaces/INote";
import "../styles/Form.css";

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

export default function Formulario(props: any) {
  const [titulo, setTitulo] = useState("");
  const [corpo, setCorpo] = useState("");
  const [openModal, setOpenModal] = useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newNote: INote = {
      id: Date.now(),
      title: titulo,
      text: corpo,
      color: getRandomColor(),
    };

    props.addNote(newNote);

    setTitulo("");
    setCorpo("");
    setOpenModal(false);
  }

  const handleOpenModal = () => {
    openModal ? setOpenModal(false) : setOpenModal(true);
  };

  const handleCancelNote = () => {
    setTitulo("");
    setCorpo("");
    setOpenModal(false);
  };

  return (
    <>
      <button className="open-modal-button" onClick={() => handleOpenModal()}>
        +
      </button>
      {openModal && (
        <div className="overlay">
          <div className="modal">
            <form className="add-note-form" onSubmit={handleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </label>
              <label>
                Text:
                <textarea
                  value={corpo}
                  onChange={(e) => setCorpo(e.target.value)}
                />
              </label>
              <button className="add-note-button" type="submit">
                Add Note
              </button>
              <button
                className="cancel-button"
                onClick={() => handleCancelNote()}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
