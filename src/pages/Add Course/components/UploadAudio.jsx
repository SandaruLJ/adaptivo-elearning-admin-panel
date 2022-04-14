import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conceptActions } from "../../../store/concept-slice";

const UploadAudio = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [duration, setDuration] = useState();
  const [fileName, setFileName] = useState();
  const dispatch = useDispatch();
  const audio = useSelector((state) => state.concept.learningObjects[props.loId - 1]["audio"]);

  useEffect(() => {
    setSource(audio.url);
    setFileName(audio.name);
    setFileSize(audio.size);
    setDuration(audio.duration);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const fileSize = formatBytes(file.size);
    setFileSize(fileSize);
    setFile(file);
    setSource(url);
    setFileName(file.name);

    var media = new Audio(url);
    media.onloadedmetadata = function () {
      let duration = convertSeconds(media.duration);
      dispatch(
        conceptActions.modifyAudio({
          id: props.loId,
          audio: {
            name: file.name,
            duration: duration,
            size: fileSize,
            url: url,
          },
        })
      );
      setDuration(duration);
    };
    event.target.value = null;
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
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
  };
  function convertSeconds(seconds) {
    var convert = function (x) {
      return x < 10 ? "0" + x : x;
    };
    return convert(parseInt(seconds / (60 * 60))) + ":" + convert(parseInt((seconds / 60) % 60)) + ":" + Math.floor(convert(seconds % 60));
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

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
