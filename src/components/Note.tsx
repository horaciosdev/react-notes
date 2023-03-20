import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Grow,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(props: any) {
  const { note } = props;
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const date = new Date(note.date).toLocaleDateString("pt-br", options);
  const lastUpdate = new Date(note.lastUpdate).toLocaleDateString(
    "pt-br",
    options
  );
  return (
    <Grow
      in={true}
      style={{ transformOrigin: "50% 50% 50%" }}
      {...(true ? { timeout: 1000 } : {})}
    >
      <Card
        elevation={4}
        sx={{
          maxWidth: "18rem",
          width: "100%",
          lineBreak: "anywhere",
        }}
      >
        <CardHeader
          title={<Typography variant="h6">{note.title}</Typography>}
          subheader={
            <Box>
              <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ fontSize: "12px" }}
                >
                  Created:
                </Typography>{" "}
                {date}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: "12px" }}>
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ fontSize: "12px" }}
                >
                  Updated:
                </Typography>{" "}
                {lastUpdate}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {note.text}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          <IconButton aria-label="edit" onClick={() => props.onEdit(note.id)}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => props.onDelete(note.id)}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
}
