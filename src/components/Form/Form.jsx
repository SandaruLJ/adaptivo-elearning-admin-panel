import { CircularProgress, Grid } from "@mui/material";
import { React, useState } from "react";
import CustomButton from "../Button/CustomButton";
import Input from "../Input/Input";
import useForm from "../useForm";
import validate from "../../helpers/validateInfo";
import Select from "../Select/SelectBox";

function Form(props) {
  const inputs = props.inputs;
  const callback = props.callback;
  const callbackCancel = props.callbackCancel;
  const buttons = props.btns;
  const singleColumn = props.singleColumn;
  let names = {};
  props.inputs.map((input) => {
    const name = input.name;
    names[input.name] = "";
  });

  //Import methods from useForm hook
  const { handleChange, handleSubmit, values, errors } = useForm(callback, validate, names);

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
              if (input.type == "select") {
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
              } else {
                return (
                  <Grid item xs={12} md={input.singleColumn ? 6 : 12} key={input.name} hidden={input.hidden}>
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
          }
        </div>
      </form>
    </div>
  );
}
export default Form;
