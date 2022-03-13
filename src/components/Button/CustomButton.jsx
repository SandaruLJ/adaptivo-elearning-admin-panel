import React from "react";
import { Button } from "@mui/material";
import "./Button.css";
import { LoadingButton } from "@mui/lab";

const CustomButton = (props) => {
  if (props.type == "submit") {
    return (
      <LoadingButton
        className={`button ${props.color}`}
        type={props.type}
        key={props.name}
        variant="contained"
        disabled={props.disabled}
        onClick={props.onclick}
        loading={props.loading}
        loadingPosition="start"
      >
        {props.name}
      </LoadingButton>
    );
  } else {
    return (
      <Button className={`button ${props.color}`} type={props.type} key={props.name} variant="contained" disabled={props.disabled} onClick={props.onclick}>
        {props.name}
      </Button>
    );
  }
};
export default CustomButton;
