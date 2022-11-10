import React from "react";

import classes from "./CrlWrite.module.css";
import MyPageListTitle from "./MyPageListTitle";

const CrlWrite = () => {
  return (
    <React.Fragment>
      <div className={classes.CrlWrite}>
        <MyPageListTitle text={"취소 반품 교환 신청"} />
      </div>
    </React.Fragment>
  );
};

export default CrlWrite;
