import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddCourse.css";
import { addCourse } from "./AddCourseService";

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

const inputs = [
  {
    label: "First Name",
    type: "text",
    name: "fname",
  },
  {
    label: "Last Name",
    type: "text",
    name: "lname",
  },
];

const buttons = [
  {
    name: "Save ",
    color: "orange",
    type: "submit",
  },
  {
    name: "Cancel",
    color: "grey",
    type: "cancel",
  },
];
const url = `${process.env.REACT_APP_URL}/api/courses`;

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    let values = JSON.stringify(data);
    const response = addCourse(url, values);
    setIsLoading(false);
  }
  function cancel() {
    console.log("Cancel");
  }
  const tabs = [
    {
      label: "Basic Information",
      icon: <Assignment />,
      body: <Form inputs={inputs} callback={submitForm} callbackCancel={cancel} btns={buttons} singleColumn={true} isLoading={isLoading} />,
    },
    {
      label: "Advanced Information",
      icon: <Assignment />,
      body: <Form inputs={inputs} callback={submitForm} callbackCancel={cancel} btns={buttons} singleColumn={true} isLoading={isLoading} />,
    },
  ];
  return (
    <>
      <TitleBar title="Create New Course" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </>
  );
};
export default AddCourse;
