import { AppBar, Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React from "react";
import SwipeableViews from "react-swipeable-views";

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

const CustomTab = (props) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} indicatorColor="secondary">
          {props.tabs.map((tab, i) => {
            return <Tab icon={tab.icon} iconPosition="start" label={tab.label} {...a11yProps(i)} />;
          })}
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
        {props.tabs.map((tab, i) => {
          return (
            <TabPanel value={value} index={i} dir={theme.direction}>
              {tab.body}
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </Box>
  );
};
export default CustomTab;
