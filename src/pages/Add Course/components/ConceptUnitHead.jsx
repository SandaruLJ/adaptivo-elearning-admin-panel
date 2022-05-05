import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Chip, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../../../components/Button/CustomButton";
import Input from "../../../components/Input/Input";
import LinearProgressWithLabel from "../../../components/LinearProgress/LinearProgresswithLabel";
import VideoPicker from "../../../components/VideoPicker/VideoPicker";
import Select from "../../../components/Select/SelectBox";

import { cancelVideoUpload, uploadVideo } from "../../../service/concept.service";
import { conceptActions } from "../../../store/concept-slice";
import AudioPicker from "../../../components/AudioPicker/AudioPicker";
import RichEditor from "../../../components/RichEditor/RichEditor";
import QuizCurriculum from "./QuizCurrculum";
import { curriculumActions } from "../../../store/curriculum-slice";

const ConceptUnitHead = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [name, setName] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.element == null) {
      //   dispatch(
      //     curriculumActions.addUnit({
      //       sectionId: props.sectionId,
      //       unitId: props.unitId,
      //       type: "",
      //       video: "",
      //       audio: "",
      //       resources: [],
      //       quiz: [],
      //       note: "",
      //     })
      //   );
    } else {
      setName(props.element.name);
    }
  }, []);
  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sublesson mt-2">
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <Delete onClick={props.delete} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Unit;
