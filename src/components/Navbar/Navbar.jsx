import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { Category, Dashboard, Group, Groups, MenuBook, QuestionAnswer, Subscriptions } from "@mui/icons-material";
import { Grid, Link, List } from "@mui/material";
import NavButton from "../NavButton/NavButton";
import { navMenuActions } from "../../store/navmenu-slice";
import store from "../../store";

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
        path: "/add/courses",
      },
    ],
  },
  { text: "Concepts", icon: <MenuBook />, path: "/concepts", auth: ["admin", "instructor"] },
  {
    text: "Categories",
    icon: <Category />,
    path: "/categories",
    auth: ["admin", "instructor"],
    subLinks: [
      {
        text: "All Categories",
        path: "/categories",
      },
      {
        text: "Add Category",
        path: "/categories/add",
      },
    ],
  },
  {
    text: "Instructors",
    icon: <Groups />,
    path: "/instructors",
    auth: ["admin", "instructor"],
    subLinks: [
      {
        text: "All Instructors",
        path: "/instructors",
      },
      {
        text: "Add Instructors",
        path: "/add/instructors",
      },
    ],
  },
  { text: "Q & A", icon: <QuestionAnswer />, path: "/qna", auth: ["admin", "instructor"] },
  {
    text: "Users",
    icon: <Group />,
    path: "/users",
    auth: ["admin", "instructor"],
    subLinks: [
      {
        text: "All Users",
        path: "/users",
      },
      {
        text: "Add User",
        path: "/users/add",
      },
    ],
  },
  { text: "Subscriptions", icon: <Subscriptions />, path: "/subscriptions", auth: ["admin", "instructor"] },
];
const NavBar = (props) => {
  const state = store.getState();
  const [collapsed, setCollapsed] = useState(state.ui.collapsed);

  useEffect(() => {
    const handleCollapsedChange = () => {
      setCollapsed(store.getState().ui.collapsed);
    }

    const unsubscribeCollapsed = store.subscribe(handleCollapsedChange);

    return function cleanup() {
      unsubscribeCollapsed();
    }
  }, [])

  return (
    <div className={`navBar ${collapsed ? 'collapsed': 'extended'}`}>
      {/* Logo */}
      <Grid container justify="center">
        {/* <Link
          to="/"
          className={`logo 
                        ${collapsed ? "logoSmall" : "logoBig"}`}
        >
          Elearning
        </Link> */}
        <img src="images/logo-white.png" className="logo-img" />
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
            collapsed={collapsed}
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
