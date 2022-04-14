import { Assignment, FileUpload, UploadFile } from "@mui/icons-material";
import { Button, Grid, Input } from "@mui/material";
import React, { useState } from "react";
import CustomButton from "../../components/Button/CustomButton";
import Form from "../../components/Form/Form";
import Select from "../../components/Select/SelectBox";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import { addCourse } from "../../service/course.service";
import "./AddCourse.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CourseAdvancedInformation from "./components/CourseAdvancedInformation";
import Curriculum from "./components/Curriculum";
import AddConcept from "./components/Concept";

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

const languages = [
  {
    value: "english",
    label: "English",
  },
  {
    value: "sinhala",
    label: "Sinhala",
  },
  {
    value: "tamil",
    label: "Tamil",
  },
];

const levels = [
  {
    value: "basic",
    label: "Basic",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "advanced",
    label: "Advanced",
  },
];

const inputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Your Course Title",
  },
  {
    label: "Sub Title",
    type: "text",
    name: "subtitle",
    placeholder: "Your Course Subtitle",
  },
  {
    label: "Course Category",
    type: "text",
    name: "category",
    placeholder: "Select a Category",
    singleColumn: true,
  },
  {
    label: "Sub Category",
    type: "text",
    name: "subcategory",
    placeholder: "Select a Sub Category",
    singleColumn: true,
  },
  {
    label: "Course Language",
    type: "select",
    name: "language",
    placeholder: "Select a Course Language",
    values: languages,
    singleColumn: true,
  },
  {
    label: "Level",
    type: "select",
    name: "level",
    placeholder: "Select a level",
    values: levels,
    singleColumn: true,
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

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    const response = addCourse(data);
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
      body: <CourseAdvancedInformation />,
    },
    {
      label: "Curriculum",
      icon: <Assignment />,
      body: <Curriculum />,
    },
    {
      label: "Concept",
      icon: <Assignment />,
      body: <AddConcept />,
    },
  ];

  return (
    <div className="add-course">
      <TitleBar title="Create New Course" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </div>
  );
};
export default AddCourse;
