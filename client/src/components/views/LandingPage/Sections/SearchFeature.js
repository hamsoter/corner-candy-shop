import Search from "antd/lib/input/Search";
import React from "react";

function SearchFeature({ refreshFunction, searchTerm }) {
  // const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    refreshFunction(e.target.value);
  };

  return (
    <Search
      placeholder="꿈 이름, 설명을 검색"
      allowClear
      style={{
        maxWidth: "223px",
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
