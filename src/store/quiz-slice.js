import { TenMp } from "@mui/icons-material";
import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: { questions: [], name: "", learningObjects: [] },
  reducers: {
    addQuestion(state, actions) {
      const temp = state.questions;
      temp[actions.payload.id - 1] = actions.payload;
      state.questions = temp;
    },
    addLearningObject(state, actions) {
      const temp = state.learningObjects;
      temp[actions.payload.id - 1] = actions.payload;
      state.learningObjects = temp;
    },
    deleteQuestion(state, actions) {
      //   const temp = state.questions.filter((question) => question.id !== actions.payload.id + 1);
      const temp = state.questions;
      temp.splice(actions.payload.id, 1);
      state.questions = temp;
    },
  },
});

export const quizActions = quizSlice.actions;

export default quizSlice;
