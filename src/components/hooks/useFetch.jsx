/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState();
  const getData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData(url);
  }, []);

  return data;
};

export default useFetch;
