import { useState, useEffect } from "react";

function useForm(callback, validate, val, reduxDispatch, onChange, requiredValues) {
  //Hook to store states of values
  const [values, setValues] = useState({
    ...val,
  });

  //Hook to store errors
  const [errors, setErrors] = useState({});
  //Hook to store submitting status
  const [isSubmitting, setIsSubmitting] = useState(false);

  //This function executes on onChange event of the input box
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (reduxDispatch) {
      reduxDispatch(name, value);
    }
    if (!value) {
      if (requiredValues.hasOwnProperty(name)) {
        let obj = {};
        obj[name] = value;
        const tempError = validate(obj);
        setErrors({ ...errors, ...tempError });
      }
    }
    if (errors.hasOwnProperty(name)) {
      if (value) {
        let temp = errors;
        delete temp[name];
        setErrors(temp);
      }
    }
    if (onChange) {
      onChange({ ...values, [name]: value });
    }
  };

  const handleFileSubmit = ({ file }, name) => {
    setValues({ ...values, [name]: file });
  };

  //This function is executed on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //Sets errors if there are errors
    for (var key in requiredValues) {
      requiredValues[key] = values[key];
    }
    setErrors(validate(requiredValues));
    console.log(errors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    //Checks if there are no errors and the form is in IsSubmitting state
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
    }
  }, [errors]);

  return { handleChange, handleSubmit, values, errors, handleFileSubmit, isSubmitting };
}
export default useForm;
