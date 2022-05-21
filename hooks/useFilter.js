import { useEffect, useState } from "react";

export const useFilter = (dataToFilter, condition) => {
  const [filteredData, setFilteredData] = useState();

  //filter with regions
  useEffect(() => {
    if (condition) {
      if (condition !== "All") {
        //filter for region
        const newData = dataToFilter?.filter(
          (data) => data?.region === condition
        );
        setFilteredData(newData);
      } else {
        setFilteredData();
      }
    }
  }, [condition]);

  return { filteredData };
};
