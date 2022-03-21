import React from "react";
import NavBar from "../../components/Navbar/Navbar";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter as Router, Redirect, Route, Routes } from "react-router-dom";

import "./Main.css";
import AddCourse from "../Add Course/AddCourse";
<<<<<<< HEAD
import AddQuestion from "../Add Question/AddQuestion";

=======
import AllCourse from "../All Course/AllCourse";
>>>>>>> 21a06df94ce0a8bc2eca1ebb229278c32d24acb4
const Main = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />}></Route>
<<<<<<< HEAD
      <Route exact path="/courses" element={<AddCourse />}></Route>
      <Route exact path="/qna" element={<AddQuestion />}></Route>
=======
      <Route exact path="/courses" element={<AllCourse />}></Route>
      <Route exact path="/courses/add" element={<AddCourse />}></Route>
>>>>>>> 21a06df94ce0a8bc2eca1ebb229278c32d24acb4
    </Routes>
  );
};
export default Main;
