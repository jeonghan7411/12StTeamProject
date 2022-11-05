import React from "react";

import { useNavigate } from "react-router-dom";

import RegistSection from "./RegistSection";
import RegistSectionInput from "./SectionUserInfoInput";
import Clause from "./Clause";

import kakao from "../../../assets/icons/kakaoLogin.png";
import naver from "../../../assets/icons/naverLogin.png";
import google from "../../../assets/icons/googleLogin.png";
import apple from "../../../assets/icons/appleLogin.png";

import classes from "./Regist.module.css";

const Regist = () => {
  const navigate = useNavigate();

  return (
    <div className={classes.regist}>
      <header className={classes["regist-header"]}>
        <h2>회원가입</h2>
      </header>

      <section className={classes["regist-simple"]}>
        <h3>간편하게 회원가입하기</h3>

        <div className={classes["regist-simple-items"]}>
          <div>
            <img src={kakao} alt="kakao 간편가입" />
          </div>
          <div>
            <img src={naver} alt="naver 간편가입" />
          </div>
          <div>
            <img src={google} alt="google 간편가입" />
          </div>
          <div>
            <img src={apple} alt="apple 간편가입" />
          </div>
        </div>
      </section>

      <RegistSection title={"1 정보입력"}>
        <RegistSectionInput />
      </RegistSection>
      <RegistSection title="2 약관동의">
        <Clause />
      </RegistSection>
      <div className={classes["regist-control"]}>
        <button
          className={classes["regist-control-cencel"]}
          onClick={() => navigate("/")}
        >
          취소
        </button>
        <button
          className={classes["regist-control-regist"]}
          onClick={() => navigate("/")}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Regist;
