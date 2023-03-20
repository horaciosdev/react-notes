import {
  Box,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EditNoteForm(props: any) {
  const { title, setTitle } = props;
  const { text, setText } = props;

  return (
    <Box
      bgcolor={"background.default"}
      color={"text.primary"}
      sx={{
        display: "flex",
        flexDirection: "column",
        mt: 4,
        gap: 2,
        p: 3,
        borderRadius: 2,
        boxShadow: "0px 2px 5px 1px #222",
        maxWidth: "300px",
        width: "100%",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", fontWeight: "500" }}>
        Edit Note
      </Typography>
      <FormControl>
        <InputLabel htmlFor="note-title">Title</InputLabel>
        <OutlinedInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="note-title"
          placeholder="Change the title"
          label="Name"
        />
      </FormControl>
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        label="Note"
        multiline
        rows={6}
        placeholder="Edit your note"
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
        }}
      >
        <Button
          onClick={() => props.saveNote()}
          variant="outlined"
          color="success"
          startIcon={<CheckIcon />}
        >
          Save
        </Button>
        <Button
          onClick={() => props.handleCancelNote()}
          variant="outlined"
          color="error"
          endIcon={<CancelIcon />}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
