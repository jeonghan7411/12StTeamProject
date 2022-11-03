import React from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";

import classes from "./Header.module.css";

const Header = () => {
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>11번가 옆에 12번가</h1>

        <form className={classes["header-search"]}>
          <select className={classes["header-search-select"]}>
            <option>통합검색</option>
          </select>

          <input className={classes["header-search-input"]} type="text" />
          <Button
            className={classes["header-search-btn"]}
            type="submit"
            text="🍭"
          />
        </form>

        <div className={classes["header-control"]}>
          <span>🐶</span>
          <span>🐥</span>
          <span>🐔</span>
          <span>🐷</span>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
