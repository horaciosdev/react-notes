import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Note from "../components/Note";
import { INote } from "../interfaces/INote";
import NewNoteForm from "../components/NewNoteForm";
import EditNoteForm from "../components/EditNoteForm";

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 90%)";
}

export default function NotesApp() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [creatingNewNote, setOpenModal] = useState(false);
  const [editingId, setEditingId] = useState(0);

  const addNewNote = () => {
    const newNote: INote = {
      id: Date.now(),
      date: Date.now(),
      lastUpdate: Date.now(),
      title: title,
      text: text,
      color: getRandomColor(),
    };

    const newNotes = [newNote, ...notes];
    setNotes(newNotes);

    setTitle("");
    setText("");
    setSearch("");
    setOpenModal(false);
  };

  const saveNote = () => {
    const editedNotes = notes.map((note) => {
      if (note.id == editingId) {
        return { ...note, title: title, text: text, lastUpdate: Date.now() };
      }
      return note;
    });

    setEditingId(0);
    setNotes(editedNotes);

    setTitle("");
    setText("");
    setSearch("");
  };

  const onDeleteNote = (noteId: number) => {
    const newNote = notes.filter((note) => note.id != noteId);
    setNotes(newNote);
  };

  const searchNotes = (searchInput: string) => {
    const fNotes = notes.filter(
      (note) =>
        note.title
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase()) ||
        note.text.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
    );
    setFilteredNotes(fNotes);
  };

  const handleOpenModal = (searchTerm: string) => {
    creatingNewNote ? setOpenModal(false) : setOpenModal(true);
    if (searchTerm) {
      setTitle(searchTerm);
    }
  };

  const handleCancelNote = () => {
    setTitle("");
    setText("");
    setOpenModal(false);
  };

  const onEdit = (noteId: number) => {
    setEditingId(noteId);

    const noteToEdit = notes.find((note) => note.id == noteId);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setText(noteToEdit.text);
    }
  };

  useEffect(() => {
    const loadedNotes = JSON.parse(
      window.localStorage.getItem("notes") || "[]"
    );
    setNotes(loadedNotes);
    setContentLoaded(true);
  }, []);

  useEffect(() => {
    searchNotes("");
    if (contentLoaded) {
      window.localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  return (
    <>
      <main>
        <TopBar
          search={search}
          setSearch={setSearch}
          addNote={addNewNote}
          searchNotes={searchNotes}
          handleOpenModal={handleOpenModal}
        />
        {search && (
          <div className="pb-2 border-b-2 border-gray-800 w-full flex flex-col justify-center items-center gap-2 flex-wrap">
            <h1 className="text-2xl">Search Result:</h1>
            <div className="flex justify-center items-center w-full bg-gray-100 p-4 rounded-xl shadow-md gap-4">
              {filteredNotes.map((note: INote) => (
                <Note
                  key={note.id}
                  note={note}
                  onDelete={() => onDeleteNote(note.id)}
                  onEdit={onEdit}
                />
              ))}
              {filteredNotes.length == 0 && <div>No Results</div>}
            </div>
          </div>
        )}
        <div className="p-2 w-full flex justify-center items-start gap-4 flex-wrap">
          {notes.map((note: INote) => (
            <Note
              key={note.id}
              note={note}
              onDelete={() => onDeleteNote(note.id)}
              onEdit={onEdit}
            />
          ))}
        </div>

        {creatingNewNote && (
          <div className="z-10 fixed min-h-full min-w-full inset-0 bg-gray-800/[.8] flex justify-center items-start">
            <NewNoteForm
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              handleCancelNote={handleCancelNote}
              addNewNote={addNewNote}
            />
          </div>
        )}

        {editingId != 0 && (
          <div className="z-10 fixed min-h-full min-w-full inset-0 bg-gray-800/[.8] flex justify-center items-start">
            <EditNoteForm
              title={title}
              setTitle={setTitle}
              text={text}
              setText={setText}
              handleCancelNote={handleCancelNote}
              saveNote={saveNote}
            />
          </div>
        )}
      </main>
    </>
  );
}
