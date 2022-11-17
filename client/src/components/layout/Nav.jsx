import React, { useEffect } from "react";
import axios from "axios";
import classes from "./Nav.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getUserName, handleLogout } from "../../util/authCheck";
const Nav = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState({});
  useEffect(() => {
    const isLogin = async () => {
      await axios
        .get("http://localhost:5000/login/api/login/success", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data === "timeout") {
            handleLogout();
          } else if (response.data === "noInfo") {
            setIsLogin(false);
          } else if (response.data === "login") {
            setIsLogin(true);
          }
        });
    };

    getUserName(setUsername);
    isLogin();
  }, []);
  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <div className={classes["nav-category"]}>
          <Link to={"/productsBest"}>베스트</Link>
          <span> | </span>
          <Link>생활/건강</Link>
          <Link>디지털/가전</Link>
          <Link>패션잡화</Link>
          <Link>가구/인테리어</Link>
          <Link>출산/육아</Link>
          <Link>패션의류</Link>
          <Link>식품</Link>
          <Link>스포츠/레저</Link>
        </div>

        <div>
          {isLogin === false ? (
            <div className={classes["nav-nonLogin"]}>
              <Link to={"/login"}>로그인</Link>
              <Link to={"/regist"}>회원가입</Link>
            </div>
          ) : (
            <div className={classes["nav-Login"]}>
              <span>
                🐣 <Link to="/mypage">{username.uName}</Link> 님
              </span>
              <span> | </span>
              <span>🌱 {username.uMile}</span>
              <span> | </span>
              <button className={classes["nav-onOff"]}>
                <button onClick={handleLogout}>로그아웃</button>
              </button>
            </div>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
