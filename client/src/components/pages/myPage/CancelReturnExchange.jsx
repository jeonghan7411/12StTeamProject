import React from "react";
import classes from "./CancelReturnExchange.module.css";
const CancelReturnExchange = () => {
  return (
    <React.Fragment>
      <div className={classes.CancelReturnExchange}>
        <div className={classes["cre-wrap-title"]}>
          <div>
            <h2>취소 반품 교환 목록</h2>
          </div>
        </div>

        <div className={classes["cre-wrap-content"]}>
          <div className={classes["cre-content-title"]}>교환날짜</div>
          <div>
            <div>내용</div>
            <div>수량가격</div>
            <div>요청상태</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CancelReturnExchange;
