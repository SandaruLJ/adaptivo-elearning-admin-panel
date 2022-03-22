import { configureStore, createSlice } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import navMenuSlice from "./navmenu-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    navMenu: navMenuSlice.reducer,
  },
});

export default store;
