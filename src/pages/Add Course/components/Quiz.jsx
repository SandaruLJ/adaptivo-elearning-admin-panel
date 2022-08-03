import { Delete, Menu } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import { conceptActions } from "../../../store/concept-slice";
import { quizActions } from "../../../store/quiz-slice";
import QuestionComponent from "./Question";

const Quiz = (props) => {
  const [questionCount, setQuestionCount] = useState([0]);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();

  const quiz = useSelector((state) => {
    if (props.style) {
      return state.concept.learningObjects[props.loId - 1][props.style]["quiz"];
    } else {
      return state.concept.learningObjects[props.loId - 1]["quiz"];
    }
  });

  useEffect(() => {
    if (quiz.length > 0) {
      setQuestionCount([...Array(quiz.length).keys()]);
    }
  }, [quiz]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const deleteQuestion = (i, index) => {
    if (questionCount.length > 1) {
      setQuestionCount(questionCount.filter((elem) => elem !== i));
      if (props.style) {
        dispatch(conceptActions.deleteLSQuestion({ id: index, loId: props.loId, style: props.style }));
      } else {
        dispatch(conceptActions.deleteQuestion({ id: index, loId: props.loId }));
      }
    } else {
      alert("There should be atleast 1 question");
    }
  };
  const addQuestion = () => {
    setQuestionCount([...questionCount, questionCount[questionCount.length - 1] + 1]);
  };

  return (
    <div className="sublesson mt-2">
      <div className="sublesson-head" onClick={toggleCollapse}>
        <Grid container spacing={2}>
          <Grid item>
            <Menu />
          </Grid>
          <Grid item>
            <h3>{props.title ? props.title : "04. Quiz"}</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body">
          {questionCount.map((elem, index) => (
            <QuestionComponent
              num={index + 1}
              loId={props.loId}
              question={quiz[index]}
              style={props.style}
              delete={() => {
                deleteQuestion(elem, index);
              }}
            />
          ))}
          <CustomButton name="+ Add Question" color="light-orange" onclick={() => addQuestion()} />
        </div>
      )}
    </div>
  );
};
export default Quiz;
