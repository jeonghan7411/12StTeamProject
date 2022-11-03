import React, { useState } from "react";

import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
const Nav = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes["nav-category"]}>
          <span>발로배송</span>
          <span> | </span>
          <span>베스트</span>
          <span>쿠폰 / 기획전</span>
          <span>발로배송</span>
          <span>발로배송</span>
          <span>발로배송</span>
        </div>

        <div>
          {!isLogin && (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          )}

          {isLogin && (
            <div className={classes["nav-Login"]}>
              <span>🐣 떙떙떙 님</span>
              <span> | </span>
              <span>🌱 1000</span>
              <span> | </span>
              <div className={classes["nav-onOff"]}></div>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
