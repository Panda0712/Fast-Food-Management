/* eslint-disable react/prop-types */

import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = searchParams.get("sortBy") || "";

  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={currentParams}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
};

export default SortBy;
