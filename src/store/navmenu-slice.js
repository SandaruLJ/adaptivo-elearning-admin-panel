import { createSlice } from "@reduxjs/toolkit";

const navMenuSlice = createSlice({
  name: "navMenu",
  initialState: { isCourseClicked: false, isCategoryClicked: false, isInstructorsClicked: false, isUsersClicked: false, isSubscriptionClicked: false, mainMenu: "", subMenu: "" },
  reducers: {
    clickCourses(state) {
      state.isCourseClicked = true;
      state.isCategoryClicked = false;
      state.isInstructorsClicked = false;
      state.isUsersClicked = false;
      state.isSubscriptionClicked = false;
    },
    clickCategory(state) {
      state.isCourseClicked = false;
      state.isCategoryClicked = true;
      state.isInstructorsClicked = false;
      state.isUsersClicked = false;
      state.isSubscriptionClicked = false;
    },
    clickInstructors(state) {
      state.isCourseClicked = false;
      state.isCategoryClicked = false;
      state.isInstructorsClicked = true;
      state.isUsersClicked = false;
      state.isSubscriptionClicked = false;
    },
    clickUsers(state) {
      state.isCourseClicked = false;
      state.isCategoryClicked = false;
      state.isInstructorsClicked = false;
      state.isUsersClicked = true;
      state.isSubscriptionClicked = false;
    },
    clickSubscriptions(state) {
      state.isCourseClicked = false;
      state.isCategoryClicked = false;
      state.isInstructorsClicked = false;
      state.isUsersClicked = false;
      state.isSubscriptionClicked = true;
    },
    handleMainMenuChange(state, actions) {
      state.mainMenu = actions.payload.mainMenu;
    },
    handleSubMenuChange(state, actions) {
      state.subMenu = actions.payload.subMenu;
    },
  },
});

export const navMenuActions = navMenuSlice.actions;

export default navMenuSlice;
