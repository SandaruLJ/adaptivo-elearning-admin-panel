import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import "./NavButton.css";
import { useDispatch, useSelector } from "react-redux";
import { navMenuActions } from "../../store/navmenu-slice";

const NavButton = (props) => {
  const [collapse, setCollapse] = useState(true);
  const state = useSelector((state) => state.navMenu[props.state]);
  const navMenu = useSelector((state) => state.navMenu);

  const dispatch = useDispatch();

  return (
    <div>
      <ListItem
        button
        component={Link} // Make ListItem component act as a NavLink
        to={props.path} // Pass the link path
        className={`navButton textPrimary ${navMenu.mainMenu == props.text && "selected"}`}
        onClick={(e) => {
          dispatch(navMenuActions.handleMainMenuChange({ mainMenu: props.text }));
          dispatch(navMenuActions.handleSubMenuChange({ subMenu: `All ${props.text}` }));
        }} // Classname when the link is active
      >
        <ListItemIcon className={`${props.collapsed ? "iconRoot-collapsed": "iconRoot"}`}>{props.icon}</ListItemIcon>
        <ListItemText className={"textPrimary"} primary={props.text} />
      </ListItem>
      {props.subLinks &&
        navMenu.mainMenu == props.text &&
        props.subLinks.map((link) => {
          // console.log(link);
          return (
            <ListItem
              button
              component={Link} // Make ListItem component act as a NavLink
              to={link.path} // Pass the link path
              className={`navButton textPrimary sublink ${navMenu.subMenu == link.text && "selected"}`}
              onClick={(e) => {
                dispatch(navMenuActions.handleSubMenuChange({ subMenu: link.text }));
              }}
            >
              <ListItemText className={"textPrimary"} primary={link.text} />
            </ListItem>
          );
        })}
    </div>
  );
};

export default NavButton;
