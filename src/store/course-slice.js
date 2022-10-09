import { createSlice } from "@reduxjs/toolkit";
import validate from "../helpers/validateInfo";

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
    errors: {
      basic: {},
      advanced: {},
      publish: {},
    },
  },
  reducers: {
    setValue(state, actions) {
      console.log(actions.payload);
      state[actions.payload.key] = actions.payload.value;
    },
    setErrors(state, actions) {
      //Errors are set in the format sectionNum_unitNum_fieldName
      state.errors = {};
      // const course = {
      //   title: state.title,
      //   subtitle: state.subtitle,
      //   category: state.category,
      //   subCategory: state.subCategory,
      //   language: state.language,
      //   level: state.level,
      //   thumbnail: state.thumbnail,
      //   trailer: state.trailer,
      //   description: state.description,
      //   outcomes: state.outcomes,
      //   requirements: state.requirements,
      //   welcome: state.welcome,
      //   congratulations: state.congratulations,
      //   tier: state.price.type,
      //   currency: state.price.currency,
      //   amount: state.price.value,
      // };
      const basic = {
        title: state.title,
        subtitle: state.subtitle,
        category: state.category,
        subCategory: state.subCategory,
        language: state.language,
        level: state.level,
      };
      const advanced = {
        thumbnail: state.thumbnail,
        trailer: state.trailer,
        description: state.description,
        outcomes: state.outcomes,
        requirements: state.requirements,
      };
      const publish = {
        welcome: state.welcome,
        congratulations: state.congratulations,
        tier: state.price.type,
        currency: state.price.currency,
        amount: state.price.value,
      };
      state.errors.basic = validate(basic);
      state.errors.advanced = validate(advanced);
      state.errors.publish = validate(publish);
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice;
