import { useState } from "react";
import Formulario from "../components/Form";
import List from "../components/List";
import { INote } from "../interfaces/INote";

export default function NotesApp() {
  const [notes, setNotes] = useState<INote[]>([]);

  const addNote = (newNote: INote) => {
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const onDeleteNote = (noteId: number) => {
    const newNote = notes.filter((note) => note.id != noteId);
    setNotes(newNote);
  };

  return (
    <>
      <Formulario addNote={addNote} />
      <List notas={notes} onDeleteNote={onDeleteNote} />
    </>
  );
}
