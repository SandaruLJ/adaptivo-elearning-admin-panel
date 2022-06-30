import { Delete, Edit, Search } from "@mui/icons-material";
import { DialogContentText, Grid } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useRef, useState } from "react";
import Input from "../Input/Input";
import "./Table.css";
import { Link } from "react-router-dom";
import DialogComponent from "../Dialog/DialogComponent";

const Table = (props) => {
  const columns = [];
  const model = useRef();
  const [deleteId, setDeleteId] = useState();
  const onDeleteClick = () => {
    props.delete(deleteId);
  };

  columns.push({ field: "no", headerName: "No", width: 100, headerAlign: "center", cellClassName: "table-cell" });

  props.columns.map((column) => {
    if (column.type != "image") {
      columns.push({ field: column.field, headerName: column.name, width: 200, headerAlign: "center", cellClassName: "table-cell", flex: 1 });
    } else {
      columns.push({
        field: column.field,
        headerName: column.name,
        width: 200,
        headerAlign: "center",
        cellClassName: "table-cell",
        renderCell: (params) => {
          return <img src={params.row.thumbnail} className="table-image" />;
        },
      });
    }
  });
  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 200,
    headerAlign: "center",
    cellClassName: "table-cell",
    getActions: (params) => [
      <GridActionsCellItem icon={<Edit />} label="Edit" component={Link} to={`/courses/edit/${params.row.id}`} showInMenu />,
      <GridActionsCellItem
        icon={<Delete />}
        label="Delete"
        onClick={() => {
          setDeleteId(params.row.id);
          model.current.handleClickOpen();
        }}
        showInMenu
      />,
    ],
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
      <DialogComponent
        ref={model}
        title={"Delete Confirmation"}
        body={
          <>
            <DialogContentText>Are you sure you want to delete?</DialogContentText>
          </>
        }
        okayText="Yes"
        cancelText="No"
        handleOkay={onDeleteClick}
      />
    </div>
  );
};
export default Table;
