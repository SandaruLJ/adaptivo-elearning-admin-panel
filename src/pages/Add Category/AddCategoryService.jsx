import { save } from "../../service/http.service";

const url = `${process.env.REACT_APP_BE_URL}api/categories`;

export const addCategory = async (data) => {
    const savedCategory = await save(url, data);
    console.log(savedCategory);
};
