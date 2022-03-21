import React from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import "./NavButton.css";

const NavButton = (props) => {
  return (
    <ListItem
      button
      component={NavLink} // Make ListItem component act as a NavLink
      to={props.path} // Pass the link path
      className={"navButton textPrimary"}
      activeClassName="selected" // Classname when the link is active
    >
      <ListItemIcon className={"iconRoot"}>{props.icon}</ListItemIcon>
      <ListItemText className={"textPrimary"} primary={props.text} />
    </ListItem>
  );
};

export default NavButton;
