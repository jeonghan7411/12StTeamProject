import React from "react";
import classes from "./CancleReturnExchangeItem.module.css";
const CancleReturnExchangeItem = () => {
  return (
    <React.Fragment>
      <div className={classes["cre-wrap-content"]}>
        <div className={classes["cre-content-title"]}>
          <span>
            교환요청일 : <h2>2022.11.04</h2>
          </span>
          <div className={classes["cre-content-line"]}>|</div>
          <span>
            주문일 : <h2>2022.11.04</h2>
          </span>
          <div className={classes["cre-content-line"]}>|</div>
          <span>
            주문번호 : <h2>00001214</h2>
          </span>
        </div>

        <div className={classes["cre-content-content"]}>
          <div>내용</div>
          <div>수량가격</div>
          <div>요청상태</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CancleReturnExchangeItem;
