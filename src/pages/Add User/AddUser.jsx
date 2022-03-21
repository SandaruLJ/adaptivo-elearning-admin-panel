import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddUser.css";
import { addUser } from "../../service/user.service";

const breadcrumbs = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "Add User",
    link: "/users/add",
  },
];

const basicInputs = [
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
  },
  {
    label: "Preferred Language",
    type: "text",
    name: "preferredLanguage"
  },
  {
    label: "Is a School Student",
    type: "radio",
    name: "isSchoolStudent",
    options: [
      { value: true, label: "Yes" },
      { value: false, label: "No" }
    ],
    defaultValue: false,
    singleColumn: true
  },
];

const schoolInputs = [
  {
    label: "Grade",
    type: "number",
    name: "grade"
  },
  {
    label: "School",
    type: "text",
    name: "school"
  }
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

const AddUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    // let values = JSON.stringify(data);
    const response = addUser(data);
    setIsLoading(false);
  }
  function cancel() {
    console.log("Cancel");
  }
  const tabs = [
    {
      label: "Personal Information",
      icon: <Assignment />,
      body: <Form inputs={basicInputs} callback={submitForm} callbackCancel={cancel} btns={buttons} isLoading={isLoading} />,
    },
    {
      label: "School Information",
      icon: <Assignment />,
      body: <Form inputs={schoolInputs} callback={submitForm} callbackCancel={cancel} btns={buttons} isLoading={isLoading} />,
    },
  ];
  return (
    <>
      <TitleBar title="Create New User" breadcrumbs={breadcrumbs} />
      <CustomTab tabs={tabs} />
    </>
  );
};
export default AddUser;
