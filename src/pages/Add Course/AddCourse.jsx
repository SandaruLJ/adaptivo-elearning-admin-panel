import { Assignment, FileUpload, UploadFile } from "@mui/icons-material";
import { Button, Grid, Input } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { courseActions } from "../../store/course-slice";
import AllConcept from "../All Concepts/AllConcepts";
import PublishCourse from "./components/PublishCourse";
import { useFetch } from "../../components/useFetch";
import { getAllCategory } from "../../service/category.service";

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

const buttons = [
  {
    name: "Next",
    color: "orange",
    type: "submit",
  },
  {
    name: "Cancel",
    color: "grey",
    type: "cancel",
  },
];
const categories = [];

const AddCourse = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const tabRef = useRef();
  const course = useSelector((state) => state.course);
  const { loading, data } = useFetch(getAllCategory);

  function submitForm(data) {
    // setIsLoading(true);
    // const response = addCourse(data);
    // setIsLoading(false);

    tabRef.current.setValue(1);
  }

  useEffect(() => {
    data &&
      data.map((category, i) => {
        categories.push({
          value: category._id,
          label: category.title,
        });
      });
  }, [data]);

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
      type: "select",
      name: "category",
      placeholder: "Select a Category",
      singleColumn: true,
      values: categories,
    },
    {
      label: "Sub Category",
      type: "select",
      name: "subCategory",
      placeholder: "Select a Sub Category",
      singleColumn: true,
      values: categories,
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
  function cancel() {
    console.log("Cancel");
  }

  function setBasicValues(key, value) {
    dispatch(courseActions.setValue({ key: key, value: value }));
    console.log("In Basic Value");
  }
  const handleTabChange = (value) => {
    tabRef.current.setValue(value);
  };
  const tabs = [
    {
      label: "Basic Information",
      icon: <Assignment />,
      body: <Form inputs={inputs} callback={submitForm} callbackCancel={cancel} btns={buttons} singleColumn={true} isLoading={isLoading} reduxDispatch={setBasicValues} state={course} />,
    },
    {
      label: "Advanced Information",
      icon: <Assignment />,
      body: <CourseAdvancedInformation changeTab={handleTabChange} />,
    },
    {
      label: "Curriculum",
      icon: <Assignment />,
      body: <Curriculum changeTab={handleTabChange} />,
    },
    {
      label: "Publish Course",
      icon: <Assignment />,
      // body: <AddConcept />,
      body: <PublishCourse changeTab={handleTabChange} />,
    },
    {
      label: "Concept",
      icon: <Assignment />,
      // body: <AddConcept />,
      body: <AllConcept />,
    },
  ];

  return (
    <div className="add-course">
      <TitleBar title="Create New Course" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} ref={tabRef} />
    </div>
  );
};
export default AddCourse;
