import React from "react";

import classes from "./Nav.module.css";

const Nav = () => {
  return (
    <React.Fragment>
      <nav className={classes.Nav}>
        <div>
          <span>발로배송</span>
          <span> | </span>
          <span>베스트</span>
          <span>쿠폰 / 기획전</span>
          <span>발로배송</span>
          <span>발로배송</span>
          <span>발로배송</span>
        </div>

        <div>
          <span>🐣 이승현님</span>
          <span> | </span>
          <span>🌱 0</span>
          <span> | </span>
          <span>🌴 추가할것</span>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
