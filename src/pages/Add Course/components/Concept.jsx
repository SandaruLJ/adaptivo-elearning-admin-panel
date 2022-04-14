import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "../../../components/Button/CustomButton";
import Editor from "../../../components/RichEditor/RichEditor";
import Input from "../../../components/Input/Input";
import useForm from "../../../components/useForm";
import validate from "../../../helpers/validateInfo";
import "../AddCourse.css";
import LearningObject from "./LearningObject";
import { useDispatch, useSelector } from "react-redux";
import { conceptActions } from "../../../store/concept-slice";

const AddConcept = () => {
  const [LOCount, setLOCount] = useState([0]);
  const learningObjects = useSelector((state) => state.concept.learningObjects);
  const conceptName = useSelector((state) => state.concept.name);

  const dispatch = useDispatch();
  const [name, setName] = useState();
  const handleChange = (e) => {
    setName(e.target.value);
    dispatch(conceptActions.setName(e.target.value));
  };

  useEffect(() => {
    if (learningObjects.length > 0) {
      setLOCount([...Array(learningObjects.length).keys()]);
    }
  }, [learningObjects]);
  useEffect(() => {
    setName(conceptName);
  }, []);
  const addLearningObject = () => {
    setLOCount([...LOCount, LOCount[LOCount.length - 1] + 1]);
  };
  const deleteLO = (i, index) => {
    if (LOCount.length > 1) {
      setLOCount(LOCount.filter((elem) => elem !== i));
      dispatch(conceptActions.deleteLO({ id: index }));
    } else {
      alert("There should be atleast 1 Learning Object for each concept");
    }
  };

  return (
    <div>
      <Input label="Concept Name" value={name} id="name" type="text" name={"name"} onChange={handleChange} placeholder="Please enter the concept name" hideLabel={false} />
      {LOCount.map((elem, index) => (
        <LearningObject num={index + 1} element={learningObjects[index]} delete={() => deleteLO(elem, index)} />
      ))}
      <CustomButton name="+ Add Learning Object" color="light-orange" onclick={addLearningObject} />
      <Grid container justifyContent="space-between" className="mt-2">
        <Grid item>
          <CustomButton name="Cancel" color="grey" type="cancel" />
        </Grid>
        <Grid item>
          <CustomButton name="Save" color="orange" type="submit" />
        </Grid>
      </Grid>
    </div>
  );
};
export default AddConcept;
