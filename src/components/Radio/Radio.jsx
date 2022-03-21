import { FormControlLabel, InputLabel, RadioGroup, Radio as RadioButton } from '@mui/material';
import React from 'react';
import './Radio.css';

const Radio = (props) => {
  return (
    <div class="radio">
      <InputLabel shrink htmlFor={props.id} className={`label ${props.error ? "error" : ""} ${props.hideLabel ? "hidden" : ""}`}>
          {props.label}
      </InputLabel>
      
      <RadioGroup
        row
        name={props.name}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
      >
        {props.options.map((option) => (
          <FormControlLabel key={option.value} value={option.value} control={<RadioButton />} label={option.label} />
        ))}
      </RadioGroup>
      <p className="error">{props.error}</p>
    </div>
    )
}

export default Radio;
