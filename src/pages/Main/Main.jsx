import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
    </Routes>
  );
};
export default Main;
