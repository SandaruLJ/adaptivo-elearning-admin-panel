import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import AddCourse from "../Add Course/AddCourse";
import AddCategory from "../Add Category/AddCategory";
const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route exact path="/courses" element={<AddCourse />}></Route>
        <Route exact path="/categories" element={<AddCategory />}></Route>
    </Routes>
  );
};
export default Main;
