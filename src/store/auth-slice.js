import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: {}, profile: {} },
  reducers: {
    setUser(state, actions) {
      state.role = actions.payload;
    },
    updateProfile(state, actions) {
      state.profile = actions.payload;
    },
    deleteProfile(state) {
      state.profile = {};
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice;
