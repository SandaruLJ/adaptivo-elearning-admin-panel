import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#ADADAD",
      main: "#fff",
      dark: "#000",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default theme;
