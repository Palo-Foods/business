import { useState } from "react";

export const useF = (url, data, setData) => {
  const [token, setToken] = useState();

  useEffect(() => {
    const sessionExist = sessionStorage?.getItem("user");

    setToken(JSON.parse(sessionExist));
  }, []);

  const config = {
    method: "GET",
    headers: {
      ContentType: "application/json",
      Authorization: `Bearer ${sessionExist ? token : ""}`,
    },
    timeout: 5000,
  };

  const fetcher = (url, config) => fetch(url, config).then((r) => r.json());

  const { data, error, mutate } = useSWR([url, config], fetcher);

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  // 1. riders
  const fetchData = async () => {
    await mutate(url);
  };

  return { data, error, fetchData };
};
