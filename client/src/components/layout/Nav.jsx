import React from "react";

import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
const Nav = ({ userToken }) => {
  // const [isLogin, setIsLogin] = useState(false);
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
          {/* {!isLogin && (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          )} */}

          {!userToken ? (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          ) : (
            <div className={classes["nav-Login"]}>
              <span>🐣 떙떙떙 님</span>
              <span> | </span>
              <span>🌱 1000</span>
              <span> | </span>
              <div className={classes["nav-onOff"]}></div>
            </div>
          )}

          {/* {isLogin && (
            <div className={classes["nav-Login"]}>
              <span>🐣 떙떙떙 님</span>
              <span> | </span>
              <span>🌱 1000</span>
              <span> | </span>
              <div className={classes["nav-onOff"]}></div>
            </div>
          )} */}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
