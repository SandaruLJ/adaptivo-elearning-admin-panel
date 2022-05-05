import { createSlice } from "@reduxjs/toolkit";

const navMenuSlice = createSlice({
  name: "navMenu",
  initialState: { isCourseClicked: false, isCategoryClicked: false, isInstructorsClicked: false, isUsersClicked: false, isSubscriptionClicked: false },
  reducers: {
    clickCourses(state) {
      console.log("CLick Course");
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
  },
});

export const navMenuActions = navMenuSlice.actions;

export default navMenuSlice;
