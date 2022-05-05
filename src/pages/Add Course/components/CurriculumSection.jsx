import { Delete, Menu } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Input from "../../../components/Input/Input";
import CustomButton from "../../../components/Button/CustomButton";

import { useDispatch, useSelector } from "react-redux";
import DialogComponent from "../../../components/Dialog/DialogComponent";
import Unit from "./Unit";
import { curriculumActions } from "../../../store/curriculum-slice";

const CurriculumSection = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [unitCount, setUnitCount] = useState([0]);
  const [concept, setConcept] = useState();
  const units = props.element ? props.element.units : [];

  const [name, setName] = useState();
  const model = useRef();

  useEffect(() => {
    if (props.element == null) {
      dispatch(
        curriculumActions.addSection({
          id: props.num - 1,
          name: name,
          units: [],
          // video: "",
          // audio: "",
          // resources: "",
          // quiz: [],
        })
      );
    }
  }, []);

  useEffect(() => {
    if (units.length > 0) {
      setUnitCount([...Array(units.length).keys()]);
    }
  }, [units]);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleConceptChange = (concept) => {
    setConcept(concept);
    console.log(concept);
    // for (let c in concept.learningObjects) {
    //   console.log(c);
    //   // addUnit();
    //   // dispatch(
    //   //   curriculumActions.addUnit({
    //   //     sectionId: props.num - 1,
    //   //     unitId: unitCount[unitCount.length - 1],
    //   //     type: "",
    //   //     video: "",
    //   //     audio: "",
    //   //     resources: [],
    //   //     quiz: [],
    //   //     note: "",
    //   //     name: c.name,
    //   //   })
    //   // );
    // }
    let count = unitCount[unitCount.length - 1];
    concept.learningObjects.map((c) => {
      console.log(c);
      addUnit();
      count = count + 1;
      console.log(count);

      dispatch(
        curriculumActions.addUnit({
          sectionId: props.num - 1,
          unitId: count,
          type: "",
          video: "",
          audio: "",
          resources: [],
          quiz: [],
          note: "",
          name: c.name,
          isConceptLink: true,
          loId: c._id,
          conceptName: concept.name,
        })
      );
    });
  };
  const dispatch = useDispatch();

  const deleteUnit = (i, index) => {
    if (unitCount.length > 1) {
      setUnitCount(unitCount.filter((elem) => elem !== i));
      dispatch(curriculumActions.deleteUnit({ sectionId: props.num - 1, unitId: index }));
    } else {
      alert("There should be atleast 1 section");
    }
  };

  const addUnit = () => {
    setUnitCount([...unitCount, unitCount[unitCount.length - 1] + 1]);
  };
  // const deleteSection = (i, index) => {
  //   if (sectionCount.length > 1) {
  //     setSectionCount(sectionCount.filter((elem) => elem !== i));
  //     dispatch(curriculumActions.deleteSection({ id: index }));
  //   } else {
  //     alert("There should be atleast 1 section");
  //   }
  // };

  useEffect(() => {
    if (props.element != null) {
      setName(props.element.name);
    }
  }, [props.element]);

  const handleChange = (e) => {
    dispatch(
      curriculumActions.modifySectionName({
        id: props.num - 1,
        name: e.target.value,
      })
    );
    setName(e.target.value);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    // console.log("Source " + source.index);
    // console.log("Destination " + destination.index);
    // console.log(units[source.index]);
    dispatch(
      curriculumActions.reorderUnit({
        sectionId: props.num - 1,
        sourceId: source.index,
        destinationId: destination.index,
        unit: units[source.index],
      })
    );

    // units.splice(source.index, 1);
    // units.splice(destination.index, 0, units[source.index]);
  };

  return (
    <div className="section mt-3">
      <div className="section-head">
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item onClick={toggleCollapse} xs={11}>
            <Grid container spacing={2}>
              <Grid item>
                <Menu />
              </Grid>
              <Grid item>
                <h3>Section {props.num} : </h3>
              </Grid>
              <Grid item>
                <h3>{name}</h3>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={props.delete} />
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="section-body">
          <Input label="Section Name" value={name} id={"name"} type="text" name={"name"} onChange={handleChange} placeholder="Please enter the Section name" hideLabel={false} />
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={`0${props.num - 1}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {unitCount.map((elem, index) => (
                    <Unit sectionId={props.num - 1} key={elem} unitId={index} element={units[index]} delete={() => deleteUnit(elem, index)} />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <CustomButton name="Add Unit" color="light-orange" onclick={addUnit} />
            </Grid>
            <Grid item xs={6}>
              <CustomButton
                name="Link Concept"
                color="light-orange"
                onclick={() => {
                  model.current.handleClickOpen();
                }}
              />
              <DialogComponent ref={model} setValue={handleConceptChange} />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default CurriculumSection;
