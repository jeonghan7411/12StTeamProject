import React from "react";

import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Nav = () => {
  // const [isLogin, setIsLogin] = useState(false);
  const [userToken, setUserToken] = useState(false);
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes["nav-category"]}>
          <Link>발로배송</Link>
          <span> | </span>
          <Link to={"/productsBest"}>베스트</Link>
          <Link>쿠폰 / 기획전</Link>
          <Link>발로배송</Link>
          <Link>발로배송</Link>
          <Link>발로배송</Link>
        </div>

        <div>
          {userToken === false ? (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          ) : (
            <div className={classes["nav-Login"]}>
              <span>
                🐣 <Link to="/mypage">ddd</Link> 님
              </span>
              <span> | </span>
              <span>🌱 1000</span>
              <span> | </span>
              <button className={classes["nav-onOff"]}>
                <Link to="/logout">로그아웃</Link>
              </button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
