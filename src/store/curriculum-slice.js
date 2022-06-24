import { createSlice } from "@reduxjs/toolkit";

const curriculumSlice = createSlice({
  name: "curriculum",
  initialState: { sections: [] },
  reducers: {
    setName(state, actions) {
      state.sections[actions.payload.id] = actions.payload.name;
    },
    addSection(state, actions) {
      const temp = state.sections;
      temp[actions.payload.id] = actions.payload;
      state.sections = temp;
    },
    deleteSection(state, actions) {
      //   const temp = state.questions.filter((question) => question.id !== actions.payload.id + 1);
      const temp = state.sections;
      temp.splice(actions.payload.id, 1);
      state.sections = temp;
    },
    modifySectionName(state, actions) {
      const temp = state.sections;
      temp[actions.payload.id]["name"] = actions.payload.name;
      state.sections = temp;
    },
    addUnit(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId] = actions.payload;
      state.sections = temp;
    },
    reorderUnit(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"].splice(actions.payload.sourceId, 1);
      temp[actions.payload.sectionId]["units"].splice(actions.payload.destinationId, 0, actions.payload.unit);
      state.sections = temp;
    },
    modifyUnitName(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["name"] = actions.payload.name;
      state.sections = temp;
    },
    modifyUnitType(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["type"] = actions.payload.type;
      state.sections = temp;
    },
    modifyUnitVideo(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["video"] = actions.payload.video;
      state.sections = temp;
    },
    modifyUnitAudio(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["audio"] = actions.payload.audio;
      state.sections = temp;
    },
    modifyUnitNote(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["note"] = actions.payload.note;
      state.sections = temp;
    },
    modifyUnitQuiz(state, actions) {
      state.sections[actions.payload.sectionId]["units"][actions.payload.unitId]["quiz"][actions.payload.questionId] = actions.payload.question;
    },
    deleteQuestion(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["quiz"].splice(actions.payload.questionId, 1);

      state.sections = temp;
    },
    deleteUnit(state, actions) {
      //   const temp = state.questions.filter((question) => question.id !== actions.payload.id + 1);
      const temp = state.sections;
      // temp.splice(actions.payload.id, 1);
      temp[actions.payload.sectionId]["units"].splice(actions.payload.unitId, 1);
      state.sections = temp;
    },
    // setPrerequisites(state, actions) {
    //   state.preRequisites = actions.payload;
    // },
    // addLO(state, actions) {
    //   const temp = state.learningObjects;
    //   temp[actions.payload.id - 1] = actions.payload;
    //   state.learningObjects = temp;
    // },
    // deleteLO(state, actions) {
    //   //   const temp = state.questions.filter((question) => question.id !== actions.payload.id + 1);
    //   const temp = state.learningObjects;
    //   temp.splice(actions.payload.id, 1);
    //   state.learningObjects = temp;
    // },
    // modifyVideo(state, actions) {
    //   state.learningObjects[actions.payload.id - 1]["video"] = actions.payload.video;
    // },
    // modifyLOName(state, actions) {
    //   state.learningObjects[actions.payload.id - 1]["name"] = actions.payload.name;
    // },
    // modifyAudio(state, actions) {
    //   state.learningObjects[actions.payload.id - 1]["audio"] = actions.payload.audio;
    // },
    // modifyQuiz(state, actions) {
    //   state.learningObjects[actions.payload.loId - 1]["quiz"][actions.payload.id - 1] = actions.payload.question;
    // },
    // deleteQuestion(state, actions) {
    //   const temp = state.learningObjects;
    //   temp[actions.payload.loId - 1]["quiz"].splice(actions.payload.id, 1);
    //   state.questions = temp;
    // },
    // resetState(state, actions) {
    //   state.name = "";
    //   state.preRequisites = [];
    //   state.learningObjects = [];
    // },
  },
});

export const curriculumActions = curriculumSlice.actions;

export default curriculumSlice;
