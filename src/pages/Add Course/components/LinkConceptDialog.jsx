import { DialogContentText } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "../../../components/Button/CustomButton";
import DialogComponent from "../../../components/Dialog/DialogComponent";
import SelectBox from "../../../components/Select/SelectBox";
import { useFetch } from "../../../components/useFetch";
import { getAllConcepts } from "../../../service/concept.service";

let concepts = [];

const LinkConceptDialog = (props) => {
  const [value, setValue] = useState();
  const { loading, data } = useFetch(getAllConcepts);
  const model = useRef();

  useEffect(() => {
    data &&
      data.map((concept, i) => {
        concepts.push({
          value: concept._id,
          label: concept.name,
        });
      });
  }, [data]);

  useEffect(() => {
    concepts = [];
  }, []);

  const handleOkay = () => {
    const concept = data.filter((elem) => elem._id == value);
    props.setValue(concept[0]);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <CustomButton
        name="Link Concept"
        color="light-orange"
        onclick={() => {
          model.current.handleClickOpen();
        }}
      />

      <DialogComponent
        ref={model}
        title={"Select Concept"}
        body={
          <>
            <DialogContentText>Please select a concept</DialogContentText>
            <SelectBox value={value} id="concept" name="concept" onChange={handleChange} placeholder={"Select a concept"} hideLabel={true} values={concepts} />
          </>
        }
        handleOkay={handleOkay}
      />
    </>
  );
};
export default LinkConceptDialog;
