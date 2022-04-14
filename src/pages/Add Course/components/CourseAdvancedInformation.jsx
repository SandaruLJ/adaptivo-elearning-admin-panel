import { FileUpload } from "@mui/icons-material";
import { Button, Grid, Input } from "@mui/material";
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Form from "../../../components/Form/Form";
import RichEditor from "../../../components/RichEditor/RichEditor";

const learnInputs = [
  {
    label: "01",
    type: "text",
    name: "learn01",
    placeholder: "What students will learn in this course",
  },
  {
    label: "02",
    type: "text",
    name: "learn02",
    placeholder: "What students will learn in this course",
  },
  {
    label: "03",
    type: "text",
    name: "learn03",
    placeholder: "What students will learn in this course",
  },
  {
    label: "04",
    type: "text",
    name: "learn04",
    placeholder: "What students will learn in this course",
  },
];

const requirementInputs = [
  {
    label: "01",
    type: "text",
    name: "requirement01",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "02",
    type: "text",
    name: "requirement02",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "03",
    type: "text",
    name: "requirement03",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "04",
    type: "text",
    name: "requirement04",
    placeholder: "What is the requirement to learn this course",
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
const CourseAdvancedInformation = () => {
  const [isLoading, setIsLoading] = useState(false);

  function submitForm(data) {
    setIsLoading(true);
    // const response = addCourse(data);
    setIsLoading(false);
  }

  function cancel() {
    console.log("Cancel");
  }
  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item md={6}>
          <div>
            <h3 className="sub-heading">Course Thumbnail</h3>
            <Grid container spacing={0} justify="center" className="mini-container-body">
              <Grid item md={4}>
                <img src="/images/thumbnail.jpg" className="thumbnail"></img>
              </Grid>
              <Grid item md={8}>
                <div className="mini-description">
                  Upload your course thumbnail here. <strong>Important guidelines:</strong>1200x800 pixels or 12:8 ratio. Supported format: <strong>.jpg, .jpeg or .png</strong>
                  <div>
                    <label htmlFor="contained-button-file">
                      <Input className="image-input" accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button className="orange" component="span" endIcon={<FileUpload />}>
                        Upload Image
                      </Button>
                    </label>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6}>
          <div>
            <h3 className="sub-heading">Course Trailer</h3>
            <Grid container spacing={0} justify="center" className="mini-container-body">
              <Grid item md={4}>
                <img src="/images/thumbnail.jpg" className="thumbnail"></img>
              </Grid>
              <Grid item md={8}>
                <div className="mini-description">
                  Upload your course video here. Students are more likely to enroll in courses that have attractive trailers
                  <div>
                    <label htmlFor="contained-button-file">
                      <Input className="image-input" accept="image/*" id="contained-button-file" multiple type="file" />
                      <Button className="orange" component="span" endIcon={<FileUpload />}>
                        Upload Video
                      </Button>
                    </label>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <hr className="hr"></hr>
      <div className="course-description">
        <h3 className="sub-heading">Course Description</h3>
        <RichEditor />
      </div>
      <hr className="hr"></hr>
      <div className="course-description">
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <h3 className="sub-heading">What students will learn in this course?</h3>
            <h5 className="mb-1">You must enter atleast 4 learning outcomes that learners can expect to achieve after completing your course.</h5>
          </Grid>
          <Grid item>
            <p className="add-new">+ Add New</p>
          </Grid>
        </Grid>
        <Form inputs={learnInputs} callback={submitForm} callbackCancel={cancel} btns={buttons} singleColumn={false} isLoading={isLoading} />,
      </div>
      <hr className="hr"></hr>
      <div className="course-description">
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <h3 className="sub-heading">What are the requirements to learn this course?</h3>
            <h5 className="mb-1">List the required skills learners should have prior to taking this course.</h5>
          </Grid>
          <Grid item>
            <p className="add-new">+ Add New</p>
          </Grid>
        </Grid>
        <Form inputs={requirementInputs} callback={submitForm} callbackCancel={cancel} btns={buttons} singleColumn={false} isLoading={isLoading} />,
      </div>
    </div>
  );
};
export default CourseAdvancedInformation;
