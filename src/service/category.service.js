import {getAll, save} from "./http.service";

const url = `${process.env.REACT_APP_BE_URL}api/categories`;

export const addCategory = async (data) => {
    const savedCategory = await save(url, data);
    return savedCategory;
}
export const getAllCategory = async () => {
        const Category = await getAll(url);
        return Category;
    }



;
