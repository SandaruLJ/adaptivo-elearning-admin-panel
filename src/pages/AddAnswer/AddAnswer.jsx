import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddAnswer.css";
import { addAnswer } from "./AddAnswerService";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Answers",
    link: "/answer",
  },
  {
    name: "Add Course",
    link: "/answer/add",
  },
];

const inputs = [
 
  {
    label: "Answer",
    type: "text",
    name: "answer",
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

const AddAnswer = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    // let values = JSON.stringify(data);
    const response = addAnswer(data);
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
      <TitleBar title="Create New Answer" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </>
  );
};
export default addAnswer;
