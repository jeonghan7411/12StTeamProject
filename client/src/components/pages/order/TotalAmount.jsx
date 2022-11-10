import React, { useEffect, useState } from "react";

import classes from "./TotalAmount.module.css";

const TotalAmount = ({ orderData }) => {
  const [deleveryFee, setDeleveryFee] = useState(2500);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    orderData.map((data) => {
      return setTotalPrice(totalPrice + data.price * data.amount);
    });
  }, []);

  return (
    <div className={classes.totalAmount}>
      <p className={classes["totalAmount-title"]}>최종 결제 내역</p>
      <div className={classes["totalAmount-content"]}>
        <div>
          <p>총 상품가격</p>
          <p>즉시 할인</p>
          <p>배송비</p>
          <p>마일리지 사용</p>
        </div>

        <div className={classes["totalAmount-amount"]}>
          <span>{totalPrice}원</span>
          <span>-1000원</span>
          <span>{deleveryFee}원</span>
          <span>1000원</span>
        </div>
      </div>

      <div className={classes["totalAmount-final"]}>
        <p>총 결제금액</p>
        <p className={classes.amount}>{totalPrice + deleveryFee}원</p>
      </div>
    </div>
  );
};

export default TotalAmount;
