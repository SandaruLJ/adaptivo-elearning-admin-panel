import React from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import "./NavButton.css";

// Make styles for ListItemIcon and ListItemText
const useStyles = makeStyles({
  iconRoot: {
    paddingInlineStart: 20,
    paddingInlineEnd: 20,
    color: "white",
    transition: "ease-in",
    transitionDuration: "250ms",
  },
  textPrimary: {
    fontWeight: 500,
    color: "white",
    transition: "ease-in",
    transitionDuration: "250ms",
    fontSize: 18,
  },
});

const useStylesCollapsed = makeStyles({
  iconRoot: {
    color: "white",
    transition: "ease-in",
    transitionDuration: "250ms",
  },
  textPrimary: {
    color: "white",
    transition: "ease-in",
    transitionDuration: "250ms",
  },
});

const NavButton = (props) => {
  const collapsedStyle = useStylesCollapsed();
  const expandedStyle = useStyles();
  const styles = props.collapsed ? collapsedStyle : expandedStyle;

  return (
    <ListItem
      button
      component={NavLink} // Make ListItem component act as a NavLink
      to={props.path} // Pass the link path
      exact={props.path === "/"}
      className="navButton"
      classes={{ primary: styles.textPrimary }}
      activeClassName="selected" // Classname when the link is active
    >
      <ListItemIcon classes={{ root: styles.iconRoot }}>{props.icon}</ListItemIcon>
      <ListItemText classes={{ primary: styles.textPrimary }} primary={props.text} />
    </ListItem>
  );
};

export default NavButton;
