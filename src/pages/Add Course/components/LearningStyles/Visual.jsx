import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import UploadResources from "../UploadResources";
import UploadVideo from "../UploadVideo";

const Visual = (props) => {
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
            <h3>01. Visual</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body learning-style-container">
          <UploadVideo title="i. Upload Video" loId={props.loId} style="visual" type="video" />
          <UploadResources title="ii. Upload Visual Notes" loId={props.loId} style="visual" type="visualNotes" />
          <UploadResources title="iii. Upload Mindmaps" loId={props.loId} style="visual" type="mindmap" />
        </div>
      )}
    </div>
  );
};
export default Visual;
