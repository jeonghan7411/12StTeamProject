import React from "react";

import CancleReturnExchangeItem from "./CancleReturnExchangeItem";
import classes from "./CrlList.module.css";

const CrlList = () => {
  return (
    <React.Fragment>
      <div className={classes.CrlListd}>
        <div className={classes["cre-wrap-title"]}>
          <div>
            <h2>취소 반품 교환 목록</h2>
          </div>
        </div>
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
