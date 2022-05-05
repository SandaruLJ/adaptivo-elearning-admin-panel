import { Delete, FileUpload } from "@mui/icons-material";
import { Button, Grid, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import Form from "../../../components/Form/Form";
import LinearProgressWithLabel from "../../../components/LinearProgress/LinearProgresswithLabel";
import RichEditor from "../../../components/RichEditor/RichEditor";
import { cancelThumbnailUpload, cancelTrailerUpload, uploadThumbnail, uploadTrailer } from "../../../service/course.service";
import { courseActions } from "../../../store/course-slice";

const learnInputs = [
  {
    label: "01",
    type: "text",
    name: "learn01",
    placeholder: "What students will learn in this course",
  },
  {
    label: "02",
    type: "text",
    name: "learn02",
    placeholder: "What students will learn in this course",
  },
  {
    label: "03",
    type: "text",
    name: "learn03",
    placeholder: "What students will learn in this course",
  },
  {
    label: "04",
    type: "text",
    name: "learn04",
    placeholder: "What students will learn in this course",
  },
];

const requirementInputs = [
  {
    label: "01",
    type: "text",
    name: "requirement01",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "02",
    type: "text",
    name: "requirement02",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "03",
    type: "text",
    name: "requirement03",
    placeholder: "What is the requirement to learn this course",
  },
  {
    label: "04",
    type: "text",
    name: "requirement04",
    placeholder: "What is the requirement to learn this course",
  },
];

const buttons = [
  {
    name: "Save ",
    color: "orange",
    type: "submit",
  },
  {
    name: "Cancel",
    color: "grey",
    type: "cancel",
  },
];
const CourseAdvancedInformation = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const course = useSelector((state) => state.course);
  const [description, setDescription] = useState(course.description);
  const [source, setSource] = useState({});
  const [file, setFile] = useState({});
  const [fileSize, setFileSize] = useState({});
  const [duration, setDuration] = useState();
  const [fileName, setFileName] = useState({});
  const [thumbnailprogress, setThumbnailProgress] = useState(0);
  const [thumbnailUploadError, setThumbnailUploadError] = useState();
  const [trailerprogress, setTrailerProgress] = useState(0);
  const [trailerUploadError, setTrailerUploadError] = useState();

  useEffect(() => {
    console.log(course);
    setDescription(course.description);
    setFileSize({ thumbnail: course.thumbnail.size, trailer: course.trailer.size });
    setSource({ thumbnail: course.thumbnail.url, trailer: course.trailer.url });
    setFileName({ thumbnail: course.thumbnail.name, trailer: course.trailer.name });
    setDuration(course.trailer.duration);
    if (course.thumbnail.name != null) {
      setThumbnailProgress(100);
      setThumbnailUploadError(null);
    }
    if (course.trailer.name != null) {
      setTrailerProgress(100);
      setTrailerUploadError(null);
    }
  }, []);
  function submitForm(data) {
    setIsLoading(true);
    // const response = addCourse(data);
    setIsLoading(false);
  }

  function cancel() {
    console.log("Cancel");
  }

  function handleDescriptionChange(value) {
    setDescription(value);
    console.log(value);
    dispatch(courseActions.setValue({ key: "description", value: value }));
  }

  function setAdvancedValues(key, value) {
    dispatch(courseActions.setValue({ key: key, value: value }));
    console.log("In Basic Value");
  }
  function handleOutcomeChange(value) {
    console.log(value);
    dispatch(courseActions.setValue({ key: "outcomes", value: value }));
  }
  function handleRequirementsChange(value) {
    console.log(value);
    dispatch(courseActions.setValue({ key: "requirements", value: value }));
  }

  const handleThumbnailChange = async (event) => {
    if (file) {
      cancelThumbnailUpload();
      setThumbnailProgress(0);
    }

    const f = event.target.files[0];
    const url = URL.createObjectURL(f);
    const size = formatBytes(f.size);
    setFileSize({ ...fileSize, thumbnail: size });
    setFile({ ...file, thumbnail: f });
    setSource({ ...source, thumbnail: url });
    setFileName({ ...fileName, thumbnail: f.name });
    setThumbnailUploadError(null);
    event.target.value = null;

    await uploadThumbnail(f, setThumbnailProgress, setThumbnailUploadError);
    dispatch(
      courseActions.setValue({
        key: "thumbnail",
        value: {
          name: f.name,
          size: size,
          url: url,
        },
      })
    );
  };

  const handleTrailerChange = async (event) => {
    if (file) {
      cancelTrailerUpload();
      setTrailerProgress(0);
    }

    const f = event.target.files[0];
    const url = URL.createObjectURL(f);
    const size = formatBytes(f.size);
    console.log(url);
    setFileSize({ ...fileSize, trailer: size });
    setFile({ ...file, trailer: f });
    setSource({ ...source, trailer: url });
    setFileName({ ...fileName, trailer: f.name });
    setTrailerUploadError(null);

    var media = new Audio(url);
    media.onloadedmetadata = function () {
      let duration = convertSeconds(media.duration);
      dispatch(
        courseActions.setValue({
          key: "trailer",
          value: {
            name: f.name,
            duration: duration,
            size: size,
            url: url,
          },
        })
      );
      setDuration(duration);
    };
    event.target.value = null;

    await uploadTrailer(f, setTrailerProgress, setTrailerUploadError);
  };
  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  const retry = async (type) => {
    if (type == "thumbnail") {
      cancelThumbnailUpload();
      setThumbnailProgress(0);
      await uploadThumbnail(file, setThumbnailProgress, setThumbnailUploadError);
    } else if (type == "trailer") {
      cancelTrailerUpload();
      setTrailerProgress(0);
      await uploadTrailer(file, setTrailerProgress, setTrailerUploadError);
    }
  };

  const deleteFile = (type) => {
    if (type == "thumbnail") {
      setFile({ ...file, thumbnail: "" });
      setSource({ ...source, thumbnail: "" });
      cancelThumbnailUpload();
      setThumbnailProgress(0);
    } else if (type == "trailer") {
      setFile({ ...file, trailer: "" });
      setSource({ ...source, trailer: "" });
      cancelTrailerUpload();
      setTrailerProgress(0);
    }
  };
  function convertSeconds(seconds) {
    var convert = function (x) {
      return x < 10 ? "0" + x : x;
    };
    return convert(parseInt(seconds / (60 * 60))) + ":" + convert(parseInt((seconds / 60) % 60)) + ":" + Math.floor(convert(seconds % 60));
  }

  const handleSubmit = () => {};
  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item md={6}>
          <div>
            <h3 className="sub-heading">Course Thumbnail</h3>
            <Grid container spacing={0} justify="center" className="mini-container-body">
              <Grid item md={4}>
                <Grid item md={4}>
                  {source.thumbnail ? <img src={source.thumbnail} className="thumbnail"></img> : <img src="/images/thumbnail.jpg" className="thumbnail"></img>}
                </Grid>
              </Grid>
              <Grid item md={8}>
                {source.thumbnail ? (
                  <div>
                    <h3>
                      <strong>{fileName.thumbnail}</strong>
                    </h3>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item>
                        <h3>{fileSize.thumbnail}</h3>
                      </Grid>
                      <Grid item>
                        <Delete className="thumbnail-delete mt-1" onClick={() => deleteFile("thumbnail")} />
                      </Grid>
                    </Grid>
                    <LinearProgressWithLabel value={thumbnailprogress} />
                    {thumbnailUploadError && (
                      <h3 className="error">
                        Upload Failed,{" "}
                        <u onClick={() => retry("thumbnail")} className="pointer">
                          Try Again
                        </u>
                      </h3>
                    )}
                  </div>
                ) : (
                  <div className="mini-description">
                    Upload your course thumbnail here. <strong>Important guidelines:</strong>1200x800 pixels or 12:8 ratio. Supported format: <strong>.jpg, .jpeg or .png</strong>
                    <div>
                      <label htmlFor="thumbnail-upload">
                        <input className="image-input" accept="image/png, image/jpg , image/jpeg" id="thumbnail-upload" type="file" onChange={handleThumbnailChange} />
                        <Button className="orange" component="span" endIcon={<FileUpload />}>
                          Upload Image
                        </Button>
                      </label>
                    </div>
                  </div>
                )}
              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item md={6}>
          <div>
            <h3 className="sub-heading">Course Trailer</h3>

            {source.trailer ? (
              <div className="mt-2">
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <video className="video_preview trailer" height={120} controls src={source.trailer} />
                  </Grid>
                  <Grid item xs={8}>
                    <h3>
                      <strong>{fileName.trailer}</strong>
                    </h3>
                    <h3>{duration}</h3>

                    <Grid container spacing={3} alignItems="center">
                      <Grid item>
                        <h3>{fileSize.trailer}</h3>
                      </Grid>
                      <Grid item>
                        <Delete className="thumbnail-delete mt-1" onClick={() => deleteFile("trailer")} />
                      </Grid>
                    </Grid>
                    <LinearProgressWithLabel value={trailerprogress} />
                    {trailerUploadError && (
                      <h3 className="error">
                        Upload Failed,{" "}
                        <u onClick={() => retry("trailer")} className="pointer">
                          Try Again
                        </u>
                      </h3>
                    )}
                  </Grid>
                </Grid>
              </div>
            ) : (
              <Grid container spacing={0} justify="center" className="mini-container-body">
                <Grid item md={4}>
                  <img src="/images/trailer.jpg" className="thumbnail"></img>
                </Grid>
                <Grid item md={8}>
                  <div className="mini-description">
                    Upload your course video here. Students are more likely to enroll in courses that have attractive trailers
                    <div>
                      <label htmlFor="video-upload-button">
                        <input className="image-input" accept=".mov,.mp4,.mkv" id="video-upload-button" type="file" onChange={handleTrailerChange} />
                        <Button className="orange" component="span" endIcon={<FileUpload />}>
                          Upload Video
                        </Button>
                      </label>
                    </div>
                  </div>
                </Grid>
              </Grid>
            )}
          </div>
        </Grid>
      </Grid>
      <hr className="hr"></hr>
      <div className="course-description">
        <h3 className="sub-heading">Course Description</h3>
        <RichEditor callback={handleDescriptionChange} content={description} />
      </div>
      <hr className="hr"></hr>
      <div className="course-description">
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <h3 className="sub-heading">What students will learn in this course?</h3>
            <h5 className="mb-1">You must enter atleast 4 learning outcomes that learners can expect to achieve after completing your course.</h5>
          </Grid>
          <Grid item>
            <p className="add-new">+ Add New</p>
          </Grid>
        </Grid>
        <Form
          inputs={learnInputs}
          callback={submitForm}
          callbackCancel={cancel}
          btns={buttons}
          singleColumn={false}
          isLoading={isLoading}
          reduxDispatch={setAdvancedValues}
          state={course.outcomes}
          onChange={handleOutcomeChange}
          hideSubmit={true}
        />
      </div>
      <hr className="hr"></hr>
      <div className="course-description">
        <Grid container justifyContent={"space-between"}>
          <Grid item>
            <h3 className="sub-heading">What are the requirements to learn this course?</h3>
            <h5 className="mb-1">List the required skills learners should have prior to taking this course.</h5>
          </Grid>
          <Grid item>
            <p className="add-new">+ Add New</p>
          </Grid>
        </Grid>
        <Form
          inputs={requirementInputs}
          callback={submitForm}
          callbackCancel={cancel}
          btns={buttons}
          singleColumn={false}
          isLoading={isLoading}
          reduxDispatch={setAdvancedValues}
          state={course.requirements}
          onChange={handleRequirementsChange}
          hideSubmit={true}
        />
      </div>
      <Grid container justifyContent="space-between" className="mt-2">
        <Grid item>
          <CustomButton name="Previous" color="grey" type="cancel" onclick={() => props.changeTab(0)} />
        </Grid>
        <Grid item>
          <CustomButton name="Next" color="orange" type="submit" onclick={() => props.changeTab(2)} />
        </Grid>
      </Grid>
    </div>
  );
};
export default CourseAdvancedInformation;
