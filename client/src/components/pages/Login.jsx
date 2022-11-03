import React, { useState } from "react";
import Input from "../UI/Input";
import classes from "./Login.module.css";
const Login = () => {
  const [userID, setUserID] = useState("");
  const [userPW, setUserPW] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    /*
        axios.post로 로그인 요청 보내기
        백단에서 받아서 회원DB에서 해당 아이디 조회
        있으면 메시지 로그인성공 보내면서 redirect main
        없으면 alert redirect login
        */
  };
  return (
    <React.Fragment>
      <form
        method="post"
        className={classes["form-login"]}
        onSubmit={onSubmitLogin}
      >
        <Input
          type={"text"}
          onChange={(e) => setUserID(e.target.value)}
          placeholder={"아이디를 입력해주세요"}
          isValid={true}
          className={classes["form-login-input"]}
        />
        <Input
          type={"password"}
          onChange={(e) => setUserID(e.target.value)}
          placeholder={"비밀번호를 입력해주세요"}
          isValid={true}
          className={classes["form-login-input"]}
        />

        <div>
          <input type="submit" value={"로그인"} />
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
