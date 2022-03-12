import { AppBar, Box, Grid, InputLabel, OutlinedInput, Tab, Tabs, TextField, Typography, useTheme } from "@mui/material";
import React from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import SwipeableViews from "react-swipeable-views";
import "./AddCourse.css";
import { Assignment } from "@mui/icons-material";
import Input from "../../components/Input/Input";
import CustomButton from "../../components/Button/CustomButton";
import Form from "../../components/Form/Form";

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
    type: "Submit",
  },
  {
    name: "Cancel",
    color: "grey",
  },
];
const names = {
  fname: "",
  lname: "",
};
const url = "http://localhost:3000/api/v1/reviewer";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const AddCourse = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  function submitForm() {
    console.log("Submitted");
  }
  return (
    <>
      <TitleBar title="Create New Course" breadcrumbs={breadcrumbs} />
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
            <Tab icon={<Assignment />} iconPosition="start" label="Basic Information" {...a11yProps(0)} />
            <Tab icon={<Assignment />} iconPosition="start" label="Advanced Information" {...a11yProps(1)} />
            <Tab icon={<Assignment />} iconPosition="start" label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
          <TabPanel value={value} index={0} dir={theme.direction}>
            {/* <form>
              <Input id="title" title="Title" placeholder="Enter Title" />
              <Grid container justifyContent={"space-between"}>
                <CustomButton name="Cancel" color="grey" />
                <CustomButton name="Next" color="orange" />
              </Grid>
            </form> */}
            <Form inputs={inputs} names={names} callbackSuccess={submitForm} callbackFail={submitForm} btns={buttons} url={url} singleColumn={true} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
        </SwipeableViews>
      </Box>
    </>
  );
};
export default AddCourse;
