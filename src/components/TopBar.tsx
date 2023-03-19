import {
  AppBar,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
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
    <AppBar position="static">
      <Toolbar
        variant="dense"
        sx={{ display: "flex", justifyContent: "space-between", p: "5px" }}
      >
        <FlexBox>
          <IconButton sx={{ p: "10px" }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <StickyNote2Icon
            sx={{
              bgcolor: "white",
              borderRadius: "50%",
              padding: "5px",
              color: "rgb(59 130 246)",
              width: 45,
              height: 45,
              margin: "5px",
            }}
          />
          <Typography
            variant="h4"
            color="inherit"
            fontWeight={700}
            component="div"
          >
            Notes
          </Typography>
        </FlexBox>
        <FlexBox>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
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
            />
          </Paper>
        </FlexBox>
        <FlexBox>
          <IconButton
            onClick={() => props.handleOpenModal(search)}
            aria-label="add"
            size="medium"
            sx={{
              bgcolor: "background.paper",
            }}
          >
            <AddIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="medium"
            sx={{
              bgcolor: "background.paper",
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </FlexBox>
      </Toolbar>
    </AppBar>
  );
}
