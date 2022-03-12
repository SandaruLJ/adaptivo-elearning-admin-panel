import { CircularProgress, Grid } from "@mui/material";
import { React, useState } from "react";
import CustomButton from "../Button/CustomButton";
import Input from "../Input/Input";
import useForm from "../useForm";
import validate from "../../helpers/validateInfo";

function Form(props) {
  const url = props.url;
  const inputs = props.inputs;
  const names = props.names;
  const callbackSuccess = props.callbackSuccess;
  const callbackFail = props.callbackFail;
  const buttons = props.btns;
  const singleColumn = props.singleColumn;

  const progress = {
    color: "#E2BC7F",
    marginBlockStart: "8px",
    marginInlineEnd: "8px",
    float: "right",
  };

  // Handle isSubmitting state for submitting feedback
  const [isSubmitting, setIsSubmitting] = useState(false);
  const callbackIsSubmitting = (state) => setIsSubmitting(state);

  //Import methods from useForm hook
  const { handleChange, handleSubmit, values, errors } = useForm(callbackSuccess, validate, names, url, callbackIsSubmitting);

  // Cancel button action
  const handleCancel = (event) => {
    event.preventDefault();
    callbackFail();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
          {
            //Map input array to input components
            inputs.map((input) => {
              return (
                <Grid item xs={12} md={singleColumn ? 12 : 6} key={input.name} hidden={input.hidden}>
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
                  />
                </Grid>
              );
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
                  return <CustomButton color={btn.color} name={btn.name} type={btn.type} key={btn.name} disabled={isSubmitting} onclick={btn.type === "cancel" ? handleCancel : () => {}} />;
                })}
            </Grid>
          }

          {/* Submitting progress indicator */}
          {isSubmitting && <CircularProgress size={"2.2em"} style={progress} data-testid="progress" />}
        </div>
      </form>
    </div>
  );
}
export default Form;
