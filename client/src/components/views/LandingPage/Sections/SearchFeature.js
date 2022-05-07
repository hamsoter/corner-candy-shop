import Search from "antd/lib/input/Search";
import React from "react";

function SearchFeature() {
  return (
    <Search
      placeholder="input search text"
      allowClear
      style={{ width: "250px" }}
    />
  );
}

export default SearchFeature;
