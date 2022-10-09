import { CircularProgress, Grid } from "@mui/material";
import { React, useEffect, useState } from "react";
import CustomButton from "../Button/CustomButton";
import Radio from "../Radio/Radio";
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
  let requiredValues = {};
  const [names, setNames] = useState({});

  useEffect(() => {
    let temp = {};

    props.inputs.map((input) => {
      const key = input.name;
      if (props.state != null) {
        temp[key] = props.state[key];
        values[key] = props.state[key];
        if (input.required) {
          requiredValues[key] = props.state[key];
        }
      } else {
        temp[key] = "";
      }
    });
    setNames(temp);
  }, [props.state]);

  //Import methods from useForm hook
  const { handleChange, handleSubmit, values, errors } = useForm(callback, validate, names, reduxDispatch, onChange, requiredValues);

  const err = props.hasOwnProperty("errors") ? props.errors : errors;
  console.log("errors");
  console.log(err);
  console.log(errors);
  // Cancel button action
  const handleCancel = (event) => {
    event.preventDefault();
    callbackCancel();
  };

  return (
    <div>
      {Object.keys(names).length > 0 && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            {
              //Map input array to input components
              inputs.map((input) => {
                switch (input.type) {
                  case "radio":
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
                          error={err[input.name] ? err[input.name] : ""}
                          disabled={input.disabled}
                          hidden={input.hidden}
                          required={input.required}
                        />
                      </Grid>
                    );
                  case "select":
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
                          error={err[input.name] ? err[input.name] : ""}
                          maxLength={input.maxLength}
                          disabled={input.disabled}
                          hidden={input.hidden}
                          hideLabel={false}
                          values={input.values}
                          required={input.required}
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
                          error={err[input.name] ? err[input.name] : ""}
                          maxLength={input.maxLength}
                          disabled={input.disabled}
                          hidden={input.hidden}
                          hideLabel={false}
                          required={input.required}
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
      )}
    </div>
  );
}
export default Form;
