import React from "react";

import classes from "./Order.module.css";
import TotalAmount from "./TotalAmount";

const Order = () => {
  return (
    <div className={classes.order}>
      <h3>주문 / 결제</h3>

      <div className={classes["order-detail"]}>
        <span className={classes["order-detail-title"]}>배송 ?건중 ?건</span>
        <div className={classes["order-detail-content"]}>
          <p className={classes["order-delivery"]}>도착일</p>
          <div className={classes["order-content"]}>
            <p>상품명</p>
            <p>구매수량</p>
          </div>
        </div>
      </div>

      <div className={classes.paymentMethod}>
        <p>결제수단</p>
        <div className={classes["paymentMethod-select"]}>
          <input type="radio" id="ownPay" />
          <label htmlFor="ownPay">??페이</label>
        </div>
        <div className={classes["paymentMethod-select"]}>
          <input type="radio" id="deposit" />
          <label htmlFor="deposit">계좌이체/무통장입금</label>
        </div>
        <div className={classes["paymentMethod-select"]}>
          <input type="radio" id="card" />
          <label htmlFor="card">신용/체크카드</label>
        </div>

        <div className={classes["paymentMethod-select-detail"]}>
          <div>??카드</div>
          <div>일시불 (5만원 이상 할부 가능)</div>

          <div className={classes["paymentMethod-btn"]}>
            <button>선택완료</button>
          </div>
        </div>

        <div className={classes["paymentMethod-select"]}>
          <input type="radio" id="phonePay" />
          <label htmlFor="phonePay">휴대폰</label>
        </div>
      </div>

      <TotalAmount />
    </div>
  );
};

export default Order;
