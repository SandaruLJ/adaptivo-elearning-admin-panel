import React from "react";
import Dashboard from "../Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

import "./Main.css";
import AddCourse from "../Add Course/AddCourse";
import AddQuestion from "../Add Question/AddQuestion";

import AllCourse from "../All Course/AllCourse";
import AddUser from "../Add User/AddUser";
import AllUsers from "../All Users/AllUsers";
import AllInstructors from "../AllInstructors/AllInstructors";
import AddInstructor from "../Add Instructor/AddInstructor";

import AddCategory from "../Add Category/AddCategory";
import AllCategory from "../AllCategory/AllCategory";
import AllConcept from "../All Concepts/AllConcepts";

const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
      <Route exact path="/add/courses" element={<AddCourse />}></Route>
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route path="/courses/edit/:id" element={<AddCourse edit={true} />}></Route>
      <Route exact path="/qna" element={<AddQuestion />}></Route>
      <Route exact path="/courses/add" element={<AddCourse />}></Route>
      <Route exact path="/users" element={<AllUsers />}></Route>
      <Route exact path="/users/add" element={<AddUser />}></Route>
      <Route exact path="/categories/add" element={<AddCategory />}></Route>
      <Route exact path="/categories" element={<AllCategory />}></Route>
      <Route exact path="/concepts" element={<AllConcept />}></Route>
      <Route exact path="/instructors" element={<AllInstructors />}></Route>
      <Route exact path="/instructors/add" element={<AddInstructor />}></Route>
    </Routes>
  );
};
export default Main;
