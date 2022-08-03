import { createSlice } from "@reduxjs/toolkit";

const curriculumSlice = createSlice({
  name: "curriculum",
  initialState: { sections: [], errors: {} },
  reducers: {
    setName(state, actions) {
      state.sections[actions.payload.id] = actions.payload.name;
    },
    setSection(state, actions) {
      state.sections = actions.payload;
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
    modifyUnitFile(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["file"] = actions.payload.file;
      state.sections = temp;
    },
    modifyUnitNote(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["note"] = actions.payload.note;
      state.sections = temp;
    },
    modifyUnitPreTest(state, actions) {
      const temp = state.sections;
      temp[actions.payload.sectionId]["units"][actions.payload.unitId]["preTest"] = actions.payload.preTest;
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
    setErrors(state, actions) {
      //Errors are set in the format sectionNum_unitNum_fieldName
      state.errors = {};
      if (state.sections.length === 0) {
        let name = `1_0_name`;
        state.errors[name] = "Please enter a section Name";
        name = `1_1_name`;
        state.errors[name] = "Please enter a unit name";
        name = `1_1_type`;
        state.errors[name] = "Please enter a unit type";
      }
      state.sections.map((section) => {
        if (section.name == undefined || !section.name.trim()) {
          let name = `${section.id + 1}_0_name`;
          state.errors[name] = "Please enter a section Name";
        }
        section.units.map((unit) => {
          // let name = `${section.id + 1}_0_name`;
          if (!unit.name.trim()) {
            let name = `${unit.sectionId + 1}_${unit.unitId + 1}_name`;
            state.errors[name] = "Please enter a unit name";
          }
          if (!unit.type.trim()) {
            let name = `${unit.sectionId + 1}_${unit.unitId + 1}_type`;
            state.errors[name] = "Please select a unit type";
          }
          if (unit.type == "video") {
            try {
              if (!unit.video.trim()) {
                let name = `${unit.sectionId + 1}_${unit.unitId + 1}_video`;
                state.errors[name] = "Please upload a video";
              }
            } catch (err) {
              if (Object.keys(unit.video).length == 0) {
                let name = `${unit.sectionId + 1}_${unit.unitId + 1}_video`;
                state.errors[name] = "Please upload a video";
              }
            }
          }
          if (unit.type == "audio") {
            if (!unit.audio.trim()) {
              let name = `${unit.sectionId + 1}_${unit.unitId + 1}_audio`;
              state.errors[name] = "Please upload an audio";
            }
          }
          if (unit.type == "note") {
            if (!unit.note.trim() || unit.note == "<p></p>\n") {
              let name = `${unit.sectionId + 1}_${unit.unitId + 1}_note`;
              state.errors[name] = "Please enter a note";
            }
          }
          if (unit.type == "quiz") {
            if (unit.quiz.length == 0) {
              let name = `${unit.sectionId + 1}_${unit.unitId + 1}_quiz`;
              state.errors[name] = "Please add questions";
            } else {
              unit.quiz.map((quiz) => {
                if (!quiz.title.trim()) {
                  let name = `${unit.sectionId + 1}_${unit.unitId + 1}_quiz_${quiz.id}_title`;
                  state.errors[name] = "Please enter a question";
                }
                if (!quiz.explanation.trim()) {
                  let name = `${unit.sectionId + 1}_${unit.unitId + 1}_quiz_${quiz.id}_explanation`;
                  state.errors[name] = "Please enter an explanation";
                }

                if (quiz.answers.length < 2) {
                  let name = `${unit.sectionId + 1}_${unit.unitId + 1}_quiz_${quiz.id}_answers`;
                  state.errors[name] = "Please enter answer";
                }
                if (quiz.answers.length > 0) {
                  quiz.answers.map((answer) => {
                    if (answer == "<p></p>\n") {
                      let name = `${unit.sectionId + 1}_${unit.unitId + 1}_quiz_${quiz.id}_answers`;
                      state.errors[name] = "Please enter answer";
                    }
                  });
                }
              });
            }
          }
        });
      });
      // for (var section in state.sections) {
      // console.log(section.id);
      // if (!section.name.trim()) {
      //   console.log(true);
      //   // let name = `${section.id + 1}_0_name`;
      //   // state.errors[name] = "Please enter a section Name";
      //   // console.log(state.errors);
      // } else {
      //   console.log(false);
      // }
      // }
    },
  },
});

export const curriculumActions = curriculumSlice.actions;

export default curriculumSlice;
