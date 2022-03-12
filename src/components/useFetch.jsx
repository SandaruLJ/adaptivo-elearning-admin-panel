import { useState, useEffect } from "react";
import { getAll } from "../service/http.service";

//This custom hook handles fetches
export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getData = async () => {
    //Fetches the data from the db
    const response = await getAll(url);
    const json = await response.json();
    //Set the data state
    setData(json);
    setLoading(false);
  };
  useEffect(() => {
    getData();
    console.log(data);
  }, [url]);

  return { loading, data };
};
