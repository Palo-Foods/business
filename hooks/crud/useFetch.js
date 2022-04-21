/**
 * 1. Custom hook for fetching data
 * 2. Functions: read, fetch items,
 * 3. Parameters: url
 **/

import { useEffect, useState } from "react";
import { read } from "../../functions/crud/FETCH";
import { useStates } from "../useStates";

export const useFetch = (url) => {
  const { loading, setLoading, error, setError } = useStates();

  const [items, setItems] = useState();

  //fetch data from the backend
  async function fetchItems() {
    setLoading(true);
    const { response, error } = await read(url);
    setLoading(false);
    if (response) {
      const { data, error } = response;
      setItems(data);
      setError(error);
    } else {
      setError(error);
    }
  }

  //fetch items
  useEffect(() => {
    fetchItems();
  }, []);

  return { loading, error, items };
};
