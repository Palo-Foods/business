import { useEffect, useState } from "react";

export const useCategoryFilter = (dataToFilter, condition) => {
  const [filteredData, setFilteredData] = useState();

  //filter with regions
  useEffect(() => {
    if (condition) {
      if (condition !== "All") {
        //filter for region
        const newData = dataToFilter?.filter(
          (data) => data?.category === condition
        );
        setFilteredData(newData);
      } else {
        setFilteredData();
      }
    }
  }, [condition]);

  return { filteredData };
};
