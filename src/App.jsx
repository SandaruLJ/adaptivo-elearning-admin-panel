import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";
import { Button, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import Main from "./pages/Main/Main";
import NavBar from "./components/Navbar/Navbar";
import { useSelector } from "react-redux";
import TopBar from "./components/TopBar/TopBar";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <TopBar />
          <div className="main">
            <Main />
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
