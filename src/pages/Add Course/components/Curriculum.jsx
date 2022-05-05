import { Delete, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import { curriculumActions } from "../../../store/curriculum-slice";
import CurriculumSection from "./CurriculumSection";

const Curriculum = (props) => {
  const [sectionCount, setSectionCount] = useState([0]);
  const sections = useSelector((state) => state.curriculum.sections);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sections.length > 0) {
      setSectionCount([...Array(sections.length).keys()]);
    }
  }, [sections]);

  const addSection = () => {
    setSectionCount([...sectionCount, sectionCount[sectionCount.length - 1] + 1]);
  };
  const deleteSection = (i, index) => {
    if (sectionCount.length > 1) {
      setSectionCount(sectionCount.filter((elem) => elem !== i));
      dispatch(curriculumActions.deleteSection({ id: index }));
    } else {
      alert("There should be atleast 1 section");
    }
  };
  const handleSubmit = async () => {
    // const concept = {
    //   name: conceptName,
    //   preRequisites: conceptPreRequisite,
    //   learningObjects: learningObjects,
    // };
    // const response = await addConcept(concept);
    // console.log(response);
    // if (response) {
    //   dispatch(conceptActions.resetState());
    //   setName("");
    //   setPreRequisite([]);
    //   setLOCount([0]);
    // }
  };
  return (
    <div>
      {sectionCount.map((elem, index) => (
        <CurriculumSection num={index + 1} delete={() => deleteSection(elem, index)} element={sections[index]} />
      ))}
      <CustomButton name="+ Add Section" color="light-orange" onclick={addSection} />
      <Grid container justifyContent="space-between" className="mt-2">
        <Grid item>
          <CustomButton name="Previous" color="grey" type="cancel" onclick={() => props.changeTab(1)} />
        </Grid>
        <Grid item>
          <CustomButton name="Next" color="orange" type="submit" onclick={() => props.changeTab(3)} />
        </Grid>
      </Grid>
    </div>
  );
};
export default Curriculum;
