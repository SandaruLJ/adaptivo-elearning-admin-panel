import { getAll, save } from "./http.service";
import axios from "axios";

const url = `${process.env.REACT_APP_BE_URL}api/courses`;

export const addCourse = async (data) => {
  const savedCourse = await save(url, data);
  return savedCourse;
};
export const getAllCourses = async () => {
  const courses = await getAll(url);
  return courses;
};

let thumbnailController = new AbortController();
let trailerController = new AbortController();

export const getThumbnailSignedUrl = async (fileName) => {
  const signedUrl = await getAll(`${url}/url/thumbnail/${fileName}`);
  return signedUrl;
};

export const getTrailerSignedUrl = async (fileName) => {
  const signedUrl = await getAll(`${url}/url/trailer/${fileName}`);
  return signedUrl;
};

export const cancelThumbnailUpload = () => {
  thumbnailController.abort();
};
export const cancelTrailerUpload = () => {
  trailerController.abort();
};

export const uploadThumbnail = async (file, setProgress, setUploadError) => {
  const signedUrl = await getThumbnailSignedUrl(file.name);
  thumbnailController = new AbortController();

  var config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    },
    signal: thumbnailController.signal,
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

export const uploadTrailer = async (file, setProgress, setUploadError) => {
  const signedUrl = await getTrailerSignedUrl(file.name);
  trailerController = new AbortController();

  var config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setProgress(percentCompleted);
    },
    signal: trailerController.signal,
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
