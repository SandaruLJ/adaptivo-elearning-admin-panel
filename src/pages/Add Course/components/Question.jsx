import { Delete, Menu } from "@mui/icons-material";
import { Grid, InputLabel, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RichEditor from "../../../components/RichEditor/RichEditor";
import { conceptActions } from "../../../store/concept-slice";
import { quizActions } from "../../../store/quiz-slice";

const QuestionComponent = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [question, setQuestion] = useState();
  const [explanation, setExplanation] = useState();
  const [answers, setAnswers] = useState([]);
  const [answerCount, setAnswerCount] = useState([0, 1]);
  const [correctAnswer, setCorrectAnswer] = useState();

  const dispatch = useDispatch();
  let q = props.question;

  const handleAnswerChange = (index, value) => {
    let temp = [...answers];
    temp[index] = value;
    setAnswers(temp);
    let ques = { ...props.question };
    ques.answers = temp;
    if (props.style) {
      dispatch(conceptActions.modifyLSQuiz({ loId: props.loId, id: props.num, style: props.style, question: { ...ques } }));
    } else {
      dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...ques } }));
    }
  };
  const handleQuestionChange = (value) => {
    setQuestion(value);
    let temp = { ...props.question };
    temp.title = value;
    if (props.style) {
      dispatch(conceptActions.modifyLSQuiz({ loId: props.loId, id: props.num, style: props.style, question: { ...temp } }));
    } else {
      dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...temp } }));
    }
  };
  const handleExplanationChange = (value) => {
    setExplanation(value);
    let temp = { ...props.question };
    temp.explanation = value;
    if (props.style) {
      dispatch(conceptActions.modifyLSQuiz({ loId: props.loId, id: props.num, style: props.style, question: { ...temp } }));
    } else {
      dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...temp } }));
    }
  };

  const handleCorrectAnswerChange = (value) => {
    setCorrectAnswer(value);
    let temp = { ...props.question };
    temp.correctAnswer = value;
    if (props.style) {
      dispatch(conceptActions.modifyLSQuiz({ loId: props.loId, id: props.num, style: props.style, question: { ...temp } }));
    } else {
      dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...temp } }));
    }
  };

  const deleteAnswer = (i) => {
    if (answerCount.length > 2) {
      setAnswerCount(answerCount.filter((e) => e !== i));
      let temp = [...answers];
      temp.splice(i, 1);
      setAnswers(temp);
      let ques = { ...props.question };
      ques.answers = temp;
      // dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...ques } }));
      if (props.style) {
        dispatch(conceptActions.modifyLSQuiz({ loId: props.loId, id: props.num, style: props.style, question: { ...ques } }));
      } else {
        dispatch(conceptActions.modifyQuiz({ loId: props.loId, id: props.num, question: { ...temp } }));
      }
    } else {
      alert("There should be atleast 2 answers");
    }
  };
  const addAnswer = () => {
    setAnswerCount([...answerCount, answerCount[answerCount.length - 1] + 1]);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  useEffect(() => {
    if (props.question != null) {
      q = props.question;

      setQuestion(q.title);
      setCorrectAnswer(q.correctAnswer);
      setAnswers(q.answers);
      setExplanation(q.explanation);
      if (q.answers.length != 0) {
        if (q.answers.length > 2) {
          setAnswerCount([...Array(q.answers.length).keys()]);
        }
      }
    }
  }, [props.question]);
  useEffect(() => {
    if (props.question == null) {
      if (props.style) {
        dispatch(
          conceptActions.modifyLSQuiz({
            loId: props.loId,
            id: props.num,
            style: props.style,
            question: {
              id: props.num,
              title: question,
              explanation: explanation,
              correctAnswer: correctAnswer,
              answers: answers,
            },
          })
        );
      } else {
        dispatch(
          conceptActions.modifyQuiz({
            loId: props.loId,
            id: props.num,
            question: {
              id: props.num,
              title: question,
              explanation: explanation,
              correctAnswer: correctAnswer,
              answers: answers,
            },
          })
        );
      }
    }
  }, []);

  return (
    <div className="section mb-2">
      <div className="section-head">
        <Grid container justifyContent="space-between">
          <Grid item xs={11} onClick={toggleCollapse}>
            <Grid container spacing={2}>
              <Grid item>
                <Menu />
              </Grid>
              <Grid item>
                <h3>Question {props.num}</h3>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={() => props.delete()} />
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="section-body">
          <InputLabel>Question</InputLabel>
          <RichEditor style="quiz" callback={handleQuestionChange} content={question} />
          <InputLabel className="mt-2 mb-2">Answers</InputLabel>

          {answerCount.map((elem, index) => (
            <Grid container key={elem} className="mb-2" alignItems="center">
              <Grid item xs={1}>
                <Radio value={index} onChange={() => handleCorrectAnswerChange(index)} name="answer-radio" checked={index == correctAnswer} />
              </Grid>
              <Grid item xs={10}>
                <RichEditor
                  key={index}
                  style="quiz"
                  type="limited"
                  content={answers[index]}
                  callback={(value) => {
                    handleAnswerChange(index, value);
                  }}
                />
              </Grid>
              <Grid item xs={1}>
                <Delete className="answer-delete" onClick={() => deleteAnswer(index)} />
              </Grid>
            </Grid>
          ))}
          <h4 className="add-answer" onClick={addAnswer}>
            + Add Answer
          </h4>

          <InputLabel className="mt-3">Explanation for the correct answer</InputLabel>
          <RichEditor style="quiz" callback={handleExplanationChange} content={explanation} />
        </div>
      )}
    </div>
  );
};
export default QuestionComponent;
