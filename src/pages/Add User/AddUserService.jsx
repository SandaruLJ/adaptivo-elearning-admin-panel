import { save } from "../../service/http.service";

const url = `${process.env.REACT_APP_BE_URL}api/users`;

export const addUser = async (data) => {
  const savedUser = await save(url, data);
  console.log(savedUser);
};
