import { Grid, Link } from "@mui/material";
import React from "react";
import "./TitleBar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const TitleBar = (props) => {
  return (
    <div className="titlebar">
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
          <h5 className="title">{props.title}</h5>
        </Grid>
        <Grid item>
          <Grid container spacing={2} alignItems="center">
            {props.breadcrumbs.map((breadcrumb, i) => {
              return (
                <>
                  <Grid item>
                    <Link href={breadcrumb.link}>{breadcrumb.name}</Link>
                  </Grid>

                  {i !== props.breadcrumbs.length - 1 && (
                    <Grid item>
                      <ArrowForwardIosIcon fontSize="smaller" />
                    </Grid>
                  )}
                </>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default TitleBar;
