import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Quiz from "../Quiz";
import UploadResources from "../UploadResources";
import UploadVideo from "../UploadVideo";

const Sensing = () => {
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
            <h3>04. Sensing</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body learning-style-container">
          <UploadVideo title="i. Upload Real World Example Video" loId={1} style="sensing" type="realExampleVideo" />
          <UploadResources title="ii. Upload Real World Example Pdf" loId={1} style="sensing" type="realExampleDoc" />
        </div>
      )}
    </div>
  );
};
export default Sensing;
