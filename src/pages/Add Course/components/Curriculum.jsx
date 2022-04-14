import { Delete, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React from "react";
import CustomButton from "../../../components/Button/CustomButton";

const Curriculum = () => {
  return (
    <div>
      <div className="section">
        <div className="section-head">
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <Menu />
                </Grid>
                <Grid item>
                  <h3>Section 01:</h3>
                </Grid>
                <Grid item>
                  <input type="text" value="Section Name" className="borderless-input" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Delete />
            </Grid>
          </Grid>
        </div>
        <div className="section-body">
          <div className="sublesson">
            <div className="sublesson-head">
              <Grid container spacing={2} justifyContent="space-between">
                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Menu />
                    </Grid>
                    <Grid item>
                      <input type="text" value="Lesson Name" className="borderless-input" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Delete />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <CustomButton name="+ Add Section" color="light-orange" />
    </div>
  );
};
export default Curriculum;
