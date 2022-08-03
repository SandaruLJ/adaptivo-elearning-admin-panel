import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Chip, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import Input from "../../../components/Input/Input";
import LinearProgressWithLabel from "../../../components/LinearProgress/LinearProgresswithLabel";
import VideoPicker from "../../../components/VideoPicker/VideoPicker";
import Select from "../../../components/Select/SelectBox";

import { cancelVideoUpload, getAllConcepts, uploadVideo } from "../../../service/concept.service";
import { conceptActions } from "../../../store/concept-slice";
import AudioPicker from "../../../components/AudioPicker/AudioPicker";
import RichEditor from "../../../components/RichEditor/RichEditor";
import QuizCurriculum from "./QuizCurrculum";
import { curriculumActions } from "../../../store/curriculum-slice";
import { Draggable } from "react-beautiful-dnd";
import MultiSelect from "../../../components/MultiSelect/MultiSelect";
import { useFetch } from "../../../components/useFetch";
import FilePicker from "../../../components/FilePicker/FilePicker";

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
    label: "Pre Test",
    value: "preTest",
  },
  {
    label: "File",
    value: "file",
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
const concepts = [];

const Unit = (props) => {
  const errors = useSelector((state) => state.curriculum.errors);

  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [note, setNote] = useState();
  const [video, setVideo] = useState({});
  const [audio, setAudio] = useState({});
  const [file, setFile] = useState({});

  const [unitError, setUnitError] = useState(false);
  const [errorKeys, setErrorKeys] = useState([]);
  const [preTest, setPreTest] = useState();
  const { loading, data } = useFetch(getAllConcepts);

  const [quiz, setQuiz] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    data &&
      data.map((concept, i) => {
        concepts.push({
          value: concept._id,
          label: concept.name,
        });
      });
  }, [data]);
  useEffect(() => {
    if (props.element == null) {
      dispatch(
        curriculumActions.addUnit({
          sectionId: props.sectionId,
          unitId: props.unitId,
          type: "",
          video: "",
          audio: "",
          preTest: "",
          file: "",
          quiz: [],
          note: "",
          name: "",
          isConceptLink: false,
        })
      );
    } else {
      setName(props.element.name);
      setType(props.element.type);
      setVideo(props.element.video);
      setAudio(props.element.audio);
      setQuiz(props.element.quiz);
      setNote(props.element.note);
      setFile(props.element.file);
    }
  }, []);

  useEffect(() => {
    setUnitError(false);
    for (let key in errors) {
      const ids = key.split("_");
      setErrorKeys(ids);

      if (ids[0] == props.sectionId + 1 && ids[1] == props.unitId + 1) {
        setUnitError(true);
        break;
      }
    }
  }, [errors]);

  useEffect(() => {
    if (props.element != null) {
      setName(props.element.name);
      setType(props.element.type);
      setVideo(props.element.video);
      setAudio(props.element.audio);
      setQuiz(props.element.quiz);
      setNote(props.element.note);
      setPreTest(props.element.preTest);
      setFile(props.element.file);
    }
  }, [props.element]);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const handleNameChange = (e) => {
    dispatch(
      curriculumActions.modifyUnitName({
        sectionId: props.sectionId,
        unitId: props.unitId,
        name: e.target.value,
      })
    );
    setName(e.target.value);
  };
  const handlePreTestChange = (e) => {
    setPreTest(e.target.value);
    dispatch(
      curriculumActions.modifyUnitPreTest({
        sectionId: props.sectionId,
        unitId: props.unitId,
        preTest: e.target.value,
      })
    );
  };
  const handleTypeChange = (e) => {
    dispatch(
      curriculumActions.modifyUnitType({
        sectionId: props.sectionId,
        unitId: props.unitId,
        type: e.target.value,
      })
    );
    setType(e.target.value);
  };
  const handleNoteChange = (value) => {
    setNote(value);
    dispatch(
      curriculumActions.modifyUnitNote({
        sectionId: props.sectionId,
        unitId: props.unitId,
        note: value,
      })
    );
  };
  const handleVideoUpload = (e) => {
    setVideo(e);
    dispatch(
      curriculumActions.modifyUnitVideo({
        sectionId: props.sectionId,
        unitId: props.unitId,
        video: e,
      })
    );
  };
  const deleteVideo = () => {
    setVideo({});
    dispatch(
      curriculumActions.modifyUnitVideo({
        sectionId: props.sectionId,
        unitId: props.unitId,
        video: {},
      })
    );
  };
  const handleFileUpload = (e) => {
    setFile(e);
    dispatch(
      curriculumActions.modifyUnitFile({
        sectionId: props.sectionId,
        unitId: props.unitId,
        file: e,
      })
    );
  };
  const deleteFile = () => {
    setFile({});
    dispatch(
      curriculumActions.modifyUnitFile({
        sectionId: props.sectionId,
        unitId: props.unitId,
        file: {},
      })
    );
  };
  const handleAudioUpload = (e) => {
    setAudio(e);
    dispatch(
      curriculumActions.modifyUnitAudio({
        sectionId: props.sectionId,
        unitId: props.unitId,
        audio: e,
      })
    );
  };
  const deleteAudio = () => {
    setAudio({});
    dispatch(
      curriculumActions.modifyUnitAudio({
        sectionId: props.sectionId,
        unitId: props.unitId,
        audio: {},
      })
    );
  };
  return (
    <Draggable draggableId={`0${props.unitId}`} index={props.unitId}>
      {(provided) => (
        <div className={`sublesson mt-2 ${unitError && "error-border"}`} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <div className="sublesson-head">
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item onClick={toggleCollapse} xs={11}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Menu />
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
                      <Grid item>
                        <h3>
                          {props.unitId + 1}. {name ? name : "Unit Name"}
                        </h3>
                      </Grid>
                      {type && (
                        <Grid item>
                          <Chip label={type} color="secondary" />
                        </Grid>
                      )}
                      {props.element && props.element.isConceptLink && (
                        <Grid item>
                          <Grid container spacing={2}>
                            <Grid item>
                              <Chip label="LO" color="secondary" />
                            </Grid>
                            <Grid item>
                              <Chip label={props.element.conceptName} color="secondary" />
                            </Grid>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1}>
                <Delete onClick={props.delete} />
              </Grid>
            </Grid>
          </div>
          {props.element && !props.element.isConceptLink && !collapsed && (
            <div className="sublesson-body">
              <Input
                label="Unit Name"
                value={name}
                id={"name"}
                type="text"
                name="name"
                onChange={handleNameChange}
                placeholder="Please enter the unit name"
                hideLabel={false}
                error={errors[`${props.sectionId + 1}_${props.unitId + 1}_name`]}
              />
              <div className="mt-2">
                <Select
                  label="Unit Type"
                  value={type}
                  id="type"
                  name="type"
                  onChange={handleTypeChange}
                  placeholder={"Select Unit type"}
                  hideLabel={false}
                  values={types}
                  error={errors[`${props.sectionId + 1}_${props.unitId + 1}_type`]}
                />
              </div>
              <div className="mt-3">
                {type == "video" && (
                  <VideoPicker setVideo={handleVideoUpload} video={video} deleteVideo={deleteVideo} error={errorKeys[2] == "video" && errors[`${props.sectionId + 1}_${props.unitId + 1}_video`]} />
                )}
                {type == "audio" && (
                  <AudioPicker setAudio={handleAudioUpload} audio={audio} deleteAudio={deleteAudio} error={errorKeys[2] == "audio" && errors[`${props.sectionId + 1}_${props.unitId + 1}_audio`]} />
                )}
                {type == "note" && <RichEditor callback={handleNoteChange} content={note} error={errorKeys[2] == "note" && errors[`${props.sectionId + 1}_${props.unitId + 1}_note`]} />}
                {type == "quiz" && <QuizCurriculum quiz={props.element.quiz} sectionId={props.sectionId} unitId={props.unitId} />}
                {type == "preTest" && (
                  <Select
                    label="Select a main concept to test the knowledge of the student"
                    id={"preTest"}
                    name={"preTest"}
                    onChange={handlePreTestChange}
                    value={preTest}
                    placeholder={"Please select the concept to be tested in the pre test"}
                    hideLabel={false}
                    class="mt-3"
                    values={concepts}
                  />
                )}
                {type == "file" && <FilePicker setFile={handleFileUpload} file={file} deleteFile={deleteFile} />}
              </div>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};
export default Unit;
