import { Box, IconButton, Link, Typography } from "@mui/material";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const developerName = "Horacio Schumann";

  return (
    <Box
      sx={{
        textAlign: "center",
        p: 2,
      }}
    >
      <Typography>
        {developerName} - {currentYear}
      </Typography>
      <Typography>
        Contato:{" "}
        <Link
          href="mailto:horacio.schumann@gmail.com"
          color="inherit"
          underline="hover"
        >
          horacio.schumann@gmail.com
        </Link>
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Link
          href="https://www.linkedin.com/in/horaciosdev"
          target="_blank"
          color="inherit"
        >
          <IconButton aria-label="delete" size="large" color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Link>
        <Link
          href="https://github.com/horaciosdev"
          target="_blank"
          underline="hover"
          color="inherit"
        >
          <IconButton aria-label="delete" size="large" color="inherit">
            <GitHubIcon />
          </IconButton>
        </Link>
      </Box>
      <Typography>
        Todos os direitos reservados © {currentYear} {developerName}
      </Typography>
    </Box>
  );
}
