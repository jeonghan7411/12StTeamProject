import React from "react";
import classes from "./Login.module.css";
const Login = () => {
  return (
    <React.Fragment>
      <form method="post" className={classes["form-login"]}>
        <input type="text" placeholder="아이디" />
        <input type="password" placeholder="비밀번호" />
        <input type="submit" value={"로그인"} />
      </form>
    </React.Fragment>
  );
};

export default Login;
