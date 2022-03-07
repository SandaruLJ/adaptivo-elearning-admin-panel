import React from "react";
import "./Navbar.css";

import { Dashboard } from "@material-ui/icons";
import { Grid, Link, List } from "@material-ui/core";
import NavButton from "../NavButton/NavButton";

const navLinks = [
  { text: "Dashboard", icon: <Dashboard />, path: "/", auth: ["admin", "instructor"] },
  { text: "Courses", icon: <Dashboard />, path: "/courses", auth: ["admin", "instructor"] },
  { text: "Category", icon: <Dashboard />, path: "/categories", auth: ["admin", "instructor"] },
  { text: "Instructors", icon: <Dashboard />, path: "/instructors", auth: ["admin", "instructor"] },
  { text: "Q & A", icon: <Dashboard />, path: "/qna", auth: ["admin", "instructor"] },
  { text: "Users", icon: <Dashboard />, path: "/users", auth: ["admin", "instructor"] },
  { text: "Subscriptions", icon: <Dashboard />, path: "/subscriptions", auth: ["admin", "instructor"] },
];
const NavBar = (props) => {
  return (
    <div className="navBar extended">
      {/* Logo */}
      <Grid container justify="center">
        <Link
          to="/"
          className={`logo 
                        ${props.collapsed ? "logoSmall" : "logoBig"}`}
        >
          Elearning
        </Link>
      </Grid>
      {/* Navigation Buttons */}
      <List component="nav">
        {/* Render each navigation button in the list with props */}
        {navLinks.map((navLink) => (
          // Only render NavButtons which are allowed for the user type
          <NavButton key={navLink.text} text={navLink.text} icon={navLink.icon} path={navLink.path} collapsed={props.collapsed} />
        ))}
      </List>
    </div>
  );
};
export default NavBar;
