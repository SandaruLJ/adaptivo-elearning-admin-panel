import { CircularProgress, Grid } from "@mui/material";
import { React, useState } from "react";
import CustomButton from "../Button/CustomButton";
import Radio from '../Radio/Radio';
import Input from "../Input/Input";
import useForm from "../useForm";
import validate from "../../helpers/validateInfo";
import Select from "../Select/SelectBox";

function Form(props) {
  const inputs = props.inputs;
  const callback = props.callback;
  const callbackCancel = props.callbackCancel;
  const buttons = props.btns;
  const reduxDispatch = props.reduxDispatch;
  const singleColumn = props.singleColumn;
  const state = props.state;
  const onChange = props.onChange;
  let names = {};
  props.inputs.map((input) => {
    const name = input.name;
    if (state != null) {
      names[input.name] = state[input.name];
    } else {
      names[input.name] = "";
    }
  });

  //Import methods from useForm hook
  const { handleChange, handleSubmit, values, errors } = useForm(callback, validate, names, reduxDispatch, onChange);

  // Cancel button action
  const handleCancel = (event) => {
    event.preventDefault();
    callbackCancel();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
          {
            //Map input array to input components
            inputs.map((input) => {
              switch (input.type) {
                case 'radio':
                  return (
                    <Grid item xs={12} md={singleColumn || input.singleColumn ? 12 : 6} key={input.name} hidden={input.hidden}>
                      <Radio
                        id={input.id}
                        name={input.name}
                        label={input.label}
                        options={input.options}
                        defaultValue={input.defaultValue}
                        value={values[input.name]}
                        onChange={handleChange}
                        error={errors[input.name] ? errors[input.name] : ""}
                        disabled={input.disabled}
                        hidden={input.hidden}
                      />
                    </Grid>
                  );
                case 'select':
                  return (
                    <Grid item xs={12} md={input.singleColumn ? 6 : 12} key={input.name} hidden={input.hidden}>
                      <Select
                        label={input.label}
                        value={values[input.name]}
                        id={input.name}
                        type={input.type}
                        name={input.name}
                        onChange={handleChange}
                        placeholder={input.placeholder}
                        error={errors[input.name] ? errors[input.name] : ""}
                        maxLength={input.maxLength}
                        disabled={input.disabled}
                        hidden={input.hidden}
                        hideLabel={false}
                        values={input.values}
                      />
                    </Grid>
                  );
                default:
                  return (
                    <Grid item xs={12} md={singleColumn || input.singleColumn ? 12 : 6} key={input.name} hidden={input.hidden}>
                      <Input
                        label={input.label}
                        value={values[input.name]}
                        id={input.name}
                        type={input.type}
                        name={input.name}
                        onChange={handleChange}
                        placeholder={input.placeholder}
                        error={errors[input.name] ? errors[input.name] : ""}
                        maxLength={input.maxLength}
                        disabled={input.disabled}
                        hidden={input.hidden}
                        hideLabel={false}
                      />
                    </Grid>
                  );
              }
            })
          }
        </Grid>

        <div>
          {/* Buttons */}
          {
            // Render buttons in reverse order to counter the reversing applied due to 'float: right' style
            !props.hideSubmit && (
              <Grid container justifyContent={"space-between"}>
                {buttons
                  .slice(0)
                  .reverse()
                  .map((btn) => {
                    return (
                      <CustomButton
                        color={btn.color}
                        loading={props.isLoading}
                        name={btn.name}
                        type={btn.type}
                        key={btn.name}
                        disabled={props.isLoading}
                        onclick={btn.type === "cancel" ? handleCancel : () => {}}
                      />
                    );
                  })}
              </Grid>
            )
          }
        </div>
      </form>
    </div>
  );
}
export default Form;
