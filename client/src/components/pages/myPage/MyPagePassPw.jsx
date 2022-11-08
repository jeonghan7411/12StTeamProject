import React from "react";
import RegistSection from "../regist/RegistSection";

import classes from "./MyPagePassPw.module.css";

const MyPagePassPw = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
