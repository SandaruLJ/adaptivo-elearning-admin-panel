import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgressWithLabel from "../../../components/LinearProgress/LinearProgresswithLabel";
import { cancelAudioUpload, uploadAudio } from "../../../service/concept.service";
import { conceptActions } from "../../../store/concept-slice";
import { convertSeconds, formatBytes } from "../../../helpers/utils";

const UploadAudio = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [duration, setDuration] = useState();
  const [fileName, setFileName] = useState();
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState();

  const dispatch = useDispatch();
  const audio = useSelector((state) => state.concept.learningObjects[props.loId - 1]["audio"]);

  useEffect(() => {
    setSource(audio.url);
    setFileName(audio.name);
    setFileSize(audio.size);
    setDuration(audio.duration);
    setProgress(100);
  }, []);

  const handleFileChange = async (event) => {
    if (file) {
      cancelAudioUpload();
      setProgress(0);
    }

    const f = event.target.files[0];
    const url = URL.createObjectURL(f);
    const fileSize = formatBytes(f.size);
    setFileSize(fileSize);
    setFile(f);
    setSource(url);
    setFileName(f.name);
    setUploadError(null);

    var media = new Audio(url);
    media.onloadedmetadata = function () {
      let duration = convertSeconds(media.duration);
      dispatch(
        conceptActions.modifyAudio({
          id: props.loId,
          audio: {
            name: f.name,
            duration: duration,
            size: fileSize,
            url: url,
          },
        })
      );
      setDuration(duration);
    };
    event.target.value = null;
    await uploadAudio(f, setProgress, setUploadError);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const retry = async () => {
    cancelAudioUpload();
    setProgress(0);
    await uploadAudio(file, setProgress, setUploadError);
  };

  const deleteFile = () => {
    setFile();
    setSource();
    dispatch(
      conceptActions.modifyAudio({
        id: props.loId,
        audio: {},
      })
    );
    cancelAudioUpload();
    setProgress(0);
  };

  return (
    <div className="sublesson mt-2">
      <div className="sublesson-head" onClick={toggleCollapse}>
        <Grid container spacing={2}>
          <Grid item>
            <Menu />
          </Grid>
          <Grid item>
            <h3>02. Upload Audio</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body">
          <label htmlFor="file-button-audio">
            <input className="image-input" onChange={handleFileChange} accept=".mp3" id="file-button-audio" multiple type="file" />

            <Grid container alignItems="center">
              <Grid item xs={10}>
                <div className="no-file">{source ? fileName : "No file selected"}</div>
              </Grid>
              <Grid item xs={2}>
                <Button className="outlined" component="span" endIcon={<FileUpload />}>
                  Upload Audio
                </Button>
              </Grid>
            </Grid>
          </label>
          <caption className="text-left mt-1">
            <strong>Note: </strong>All files should be atleast 720p and less than 4gb
          </caption>
          {source && (
            <Grid container justifyContent="space-between" className="mt-2" alignItems="center">
              <Grid item xs={11}>
                <audio className="audio_preview" controls src={source} />

                <h3>
                  <strong>{fileName}</strong>
                </h3>
                <h3>{duration}</h3>
                <h3>{fileSize}</h3>
                <LinearProgressWithLabel value={progress} />
                {uploadError && (
                  <h3 className="error">
                    Upload Failed,{" "}
                    <u onClick={retry} className="pointer">
                      Try Again
                    </u>
                  </h3>
                )}
              </Grid>
              <Grid item xs={1}>
                <Delete className="file-delete" onClick={() => deleteFile()} />
              </Grid>
            </Grid>
          )}
        </div>
      )}
    </div>
  );
};
export default UploadAudio;
