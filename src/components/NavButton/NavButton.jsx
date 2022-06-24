import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import "./NavButton.css";
import { useDispatch, useSelector } from "react-redux";
import { navMenuActions } from "../../store/navmenu-slice";

const NavButton = (props) => {
  console.log(props.state);
  const [collapse, setCollapse] = useState(true);
  const state = useSelector((state) => state.navMenu[props.state]);
  const dispatch = useDispatch();
  console.log(state);
  return (
    <div>
      <ListItem
        button
        component={NavLink} // Make ListItem component act as a NavLink
        to={props.path} // Pass the link path
        className={"navButton textPrimary"}
        activeClassName="selected"
        onClick={(e) => {
          // e.preventDefault();
          dispatch(props.dispatchMethod());
        }} // Classname when the link is active
      >
        <ListItemIcon className={"iconRoot"}>{props.icon}</ListItemIcon>
        <ListItemText className={"textPrimary"} primary={props.text} />
      </ListItem>
      {props.subLinks &&
        state &&
        props.subLinks.map((link) => {
          // console.log(link);
          return (
            <ListItem
              button
              component={NavLink} // Make ListItem component act as a NavLink
              to={link.path} // Pass the link path
              className={"navButton textPrimary sublink"}
              activeClassName="selected" // Classname when the link is active
            >
              <ListItemText className={"textPrimary"} primary={link.text} />
            </ListItem>
          );
        })}
    </div>
  );
};

export default NavButton;
