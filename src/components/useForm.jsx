import { useState, useEffect } from "react";
import { constants } from "../constants/generalConstatnts";
import { save, update } from "../service/http.service";

function useForm(callback, validate, val, url, method, type) {
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
  };

  const handleFileSubmit = ({ file }, name) => {
    setValues({ ...values, [name]: file });
  };

  //This function is executed on form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //Sets errors if there are errors
    setErrors(validate(values));
  };

  useEffect(() => {
    //Checks if there are no errors and the form is in IsSubmitting state
    if (Object.keys(errors).length === 0 && isSubmitting) {
      //Submit the form
      if (url) {
        submitForm();
      } else {
        //Callback the submitForm method
        callback(values);
      }
    }
  }, [errors]);

  //This function handles the POST api call to submit the form data
  const submitForm = () => {
    let data = JSON.stringify(values);
    if (type === constants.save) {
      callback(save(url, data));
    } else if (type === constants.update) {
      callback(update(url, data));
    }
  };

  return { handleChange, handleSubmit, values, errors, handleFileSubmit };
}
export default useForm;
