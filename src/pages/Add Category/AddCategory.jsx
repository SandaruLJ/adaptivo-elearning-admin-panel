import { Assignment } from "@mui/icons-material";
import React, { useState } from "react";
import Form from "../../components/Form/Form";
import CustomTab from "../../components/Tab/CustomTab";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AddCategory.css";
import { addCategory } from "./AddCategoryService";

const breadcrumbs = [
    {
        name: "Home",
        link: "/",
    },
    {
        name: "Category",
        link: "/categories",
    },
    {
        name: "Add Category",
        link: "/categories/add",
    },
];

const inputs = [
    {
        label: "Title",
        type: "text",
        name: "title",
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

const AddCategory = () => {
    const [isLoading, setIsLoading] = useState(false);

    function submitForm(data) {
        setIsLoading(true);
        // let values = JSON.stringify(data);
        const response = addCategory(data);
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

    ];
    return (
        <>
            <TitleBar title="Create New Category" breadcrumbs={breadcrumbs} />
            <CustomTab tabs={tabs} />
        </>
    );
};
export default AddCategory;
