import { Delete, FileUpload } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { cancelAudioUpload, uploadAudio } from "../../service/learningResource.service";
import LinearProgressWithLabel from "../LinearProgress/LinearProgresswithLabel";

const AudioPicker = (props) => {
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [duration, setDuration] = useState();
  const [fileName, setFileName] = useState();
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState();

  const dispatch = useDispatch();
  const audio = props.audio;

  //   const audio = useSelector((state) => state.concept.learningObjects[props.loId - 1]["audio"]);

  useEffect(() => {
    if (props.audio != null) {
      setSource(audio.url);
      setFileName(audio.name);
      setFileSize(audio.size);
      setDuration(audio.duration);
      setProgress(100);
    }
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
      props.setAudio({
        name: f.name,
        duration: duration,
        size: fileSize,
        url: url,
      });
      setDuration(duration);
    };
    event.target.value = null;
    await uploadAudio(f, setProgress, setUploadError);
  };

  const retry = async () => {
    cancelAudioUpload();
    setProgress(0);
    await uploadAudio(file, setProgress, setUploadError);
  };

  const deleteFile = () => {
    setFile();
    setSource();
    cancelAudioUpload();
    setProgress(0);
    props.deleteAudio();
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
    <div>
      <label htmlFor="file-button-audio">
        <input className="image-input" onChange={handleFileChange} accept=".mp3" id="file-button-audio" multiple type="file" />

        <Grid container alignItems="center">
          <Grid item xs={10}>
            <div className={`no-file ${props.error && "error-border"}`}>{source ? fileName : "No file selected"}</div>
          </Grid>
          <Grid item xs={2}>
            <Button className={`outlined ${props.error && "error-border"}`} component="span" endIcon={<FileUpload />}>
              Upload Audio
            </Button>
          </Grid>
        </Grid>
      </label>
      <caption className="text-left mt-1">
        <strong>Note: </strong>All files should be in the mp3 format
        <p className="error">{props.error}</p>
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
  );
};
export default AudioPicker;
