import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/instructors`;

export const addInstructor = async (data) => {
  const savedInstructor = await save(url, data);
  return savedInstructor;
};
export const getAllInstructors = async () => {
  const instructors = await getAll(url);
  return instructors;
};
