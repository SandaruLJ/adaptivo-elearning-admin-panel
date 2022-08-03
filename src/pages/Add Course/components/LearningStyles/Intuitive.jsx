import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import Quiz from "../Quiz";
import UploadResources from "../UploadResources";
import UploadVideo from "../UploadVideo";

const Intuitive = () => {
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
            <h3>05. Intuitive</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body learning-style-container">
          <UploadVideo title="i. Upload Additional Video Materials" loId={1} style="intuitive" type="additionalVideo" />
          <UploadResources title="ii. Upload Additional Theory materials" loId={1} style="intuitive" type="additionalMaterials" />
        </div>
      )}
    </div>
  );
};
export default Intuitive;
