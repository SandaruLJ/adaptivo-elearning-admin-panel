import { save } from "../../service/http.service";

const url = `${process.env.REACT_APP_BE_URL}api/questions`;

export const addQuestion = async (data) => {
  const savedQuestion = await save(url, data);
  console.log(savedQuestion);
};
