import React from "react";
import { Button } from "@mui/material";
import "./Button.css";

const CustomButton = (props) => {
  return (
    <Button className={`button ${props.color}`} type={props.type} key={props.name} variant="contained" disabled={props.disabled} onClick={props.onClick}>
      {props.name}
    </Button>
  );
};
export default CustomButton;
