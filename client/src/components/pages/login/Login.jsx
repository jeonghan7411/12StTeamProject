import React, { useState } from "react";
import Input from "../../UI/Input";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";
import iconGoogle from "../../../assets/icons/googleLogin.png";
import iconNaver from "../../../assets/icons/naverLogin.png";
import iconKakao from "../../../assets/icons/kakaoLogin.png";
import iconApple from "../../../assets/icons/appleLogin.png";
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
        <div className={classes["form-login-wrapper"]}>
          <div className={classes["form-login-input"]}>
            <Input
              type={"text"}
              onChange={(e) => setUserID(e.target.value)}
              placeholder={"아이디를 입력해주세요"}
              isValid={true}
            />
          </div>
          <div className={classes["form-login-input"]}>
            <Input
              type={"password"}
              onChange={(e) => setUserID(e.target.value)}
              placeholder={"비밀번호를 입력해주세요"}
              isValid={true}
            />
          </div>
          <div className={classes["form-login-handler"]}>
            <Input
              type={"submit"}
              value={"로그인"}
              isValid={true}
              className={classes["form-login-submit"]}
            ></Input>
          </div>
          <div className={classes["form-login-links"]}>
            <Link>아이디찾기</Link>
            <Link>비밀번호찾기</Link>
            <Link to={"/regist"}>회원가입</Link>
          </div>
          <div className={classes["form-login-non"]}>
            <Link>비회원 주문조회</Link>
          </div>
          <div className={classes["form-login-easy"]}>
            <img src={iconGoogle} alt="구글로그인이미지" />
            <img src={iconKakao} alt="카카오로그인이미지" />
            <img src={iconNaver} alt="네이버로그인이미지" />
            <img src={iconApple} alt="애플로그인이미지" />
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Login;
