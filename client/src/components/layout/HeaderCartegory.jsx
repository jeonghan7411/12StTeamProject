import React from "react";

import classes from "./HeaderCartegory.module.css";

const HeaderCartegory = ({ onHide }) => {
  return (
    <React.Fragment>
      <div
        className={classes["headerCartegory-backdrop"]}
        onClick={onHide}
      ></div>

      <div className={classes["headerCartegory-slide"]}>
        <p>로그인</p>
        <h3>카테고리</h3>
      </div>
    </React.Fragment>
  );
};

export default HeaderCartegory;
