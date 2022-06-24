import { Close, Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup } from "@mui/material";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import CustomButton from "../../../components/Button/CustomButton";
import Editor from "../../../components/RichEditor/RichEditor";
import Input from "../../../components/Input/Input";
import useForm from "../../../components/useForm";
import validate from "../../../helpers/validateInfo";
import "../AddCourse.css";
import LearningObject from "./LearningObject";
import { useDispatch, useSelector } from "react-redux";
import { conceptActions } from "../../../store/concept-slice";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import { addConcept, getAllConcepts } from "../../../service/concept.service";
import { useFetch } from "../../../components/useFetch";

const concepts = [];
const AddConcept = forwardRef((props, ref) => {
  const [LOCount, setLOCount] = useState([0]);
  const learningObjects = useSelector((state) => state.concept.learningObjects);
  const conceptName = useSelector((state) => state.concept.name);
  const conceptPreRequisite = useSelector((state) => state.concept.preRequisites);
  const { loading, data } = useFetch(getAllConcepts);
  const [open, setOpen] = useState(false);

  const [preRequisite, setPreRequisite] = useState([]);
  const dispatch = useDispatch();
  const [name, setName] = useState();

  useEffect(() => {
    data &&
      data.map((concept, i) => {
        concepts.push({
          value: concept._id,
          label: concept.name,
        });
      });
  }, [data]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    dispatch(conceptActions.setName(e.target.value));
  };

  const handlePreRequisiteChange = (e) => {
    setPreRequisite(e);
    dispatch(conceptActions.setPrerequisites(e));
  };

  const handleSubmit = async () => {
    const concept = {
      name: conceptName,
      preRequisites: conceptPreRequisite,
      learningObjects: learningObjects,
    };
    const response = await addConcept(concept);
    console.log(response);
    if (response) {
      dispatch(conceptActions.resetState());
      setName("");
      setPreRequisite([]);
      setLOCount([0]);
    }
  };
  useEffect(() => {
    if (learningObjects.length > 0) {
      setLOCount([...Array(learningObjects.length).keys()]);
    }
  }, [learningObjects]);
  useEffect(() => {
    setName(conceptName);
    setPreRequisite(conceptPreRequisite);
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
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    handleClickOpen() {
      handleClickOpen();
    },
  }));

  return (
    <div>
      <Dialog open={open} onClose={handleClose} className="add-concept-dialog">
        <DialogTitle>
          <Grid container justifyContent="space-between">
            <Grid item>Add Concept</Grid>
            <Grid item>
              <Close onClick={handleClose} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Input label="Concept Name" value={name} id="name" type="text" name={"name"} onChange={handleNameChange} placeholder="Please enter the concept name" hideLabel={false} />
          <MultiSelect
            label="Pre Requisites"
            id={"prerequisite"}
            name={"prerequisite"}
            onChange={handlePreRequisiteChange}
            value={preRequisite}
            placeholder={"Please select the Pre Requisites"}
            hideLabel={false}
            class="mt-3"
            values={concepts}
          />
          {LOCount.map((elem, index) => (
            <LearningObject num={index + 1} element={learningObjects[index]} delete={() => deleteLO(elem, index)} />
          ))}

          <CustomButton name="+ Add Learning Object" color="light-orange" onclick={addLearningObject} />
          <Grid container justifyContent="space-between" className="mt-2">
            <Grid item>
              <CustomButton name="Cancel" color="grey" type="cancel" onclick={handleClose} />
            </Grid>
            <Grid item>
              <CustomButton name="Save" color="orange" type="submit" onclick={handleSubmit} />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
});
export default AddConcept;
