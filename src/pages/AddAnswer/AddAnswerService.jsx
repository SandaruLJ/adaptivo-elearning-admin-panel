import { save } from "../../service/http.service";

const url = `${process.env.REACT_APP_BE_URL}api/answers`;

export const addAnswer = async (data) => {
  const savedAnswer = await save(url, data);
  console.log(savedAnswer);
};
