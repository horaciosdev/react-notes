import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import Note from "../components/Note";
import { INote } from "../interfaces/INote";
import NewNoteForm from "../components/NewNoteForm";
import EditNoteForm from "../components/EditNoteForm";
import {
  Box,
  Divider,
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

      <Divider />

      {search && (
        <Box>
          <Typography
            variant="h5"
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              m: 1,
              mt: 2,
              pl: 4,
            }}
          >
            Search Results:
          </Typography>
          <Box
            sx={{
              bgcolor: "text.secondary",
              borderRadius: 3,
              mb: 1,
              ml: 1,
              mr: 1,
              pt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ImageList
                variant="masonry"
                sx={{
                  pb: 3,
                  pl: 3,
                  pr: 3,
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
              </ImageList>

              {filteredNotes.length == 0 && (
                <Typography color="black" sx={{ textAlign: "center" }}>
                  No Results
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      )}

      <Divider />

      <Box>
        {search && (
          <Typography
            variant="h5"
            sx={{
              bgcolor: "background.paper",
              borderRadius: 3,
              m: 1,
              mt: 2,
              pl: 4,
            }}
          >
            Notes:
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
            borderRadius: 3,
            pt: 2,
            ml: 1,
            mr: 1,
          }}
        >
          <ImageList
            variant="masonry"
            sx={{
              pb: 3,
              pl: 3,
              pr: 3,
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
