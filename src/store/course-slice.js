import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    title: "",
    subtitle: "",
    category: "",
    subCategory: "",
    language: "",
    level: "",
    thumbnail: {},
    trailer: {},
    description: "",
    outcomes: {},
    requirements: {},
    welcome: "",
    congratulations: "",
    price: {},
    instructors: [],
  },
  reducers: {
    setValue(state, actions) {
      console.log(actions.payload);
      state[actions.payload.key] = actions.payload.value;
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
