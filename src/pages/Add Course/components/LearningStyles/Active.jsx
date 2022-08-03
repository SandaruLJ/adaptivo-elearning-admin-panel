import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Quiz from "../Quiz";
import UploadResources from "../UploadResources";
import UploadVideo from "../UploadVideo";

const Active = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="sublesson mt-2 ">
      <div className="sublesson-head" onClick={toggleCollapse}>
        <Grid container spacing={2}>
          <Grid item>
            <Menu />
          </Grid>
          <Grid item>
            <h3>03. Active</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body learning-style-container">
          <Quiz title="i. Upload Exercises" loId={1} style="active" type="quiz" />
        </div>
      )}
    </div>
  );
};
export default Active;
