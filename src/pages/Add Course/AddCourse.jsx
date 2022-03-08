import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "Add Course",
    link: "/courses/add",
  },
];
const AddCourse = () => {
  return (
    <>
      <TitleBar title="Create New Course" breadcrumbs={breadcrumbs} />
    </>
  );
};
export default AddCourse;
