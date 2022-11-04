import React from "react";

import RegistSection from "./RegistSection";
import RegistSectionInput from "./SectionUserInfoInput";

import classes from "./Regist.module.css";
import Clause from "./Clause";

const Regist = () => {
  return (
    <div className={classes.regist}>
      <header className={classes["regist-haader"]}>
        <h2>회원가입</h2>
      </header>
      <RegistSection title={"1 정보입력"}>
        <RegistSectionInput />
      </RegistSection>
      <RegistSection title="2 약관동의">
        <Clause />
      </RegistSection>
      <div className={classes["regist-control"]}>
        <button className={classes["regist-control-cencel"]}>취소</button>
        <button className={classes["regist-control-regist"]}>회원가입</button>
      </div>
    </div>
  );
};

export default Regist;
