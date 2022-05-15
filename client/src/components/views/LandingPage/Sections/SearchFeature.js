import Search from "antd/lib/input/Search";
import React from "react";

function SearchFeature({ refreshFunction, searchTerm }) {
  // const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    refreshFunction(e.target.value);
  };

  return (
    <Search
      placeholder="input search text"
      allowClear
      style={{
        width: "250px",
        margin: "1rem 0",
        display: "flex",
        alignSelf: "flex-end",
      }}
      onChange={searchHandler}
      value={searchTerm}
    />
  );
}

export default SearchFeature;
