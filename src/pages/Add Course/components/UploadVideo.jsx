import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgressWithLabel from "../../../components/LinearProgress/LinearProgresswithLabel";
import { convertSeconds, formatBytes } from "../../../helpers/utils";

import { cancelVideoUpload, uploadVideo } from "../../../service/concept.service";
import { conceptActions } from "../../../store/concept-slice";

const UploadVideo = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [source, setSource] = useState();
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [duration, setDuration] = useState();
  const [fileName, setFileName] = useState();
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.concept.learningObjects[props.loId - 1][props.style][props.type]);

  useEffect(() => {
    if (video) {
      setSource(video.url);
      setFileName(video.name);
      setFileSize(video.size);
      setDuration(video.duration);
      setProgress(100);
    }
  }, []);

  const handleFileChange = async (event) => {
    if (file) {
      cancelVideoUpload();
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
        conceptActions.modifyFile({
          id: props.loId,
          style: props.style,
          type: props.type,
          file: {
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

    await uploadVideo(f, setProgress, setUploadError);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const retry = async () => {
    cancelVideoUpload();
    setProgress(0);
    await uploadVideo(file, setProgress, setUploadError);
  };

  const deleteFile = () => {
    setFile();
    setSource();
    dispatch(
      conceptActions.modifyVideo({
        id: props.loId,
        video: {},
      })
    );
    cancelVideoUpload();
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
            <h3>{props.title ? props.title : "01. Upload Video"}</h3>
          </Grid>
        </Grid>
      </div>
      {!collapsed && (
        <div className="sublesson-body">
          <label htmlFor="file-button">
            <input className="image-input" onChange={handleFileChange} accept=".mov,.mp4,.mkv" id="file-button" multiple type="file" />

            <Grid container alignItems="center">
              <Grid item xs={10}>
                <div className="no-file">{source ? fileName : "No file selected"}</div>
              </Grid>
              <Grid item xs={2}>
                <Button className="outlined" component="span" endIcon={<FileUpload />}>
                  Upload Video
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
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <video className="video_preview" width={250} height={150} controls src={source} />
                  </Grid>
                  <Grid item xs={8}>
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
                </Grid>
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
export default UploadVideo;
