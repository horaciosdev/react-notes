import { useEffect, useState } from "react";
import Form from "../components/Form";
import Note from "../components/Note";
import { INote } from "../interfaces/INote";

export default function NotesApp() {
  const [notes, setNotes] = useState<INote[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<INote[]>([]);
  const [contentLoaded, setContentLoaded] = useState(false);

  const addNote = (newNote: INote) => {
    const newNotes = [newNote, ...notes];
    setNotes(newNotes);
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
    <div className="bg-blue-100 min-h-screen">
      <Form addNote={addNote} searchNotes={searchNotes} />
      <div className="p-2 w-full flex justify-center items-start gap-4 flex-wrap">
        {filteredNotes
          ? filteredNotes.map((note: INote) => (
              <Note
                key={note.id}
                note={note}
                onDelete={() => onDeleteNote(note.id)}
              />
            ))
          : notes.map((note: INote) => (
              <Note
                key={note.id}
                note={note}
                onDelete={() => onDeleteNote(note.id)}
              />
            ))}
      </div>
    </div>
  );
}
