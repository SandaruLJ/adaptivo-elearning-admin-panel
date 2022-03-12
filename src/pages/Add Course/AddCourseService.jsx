import { save } from "../../service/http.service";

const url = process.env.PUBLIC_URL + "/courses";

const addCourse = async (data) => {
    const savedCourse = await save(url,data);
    console.log(savedCourse)
};
