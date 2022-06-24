import { InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Select.css";

const SelectBox = (props) => {
  const [selected, setSelected] = useState(false);

  return (
    <div className="select">
      <InputLabel shrink htmlFor={props.id} className={`${props.error ? "error" : ""} ${props.hideLabel ? "hidden" : ""}`}>
        {props.label}
      </InputLabel>
      <Select
        id="outlined-select"
        displayEmpty
        color="secondary"
        size="small"
        className={!selected ? "not-selected" : ""}
        onChange={(e) => {
          props.onChange(e);
          setSelected(true);
        }}
        value={props.value}
        // onChange={props.onChange}
        name={props.name}
        error={props.error ? true : false}
      >
        <MenuItem disabled value="">
          {props.placeholder}
        </MenuItem>
        {props.values.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <p className="error">{props.error}</p>
    </div>
  );
};
export default SelectBox;
