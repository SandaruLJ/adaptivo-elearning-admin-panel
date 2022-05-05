import { getAll, save } from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/users`;

export const addUser = async (data) => {
  console.log(data);
  const savedUser = await save(url, data);
  return savedUser;
};
export const getAllUsers = async () => {
  const users = await getAll(url);
  return users;
};
