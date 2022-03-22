import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

import "./Main.css";
import AddCourse from "../Add Course/AddCourse";
import AddQuestion from "../Add Question/AddQuestion";

import AllCourse from "../All Course/AllCourse";
import AddUser from "../Add User/AddUser";
import AllUsers from "../All Users/AllUsers";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route exact path="/courses" element={<AddCourse />}></Route>
      <Route exact path="/qna" element={<AddQuestion />}></Route>
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route exact path="/courses/add" element={<AddCourse />}></Route>
      <Route exact path="/users" element={<AllUsers />}></Route>
      <Route exact path="/users/add" element={<AddUser />}></Route>
    </Routes>
  );
};
export default Main;
