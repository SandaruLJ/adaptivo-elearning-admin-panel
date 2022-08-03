import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddInstructor.css";
import { addInstructor } from "../../service/instructor.service";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Instructors",
    link: "/instructors",
  },
  {
    name: "Add Instructor",
    link: "/instructors/add",
  },
];

const personalInputs = [
  {
    label: "First Name",
    type: "text",
    name: "firstname"
  },
  {
    label: "Last Name",
    type: "text",
    name: "lastname"
  },
  {
    label: "Email",
    type: "text",
    name: "email"
  },
  {
    label: "Phone",
    type: "text",
    name: "phone"
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "dob"
  }
]

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

const AddInstructor = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    // let values = JSON.stringify(data);
    const response = addInstructor(data);
    setIsLoading(false);
  }
  function cancel() {
    console.log("Cancel");
  }
  const tabs = [
    {
      label: "Personal Information",
      icon: <Assignment />,
      body: <Form inputs={personalInputs} callback={submitForm} callbackCancel={cancel} btns={buttons} isLoading={isLoading} />,
    }
  ];
  return (
    <>
      <TitleBar title="Create New Instructor" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </>
  );
};
export default AddInstructor;
