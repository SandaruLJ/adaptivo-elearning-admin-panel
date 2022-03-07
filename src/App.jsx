import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import NavBar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [collapsed, setCollapsed] = useState(false);
  console.log(isLoggedIn);

  // setState method wrappers to be passed to child components
  const onSetCollapsed = () => setCollapsed(!collapsed);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <div className="main">
            <Main />
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
