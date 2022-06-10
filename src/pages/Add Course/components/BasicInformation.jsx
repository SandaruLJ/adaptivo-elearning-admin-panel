import React, { useEffect, useRef, useState } from "react";
import { useFetch } from "../../../components/useFetch";
import { getAllCategory } from "../../../service/category.service";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../../components/Form/Form";
import { courseActions } from "../../../store/course-slice";
import { CircularProgress } from "@mui/material";
import "../AddCourse.css";

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
];
const categories = [];

const BasicInformation = (props) => {
  const { loading, data } = useFetch(getAllCategory);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const errors = useSelector((state) => state.course.errors.basic);

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
      required: true,
    },
    {
      label: "Sub Title",
      type: "text",
      name: "subtitle",
      placeholder: "Your Course Subtitle",
      required: false,
    },
    {
      label: "Course Category",
      type: "select",
      name: "category",
      placeholder: "Select a Category",
      singleColumn: true,
      values: categories,
      required: true,
    },
    {
      label: "Sub Category",
      type: "select",
      name: "subCategory",
      placeholder: "Select a Sub Category",
      singleColumn: true,
      values: categories,
      required: true,
    },
    {
      label: "Course Language",
      type: "select",
      name: "language",
      placeholder: "Select a Course Language",
      values: languages,
      singleColumn: true,
      required: true,
    },
    {
      label: "Level",
      type: "select",
      name: "level",
      placeholder: "Select a level",
      values: levels,
      singleColumn: true,
      required: true,
    },
  ];

  function setBasicValues(key, value) {
    dispatch(courseActions.setValue({ key: key, value: value }));
    console.log("In Basic Value");
  }

  return (
    <div>
      {props.isLoading ? (
        <div className="progress">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <Form inputs={inputs} callback={() => props.changeTab(1)} btns={buttons} singleColumn={true} isLoading={loading} reduxDispatch={setBasicValues} state={course} errors={errors} />
      )}
    </div>
  );
};
export default BasicInformation;
