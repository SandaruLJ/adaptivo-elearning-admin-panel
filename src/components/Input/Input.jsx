import { InputLabel, OutlinedInput } from "@mui/material";
import React from "react";
import "./Input.css";

const Input = (props) => {
  return (
    <div class="input">
      <InputLabel shrink htmlFor={props.id} className={props.error ? "error" : ""}>
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
        error={props.error ? true : false}
      />
      <p className="error">{props.error}</p>
    </div>
  );
};
export default Input;
