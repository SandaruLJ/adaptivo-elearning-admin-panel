import { Delete, Menu } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import { conceptActions } from "../../../store/concept-slice";
import { curriculumActions } from "../../../store/curriculum-slice";
import { quizActions } from "../../../store/quiz-slice";
import QuestionComponent from "./Question";
import QuestionCurriculum from "./QuestionCurriculum";

const QuizCurriculum = (props) => {
  const [questionCount, setQuestionCount] = useState([0]);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const quiz = props.quiz;

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
      dispatch(curriculumActions.deleteQuestion({ sectionId: props.sectionId, unitId: props.unitId, questionId: index }));
    } else {
      alert("There should be atleast 1 question");
    }
  };
  const addQuestion = () => {
    setQuestionCount([...questionCount, questionCount[questionCount.length - 1] + 1]);
  };
  const handleQuizChange = (questionId, question) => {
    dispatch(curriculumActions.modifyUnitQuiz({ sectionId: props.sectionId, unitId: props.unitId, questionId: questionId, question: { ...question } }));
  };

  return (
    <div className="sublesson mt-2">
      {/* <div className="sublesson-head" onClick={toggleCollapse}>
        <Grid container spacing={2}>
          <Grid item>
            <Menu />
          </Grid>
          <Grid item>
            <h3>04. Quiz</h3>
          </Grid>
        </Grid>
      </div> */}
      {/* {!collapsed && ( */}
      <div className="sublesson-body">
        {questionCount.map((elem, index) => (
          <QuestionCurriculum
            num={index + 1}
            loId={props.loId}
            question={quiz[index]}
            delete={() => {
              deleteQuestion(elem, index);
            }}
            handleQuizChange={handleQuizChange}
            sectionId={props.sectionId}
            unitId={props.unitId}
          />
        ))}
        <CustomButton name="+ Add Question" color="light-orange" onclick={() => addQuestion()} />
      </div>
      {/* )} */}
    </div>
  );
};
export default QuizCurriculum;
