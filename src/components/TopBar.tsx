import {
  AppBar,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";

const FlexBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: 6,
}));

export default function TopBar(props: any) {
  const { search, setSearch } = props;

  const handleSearch = (searchInput: string) => {
    setSearch(searchInput);
    props.searchNotes(searchInput);
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: "5px",
        }}
      >
        <FlexBox>
          <IconButton
            aria-label="menu"
            sx={{
              bgcolor: "background.default",
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <MenuIcon />
          </IconButton>
        </FlexBox>
        <FlexBox sx={{ width: "100%", maxWidth: 400, ml: 1, mr: 1 }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ flex: 1 }}
              placeholder="Type to search..."
              inputProps={{ "aria-label": "Type to search..." }}
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton aria-label="search" size="small">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment onClick={() => setSearch("")} position="end">
                  <IconButton aria-label="search" size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </Paper>
        </FlexBox>

        <FlexBox>
          <IconButton
            onClick={() => props.handleOpenModal(search)}
            aria-label="add"
            size="medium"
            sx={{
              bgcolor: "background.default",
              "&:hover": { bgcolor: "background.paper" },
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
}
