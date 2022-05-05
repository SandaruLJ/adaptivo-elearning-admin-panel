import { createSlice } from "@reduxjs/toolkit";

const conceptSlice = createSlice({
  name: "concept",
  initialState: { name: "", preRequisites: [], learningObjects: [] },
  reducers: {
    setName(state, actions) {
      state.name = actions.payload;
    },
    setPrerequisites(state, actions) {
      state.preRequisites = actions.payload;
    },
    addLO(state, actions) {
      const temp = state.learningObjects;
      temp[actions.payload.id - 1] = actions.payload;
      state.learningObjects = temp;
    },
    deleteLO(state, actions) {
      //   const temp = state.questions.filter((question) => question.id !== actions.payload.id + 1);
      const temp = state.learningObjects;
      temp.splice(actions.payload.id, 1);
      state.learningObjects = temp;
    },
    modifyVideo(state, actions) {
      state.learningObjects[actions.payload.id - 1]["video"] = actions.payload.video;
    },
    modifyLOName(state, actions) {
      state.learningObjects[actions.payload.id - 1]["name"] = actions.payload.name;
    },
    modifyAudio(state, actions) {
      state.learningObjects[actions.payload.id - 1]["audio"] = actions.payload.audio;
    },
    modifyQuiz(state, actions) {
      state.learningObjects[actions.payload.loId - 1]["quiz"][actions.payload.id - 1] = actions.payload.question;
    },
    deleteQuestion(state, actions) {
      const temp = state.learningObjects;
      temp[actions.payload.loId - 1]["quiz"].splice(actions.payload.id, 1);
      state.questions = temp;
    },
    resetState(state, actions) {
      state.name = "";
      state.preRequisites = [];
      state.learningObjects = [];
    },
  },
});

export const conceptActions = conceptSlice.actions;

export default conceptSlice;
