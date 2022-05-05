import React, { useRef } from "react";
import TitleBar from "../../components/TitleBar/TitleBar";
import "./AllConcepts.css";
import Table from "../../components/Table/Table";
import { useFetch } from "../../components/useFetch";
import { getAllConcepts } from "../../service/concept.service";
import { Delete } from "@mui/icons-material";
import { Grid } from "@mui/material";
import AddConcept from "../Add Course/components/Concept";
const AllConcept = () => {
  const { loading, data } = useFetch(getAllConcepts);
  const addConceptModel = useRef();

  // const rows = [];

  // data &&
  // data.map((category, i) => {
  //     rows.push({
  //         id: i + 1,
  //         no: i + 1,
  //         title: category.title,
  //         status: "Active",
  //     });
  // });
  // const columns = [
  //     {
  //         field: "title",
  //         name: "Title",
  //     },
  //     {
  //         field: "status",
  //         name: "Status",
  //     },
  // ];

  return (
    <div>
      <Grid container spacing={4}>
        {data &&
          data.map((concept) => (
            <Grid item md={3}>
              <div className="concept-container">
                <Delete className="concept-delete" />
                <h3 className="concept-name">{concept.name}</h3>
              </div>
            </Grid>
          ))}
        <Grid item md={3}>
          <div className="concept-container" onClick={() => addConceptModel.current.handleClickOpen()}>
            <h3 className="concept-name">+ Add Concept</h3>
          </div>
        </Grid>
      </Grid>
      <AddConcept ref={addConceptModel} />
    </div>
  );
};
export default AllConcept;
