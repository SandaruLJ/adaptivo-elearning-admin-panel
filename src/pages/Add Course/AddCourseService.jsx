import { save } from "../../service/http.service";

const url = `${process.env.REACT_APP_BE_URL}api/courses`;

export const addCourse = async (data) => {
  const savedCourse = await save(url, data);
  console.log(savedCourse);
};
