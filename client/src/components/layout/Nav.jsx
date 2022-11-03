import React from "react";

import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
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
          <Link to={"/login"}>로그인</Link>
          <Link to={"/regist"}>회원가입</Link>
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
