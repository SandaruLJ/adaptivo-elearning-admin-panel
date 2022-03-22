import React from "react";
import "./Navbar.css";

import { Category, Dashboard, Group, Groups, MenuBook, QuestionAnswer, Subscriptions } from "@mui/icons-material";
import { Grid, Link, List } from "@mui/material";
import NavButton from "../NavButton/NavButton";
import { navMenuActions } from "../../store/navmenu-slice";

const navLinks = [
  { text: "Dashboard", icon: <Dashboard />, path: "/", auth: ["admin", "instructor"] },
  {
    text: "Courses",
    icon: <MenuBook />,
    path: "/courses",
    auth: ["admin", "instructor"],
    subLinks: [
      {
        text: "All Courses",
        path: "/courses",
      },
      {
        text: "Add Courses",
        path: "/courses/add",
      },
    ],
    state: "isCourseClicked",
    dispatchMethod: navMenuActions.clickCourses,
  },
  { text: "Category", icon: <Category />, path: "/categories", auth: ["admin", "instructor"], state: "isCategoryClicked", dispatchMethod: navMenuActions.clickCategory },
  { text: "Instructors", icon: <Groups />, path: "/instructors", auth: ["admin", "instructor"], state: "isInstructorsClicked", dispatchMethod: navMenuActions.clickInstructors },
  { text: "Q & A", icon: <QuestionAnswer />, path: "/qna", auth: ["admin", "instructor"] },
  { text: "Users", icon: <Group />, path: "/users", auth: ["admin", "instructor"], state: "isUsersClicked" },
  { text: "Subscriptions", icon: <Subscriptions />, path: "/subscriptions", auth: ["admin", "instructor"], state: "isSubscriptionsClicked" },
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
          <NavButton
            key={navLink.text}
            text={navLink.text}
            icon={navLink.icon}
            path={navLink.path}
            collapsed={props.collapsed}
            subLinks={navLink.subLinks}
            state={navLink.state}
            dispatchMethod={navLink.dispatchMethod}
          />
        ))}
      </List>
    </div>
  );
};
export default NavBar;
