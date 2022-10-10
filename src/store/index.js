import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import conceptSlice from "./concept-slice";
import courseSlice from "./course-slice";
import curriculumSlice from "./curriculum-slice";
import navMenuSlice from "./navmenu-slice";
import quizSlice from "./quiz-slice";
import uiSlice from "./ui-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navMenu: navMenuSlice.reducer,
    quiz: quizSlice.reducer,
    concept: conceptSlice.reducer,
    curriculum: curriculumSlice.reducer,
    course: courseSlice.reducer,
    ui: uiSlice.reducer
  },
  devTools: true,
});

export default store;
