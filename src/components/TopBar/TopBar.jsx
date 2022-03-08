import React, { useEffect, useState } from "react";
import "./TopBar.css";
import { Avatar, Badge, FormControl, FormHelperText, Grid, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import { ArrowDropDown, Fullscreen, FullscreenExit, KeyboardArrowLeft, Menu, Search, Visibility } from "@mui/icons-material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import { width } from "@mui/system";

//Admin TopBar
const TopBar = (props) => {
  return (
    <div
      className={`topBar
                ${props.collapsed && "topBarExtended"}`}
    >
      {/* TopBar content (left) */}
      <Grid container spacing="2" alignItems="center" justifyContent="space-between">
        {/* NavBar collapse/extend button */}
        <Grid item>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <IconButton className="iconButton">
                <Menu />
              </IconButton>
            </Grid>
            <Grid item>
              <FormControl sx={{ width: "40ch" }}>
                <OutlinedInput
                  placeholder="Search"
                  size="small"
                  notched={false}
                  className="searchForm"
                  endAdornment={
                    <InputAdornment position="end">
                      <Search />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {/* Fullscreen button */}
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <IconButton className="darkModeIcon">
                <DarkModeIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton className="iconButton">{props.fullscreen ? <FullscreenExit /> : <Fullscreen />}</IconButton>
            </Grid>

            {/* Account button */}
            <Grid item>
              <h6 className="userName">Rishard Akram</h6>
              <h6 className="userType">Admin</h6>
            </Grid>
            <Grid item>
              <IconButton className="accountButton" disableRipple>
                <Avatar src={props.avatarSrc}>{props.avatarTxt}</Avatar>
                <ArrowDropDown />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* TopBar content (right) */}
    </div>
  );
};
export default TopBar;
