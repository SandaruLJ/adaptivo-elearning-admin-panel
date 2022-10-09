import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import UploadResources from "../UploadResources";
import UploadVideo from "../UploadVideo";

const Verbal = () => {
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
            <h3>02. Verbal</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body learning-style-container">
          <UploadResources title="i. Upload Text Rich Materials" loId={1} style="verbal" type="textRichFile" />
        </div>
      )}
    </div>
  );
};
export default Verbal;
