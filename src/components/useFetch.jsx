import { useState, useEffect } from "react";
import { getAll } from "../service/http.service";

//This custom hook handles fetches
export const useFetch = (method) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    //Fetches the data from the db
    const response = await method();
    setData(response);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, [method]);

  return { loading, data };
};
