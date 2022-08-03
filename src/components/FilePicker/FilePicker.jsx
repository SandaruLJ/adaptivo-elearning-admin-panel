import { Delete, FileUpload, Menu } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LinearProgressWithLabel from "../../components/LinearProgress/LinearProgresswithLabel";
import { formatBytes } from "../../helpers/utils";
import { cancelFileUpload, uploadFile } from "../../service/learningResource.service";

const FilePicker = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [file, setFile] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileName, setFileName] = useState();
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState();
  const dispatch = useDispatch();
  const state = props.file;

  useEffect(() => {
    if (props.file != null) {
      setFileName(state.name);
      setFileSize(state.size);
      setProgress(100);
    }
  }, []);
  const handleFileChange = async (event) => {
    if (file) {
      cancelFileUpload();
      setProgress(0);
    }
    const f = event.target.files[0];

    const fileSize = formatBytes(f.size);
    setFileSize(fileSize);
    setFile(f);
    setFileName(f.name);
    setUploadError(null);

    props.setFile({
      name: f.name,
      size: fileSize,
    });

    event.target.value = null;
    await uploadFile(f, setProgress, setUploadError);
  };

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
  const retry = async () => {
    cancelFileUpload();
    setProgress(0);
    await uploadFile(file, setProgress, setUploadError);
  };
  const deleteFile = () => {
    setFile();
    setFileName();
    setFileSize();
    props.deleteFile();
    cancelFileUpload();
    setProgress(0);
  };

  return (
    <div>
      <label htmlFor="file-button">
        <input className="image-input" onChange={handleFileChange} accept="image/*,application/pdf" id="file-button" multiple type="file" />

        <Grid container alignItems="center">
          <Grid item xs={10}>
            <div className="no-file">{fileName ? fileName : "No file selected"}</div>
          </Grid>
          <Grid item xs={2}>
            <Button className="outlined" component="span" endIcon={<FileUpload />}>
              Upload File
            </Button>
          </Grid>
        </Grid>
      </label>
      <caption className="text-left mt-1">
        <strong>Note: </strong>A resource is for any type of document that can be used to help students in the lecture. Make sure everything is legible and the file size is less than 1 GiB.
      </caption>
      {fileName && (
        <Grid container justifyContent="space-between" className="mt-2" alignItems="center">
          <Grid item xs={11}>
            <h4>
              <strong>{fileName}</strong>
            </h4>

            <h4>{fileSize}</h4>
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
export default FilePicker;
