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
      main: "#FF9E43",
      dark: "#ba000d",
      contrastText: "#000",
    },
    tertiary: {
      light: "#fff",
      main: "#000",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

export default theme;
