import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./Order.module.css";
import TotalAmount from "./TotalAmount";

const Order = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);
  console.log(orderData);
  return (
    <div className={classes.order}>
      <h3>주문 / 결제</h3>

      <div className={classes["order-detail"]}>
        <span className={classes["order-detail-title"]}>
          총 상품 갯수 : {orderData.length}개
        </span>
        {orderData.map((data, key) => {
          return (
            <div className={classes["order-detail-content"]} key={key}>
              <p className={classes["order-delivery"]}>도착일</p>

              <div className={classes["order-content"]}>
                <div className={classes["order-content-info"]}>
                  <Link to={"/products/" + data.productId}>
                    <p>상품명 : {data.title}</p>
                  </Link>
                  <p>구매수량 : {data.amount}</p>
                </div>
                <div className={classes["order-content-img"]}>
                  <img src={data.image} alt={data.title} />
                </div>
              </div>
            </div>
          );
        })}
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

      <TotalAmount orderData={orderData} />
    </div>
  );
};

export default Order;
