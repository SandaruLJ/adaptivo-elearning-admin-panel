import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";

const UploadResources = () => {
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="sublesson mt-2">
      <div className="sublesson-head" onClick={toggleCollapse}>
        <Grid container spacing={2}>
          <Grid item>
            <Menu />
          </Grid>
          <Grid item>
            <h3>03. Upload Resources</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body">
          <label htmlFor="file-button">
            <input className="image-input" accept="image/*" id="file-button" multiple type="file" />

            <Grid container alignItems="center">
              <Grid item xs={10}>
                <div className="no-file">No file Selected</div>
              </Grid>
              <Grid item xs={2}>
                <Button className="outlined" component="span" endIcon={<FileUpload />}>
                  Upload File
                </Button>
              </Grid>
            </Grid>
          </label>
          <caption className="text-left mt-1">
            <strong>Note: </strong>A resource is for any type of document that can be used to help students in the lecture. Make sure everything is legible and the file size is less than 1 GiB.
          </caption>
        </div>
      )}
    </div>
  );
};
export default UploadResources;
