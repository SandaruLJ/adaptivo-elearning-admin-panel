import { Delete, Edit, Search } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState } from "react";
import Input from "../Input/Input";
import "./Table.css";

const Table = (props) => {
  const columns = [];
  columns.push({ field: "no", headerName: "No", width: 100, headerAlign: "center", cellClassName: "table-cell" });

  props.columns.map((column) => {
    columns.push({ field: column.field, headerName: column.name, width: 200, headerAlign: "center", cellClassName: "table-cell", flex: 1 });
  });
  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 200,
    headerAlign: "center",
    cellClassName: "table-cell",
    getActions: (params) => [<GridActionsCellItem icon={<Edit />} label="Edit" showInMenu />, <GridActionsCellItem icon={<Delete />} label="Delete" showInMenu />],
  });
  return (
    <div className="container" style={{ height: 500, width: "100%" }}>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <div>
          <h4 className="num-entries">Showing 0 to 10 entries of 100 entries</h4>
        </div>
        <div className="table-search">
          <Input label="Search" hideLabel={true} placeholder="Search" endIcon={<Search />} />
        </div>
      </Grid>
      <DataGrid checkboxSelection={true} rows={props.rows} columns={columns} className="all-grid" disableExtendRowFullWidth={false} loading={props.loading} />
    </div>
  );
};
export default Table;
