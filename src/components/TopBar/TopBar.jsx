import React, { Fragment, useState } from "react";
import "./TopBar.css";
import { Avatar, Divider, FormControl, Grid, IconButton, InputAdornment, ListItemIcon, Menu, MenuItem, OutlinedInput } from "@mui/material";
import { ArrowDropDown, Fullscreen, FullscreenExit, Logout, Menu as MenuIcon, PersonAdd, Search, Settings } from "@mui/icons-material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import store from "../../store";

//Admin TopBar
const TopBar = (props) => {
  const state = store.getState();
  const user = `${state.auth.user.attributes.given_name} ${state.auth.user.attributes.family_name}`;
  const role = state.auth.user.role;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      className={`topBar
                ${props.collapsed && "topBarExtended"}`}
    >
      {/* TopBar content (left) */}
      <Fragment>
        <Grid container spacing="2" alignItems="center" justifyContent="space-between">
          {/* NavBar collapse/extend button */}
          <Grid item>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <IconButton className="iconButton">
                  <MenuIcon />
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
                <h6 className="userName">{user}</h6>
                <h6 className="userType">{role}</h6>
              </Grid>
              <Grid item>
                <IconButton
                  className="accountButton"
                  onClick={handleClick}
                  disableRipple
                >
                  <Avatar src={props.avatarSrc}>{props.avatarTxt}</Avatar>
                  <ArrowDropDown />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar /> My Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={props.signOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Fragment>
      {/* TopBar content (right) */}
    </div>
  );
};
export default TopBar;
