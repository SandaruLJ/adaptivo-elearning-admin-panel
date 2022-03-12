import { InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div class="input">
      <InputLabel shrink htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        notched={false}
        color="secondary"
        fullWidth
        size="small"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        type={props.type}
        name={props.name}
        onChange={props.onChange}
        disabled={props.disabled}
        hidden={props.hidden}
      />
    </div>
  );
};
export default Input;
