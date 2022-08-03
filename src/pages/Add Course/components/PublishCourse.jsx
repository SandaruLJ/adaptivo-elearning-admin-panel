import { DialogContentText, Grid } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import Input from "../../../components/Input/Input";
import RichEditor from "../../../components/RichEditor/RichEditor";
import Select from "../../../components/Select/SelectBox";
import { addCourse } from "../../../service/course.service";
import { courseActions } from "../../../store/course-slice";
import validate from "../../../helpers/validateInfo";
import { curriculumActions } from "../../../store/curriculum-slice";
import DialogComponent from "../../../components/Dialog/DialogComponent";

const types = [
  {
    label: "Video",
    value: "video",
  },
  {
    label: "Audio",
    value: "audio",
  },
  {
    label: "Resources",
    value: "resource",
  },
  {
    label: "Note",
    value: "note",
  },
  {
    label: "Quiz",
    value: "quiz",
  },
];
const priceTier = [
  {
    label: "Free",
    value: "free",
  },
  {
    label: "Paid",
    value: "paid",
  },
];

const currencies = [
  {
    label: "Rs",
    value: "rs",
  },
  {
    label: "USD",
    value: "usd",
  },
  {
    label: "EUR",
    value: "eur",
  },
];

const PublishCourse = (props) => {
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const curriculum = useSelector((state) => state.curriculum);
  const [message, setMessage] = useState({});
  const [instructors, setInstructors] = useState();
  const errors = useSelector((state) => state.course.errors.publish);
  const courseErrors = useSelector((state) => state.course.errors);
  const curriculumErrors = useSelector((state) => state.curriculum.errors);

  const model = useRef();

  useEffect(() => {
    setMessage({ welcome: course.welcome, congratulations: course.congratulations });
  }, []);

  const handleMessageChange = (type, value) => {
    setMessage({ ...message, type: value });
    dispatch(courseActions.setValue({ key: type, value: value }));
  };
  const handleInstructorChange = (value) => {
    setInstructors(value);
    dispatch(courseActions.setValue({ key: "instructors", value: value }));
  };
  const handleTierChange = (e) => {
    if (!course.price.currency) {
      dispatch(courseActions.setValue({ key: "price", value: { currency: "rs", type: e.target.value } }));
    } else {
      dispatch(courseActions.setValue({ key: "price", value: { ...course.price, type: e.target.value } }));
    }
    // if (e.target.value == "paid" && !course.price.currency) {
    //   dispatch(courseActions.setValue({ key: "price", value: { ...course.price, currency: "rs" } }));
    // }
  };
  const handlePriceChange = (e) => {
    dispatch(courseActions.setValue({ key: "price", value: { ...course.price, value: e.target.value } }));
  };
  const handleCurrencyChange = (e) => {
    dispatch(courseActions.setValue({ key: "price", value: { ...course.price, currency: e.target.value } }));
  };

  const validatePublishCourse = () => {
    // const values = {
    //   tier: course.price.type,
    //   currency: course.price.currency,
    //   amount: course.price.value,
    //   congratulations: course.congratulations,
    //   welcome: course.welcome,
    // };
    // console.log(values);
    // console.log(validate(values));
    // setErrors(validate(values));
  };
  const handleSubmit = () => {
    model.current.handleClickOpen();

    dispatch(courseActions.setErrors());
    dispatch(curriculumActions.setErrors());

    // validatePublishCourse();
    let request = { ...course, curriculum: curriculum };
    addCourse(request);
  };
  return (
    <div>
      <h2 className="mb-3">Course Pricing</h2>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <Select
            label="Price Tier"
            value={course.price.type}
            error={errors.tier ? errors.tier : ""}
            id="tier"
            name="tier"
            onChange={handleTierChange}
            placeholder={"Select Price Tier"}
            hideLabel={false}
            values={priceTier}
          />
        </Grid>
        {course.price.type == "paid" && (
          <Grid item md={6}>
            <Grid container alignItems="flex-end">
              <Grid item xs={2}>
                <Select
                  label="Price"
                  value={course.price.currency}
                  error={errors.currency ? errors.currency : ""}
                  id="currency"
                  name="currency"
                  onChange={handleCurrencyChange}
                  hideLabel={false}
                  values={currencies}
                />
              </Grid>
              <Grid item xs={10}>
                <Input
                  value={course.price.value}
                  id="price"
                  type="text"
                  error={errors.amount ? errors.amount : ""}
                  name={"price"}
                  onChange={handlePriceChange}
                  placeholder="Please enter the price"
                  hideLabel={true}
                />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <hr className="hr"></hr>

      <h2 className="mb-3">Message</h2>
      <Grid container spacing={6}>
        <Grid item md={6}>
          <h3 className="sub-heading">Welcome Message</h3>
          <RichEditor
            style="quiz"
            callback={(value) => {
              handleMessageChange("welcome", value);
            }}
            content={course.welcome}
            error={errors.welcome}
          />
        </Grid>
        <Grid item md={6}>
          <h3 className="sub-heading">Congratulations Message</h3>

          <RichEditor
            style="quiz"
            callback={(value) => {
              handleMessageChange("congratulations", value);
            }}
            content={course.congratulations}
            error={errors.congratulations}
          />
        </Grid>
      </Grid>
      <hr className="hr"></hr>
      <h2 className="mb-3">Add Instructor</h2>
      <Grid container>
        <Grid item md={6}>
          <Select
            label="Select Instructor"
            value={instructors}
            id="instructor"
            name="instructor"
            onChange={handleInstructorChange}
            placeholder={"Select Instructor"}
            hideLabel={false}
            values={types}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" className="mt-2">
        <Grid item>
          <CustomButton name="Previous" color="grey" type="cancel" onclick={() => props.changeTab(2)} />
        </Grid>
        <Grid item>
          <CustomButton name="Submit for Review" color="orange" type="submit" onclick={handleSubmit} />
        </Grid>
      </Grid>
      <DialogComponent
        ref={model}
        title={"Error !"}
        body={
          <>
            <DialogContentText>Please fill the missing values</DialogContentText>
          </>
        }
      />
    </div>
  );
};
export default PublishCourse;
