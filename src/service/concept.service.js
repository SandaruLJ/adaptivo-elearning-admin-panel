import axios from "axios";
import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/concepts`;
let videoController = new AbortController();
let audioController = new AbortController();

export const addConcept = async (data) => {
  const savedConcept = await save(url, data);
  return savedConcept;
};
export const getVideoSignedUrl = async (fileName) => {
  const signedUrl = await getAll(`${url}/url/video/${fileName}`);
  return signedUrl;
};
export const getAllConcepts = async () => {
  const concepts = await getAll(url);
  return concepts;
};

export const getAudioSignedUrl = async (fileName) => {
  const signedUrl = await getAll(`${url}/url/audio/${fileName}`);
  return signedUrl;
};

export const cancelVideoUpload = () => {
  videoController.abort();
};

export const cancelAudioUpload = () => {
  audioController.abort();
};

export const uploadVideo = async (file, setProgress, setUploadError) => {
  const signedUrl = await getVideoSignedUrl(file.name);
  videoController = new AbortController();

  var config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    },
    signal: videoController.signal,
  };

  axios
    .put(signedUrl.url, file, config)
    .then(function (res) {
      console.log("File Uploaded");
      setUploadError(null);
    })
    .catch(function (err) {
      console.log(err);
      setUploadError(err);
      setProgress(0);
    });
};
export const uploadAudio = async (file, setProgress, setUploadError) => {
  const signedUrl = await getAudioSignedUrl(file.name);
  audioController = new AbortController();

  var config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    },
    signal: audioController.signal,
  };

  axios
    .put(signedUrl.url, file, config)
    .then(function (res) {
      console.log("File Uploaded");
      setUploadError(null);
    })
    .catch(function (err) {
      console.log(err);
      setUploadError(err);
      setProgress(0);
    });
};
