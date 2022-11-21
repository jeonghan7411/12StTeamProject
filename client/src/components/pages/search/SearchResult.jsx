import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchItem from "./SearchItem";

import classes from "./SearchResult.module.css";

const SearchResult = () => {
  const location = useLocation();
  const [searchData, setSearchData] = useState(location.state.result);

  console.log(searchData);
  return (
    <div className={classes.searchResult}>
      <h4 className={classes["searchResult-title"]}>
        검색결과
        <span className={classes["searchResult-title-amount"]}>
          {searchData.length}
        </span>
        건
      </h4>

      <div className={classes["searchResult-items"]}>
        {searchData.map((it) => (
          <SearchItem key={it} data={it} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
