import { useState, useEffect } from "react";
import { getData } from '../utils';

const useFetchData = (type, preData = []) => {

  const [fetchData, setFetchData] = useState({
    data: preData,
    isLoading: !preData.length,
    error: null
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        let data;

        if(typeof type === 'string') {
          data = await getData({ type });
        } else if (typeof type === 'function') {
          data = await type();
        } else {
          throw new Error(`must be a type function or string.`);
        }
        
        setFetchData({
          ...fetchData,
          data,
          isLoading: false,
        })
      } catch (error) {
        setFetchData({
          ...fetchData,
          isLoading: false,
          error: `Failed to load latest ${type} ${error}`
        })
      }
    }

    if(!preData.length) fetch();
  }, []);

  const { data, isLoading, error } = fetchData;
  return [data, isLoading, error];
};

export default useFetchData;