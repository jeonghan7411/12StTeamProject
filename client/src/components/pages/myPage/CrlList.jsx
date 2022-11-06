import React from "react";

import MyPageListTitle from "./MyPageListTitle";
import CancleReturnExchangeItem from "./CancleReturnExchangeItem";
import classes from "./CrlList.module.css";

const CrlList = () => {
  return (
    <React.Fragment>
      <div className={classes.CrlListd}>
        <MyPageListTitle text={"취소 반품 교환 목록"} />

        <CancleReturnExchangeItem />
        <CancleReturnExchangeItem />
        <CancleReturnExchangeItem />
        <CancleReturnExchangeItem />
        <CancleReturnExchangeItem />
      </div>
    </React.Fragment>
  );
};

export default CrlList;
