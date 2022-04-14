import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddQuestion.css";
import { addQuestion } from "./AddQuestionService";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Questions",
    link: "/questions",
  },
  {
    name: "Add Question",
    link: "/questions/add",
  },
];

const inputs = [
 
  {
    label: "Question",
    type: "text",
    name: "question",
  },

  {
    label: "Answers",
    type: "String",
    name: "answers",
  },
  {
    label: "Correct Answer",
    type: "String",
    name: "correctAnswer",
  },
  {
    label: "LO id",
    type: "number",
    name: "LO_id",
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

const AddQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    // let values = JSON.stringify(data);
    const response = addQuestion(data);
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
      <TitleBar title="Create New Question" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </>
  );
};
export default AddQuestion;
