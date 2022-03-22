import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import AddCourse from "../Add Course/AddCourse";
import AllCourse from "../All Course/AllCourse";
import AddUser from "../Add User/AddUser";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route exact path="/courses/add" element={<AddCourse />}></Route>
      <Route exact path="/users" element={<AddUser />}></Route>
    </Routes>
  );
};
export default Main;
