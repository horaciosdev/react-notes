import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Note from "../components/Note";
import { INote } from "../interfaces/INote";
import NewNoteForm from "../components/NewNoteForm";
import EditNoteForm from "../components/EditNoteForm";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Typography,
} from "@mui/material";

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

  const handleCloseModal = () => {
    handleCancelNote();
  };

  const handleCancelNote = () => {
    setOpenModal(false);
    setEditingId(0);
    setTitle("");
    setText("");
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
    <Box>
      <TopBar
        search={search}
        setSearch={setSearch}
        addNote={addNewNote}
        searchNotes={searchNotes}
        handleOpenModal={handleOpenModal}
      />

      {search && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            p: "1rem",
            pt: "1rem",
            bgcolor: "text.secondary",
            borderRadius: 3,
            m: 1,
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center", mb: "1rem" }}>
            Search Results:
          </Typography>
          <ImageList
            variant="masonry"
            sx={{
              columnCount: {
                xs: "1 !important",
                sm: "2 !important",
                md: "3 !important",
                lg: "4 !important",
                xl: "5 !important",
              },
            }}
            gap={8}
          >
            {filteredNotes.map((note: INote) => (
              <ImageListItem key={note.id}>
                <Note
                  key={note.id}
                  note={note}
                  onDelete={() => onDeleteNote(note.id)}
                  onEdit={onEdit}
                />
              </ImageListItem>
            ))}
            {filteredNotes.length == 0 && <div>No Results</div>}
          </ImageList>
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          p: "1rem",
          pt: "1rem",
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: "1rem" }}>
          Notes:
        </Typography>
        <ImageList
          variant="masonry"
          sx={{
            columnCount: {
              xs: "1 !important",
              sm: "2 !important",
              md: "3 !important",
              lg: "4 !important",
              xl: "5 !important",
            },
          }}
          gap={8}
        >
          {notes.map((note: INote) => (
            <ImageListItem key={note.id}>
              <Note
                note={note}
                onDelete={() => onDeleteNote(note.id)}
                onEdit={onEdit}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Modal
        open={creatingNewNote}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <NewNoteForm
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          handleCancelNote={handleCancelNote}
          addNewNote={addNewNote}
        />
      </Modal>

      <Modal
        open={editingId != 0}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <EditNoteForm
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
          handleCancelNote={handleCancelNote}
          saveNote={saveNote}
        />
      </Modal>
    </Box>
  );
}
