import React from "react";
import Button from "../UI/Button";
import { FaSearch } from "react-icons/fa";

import classes from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <React.Fragment>
      <header className={classes.header}>
        <div className={classes["header-wrap-left"]}>
          <h1>11번가 옆에 12번가</h1>
        </div>

        <form className={classes["header-wrap-center"]}>
          <div>
            <span onClick={() => setIsShow(!isShow)}>통합검색</span>
          </div>
          <div className={classes["header-search-input"]}>
            <input type="text" />
          </div>
          <div>
            <Button
              className={classes["header-search-btn"]}
              type="submit"
              text={"adada"}
            />
          </div>
        </form>

        <div className={classes["header-wrap-right"]}>
          <span>🐶</span>
          <span>🐥</span>
          <span>🐔</span>
          <span>🐷</span>
        </div>
      </header>

      {isShow && (
        <div className={classes.category}>
          <div>asdsad</div>
          <div>asdsad</div>
          <div>sadasd</div>
          <div>sadasd</div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Header;
