import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/categories`;

export const addCourse = async (data) => {
  const savedCourse = await save(url, data);
  return savedCourse;
};
export const getAllCourses = async () => {
  const courses = await getAll(url);
  return courses;
};
