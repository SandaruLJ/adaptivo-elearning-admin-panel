import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";
import "./MultiSelect.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard", "Omar Alexander", "Carlos Abbott", "Miriam Wagner", "Bradley Wilkerson", "Virginia Andrews", "Kelly Snyder"];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

export default function MultiSelect(props) {
  const [selected, setSelected] = useState(false);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.onChange(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div className={`select ${props.class}`}>
      <InputLabel shrink htmlFor={props.id} className={`${props.error ? "error" : ""} ${props.hideLabel ? "hidden" : ""}`}>
        {props.label}
      </InputLabel>
      <Select
        id="demo-multiple-chip"
        multiple
        color="secondary"
        size="small"
        value={props.value}
        className={!selected ? "not-selected" : ""}
        onChange={handleChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((option) => (
              <Chip key={option.value} label={option.label} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        <MenuItem disabled value="">
          {props.placeholder}
        </MenuItem>
        {props.values.map((option) => (
          <MenuItem key={option.value} value={option}>
            <Checkbox checked={props.value.indexOf(option) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
