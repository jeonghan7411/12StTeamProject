import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { deliveryDate } from "../../../../util/deliveryDate";
import Card from "../../../UI/Card";

import classes from "./OrderProduct.module.css";

const OrderProduct = ({ orderData }) => {
  console.log(orderData);

  const exex = new Date();
  exex.setDate(exex.getDate() + 3);
  const year = exex.getFullYear();
  const month = exex.getMonth();
  const date = exex.getDate();
  const day = exex.getDay();
  const asd = ["일", "월", "화", "수", "목", "금", "토"];
  console.log(`${year}년 ${month + 1}월 ${date}일 ${asd[day]}`);
  return (
    <div className={classes["orderProduct"]}>
      {orderData.map((data, key) => {
        return (
          <Fragment>
            <h4>
              배송 {orderData.length}건 중 {key + 1}
            </h4>

            <div className={classes["orderProduct-info"]} key={key}>
              <p className={classes["orderProduct-info__deliveryDate"]}>
                지금 결제시{" "}
                <span
                  className={classes["orderProduct-info__deliveryDate__date"]}
                >
                  {deliveryDate}
                </span>
                까지 도착 보장
              </p>

              <div className={classes["orderProduct-info__content"]}>
                <Card className={classes["orderProduct-info__content__img"]}>
                  <img src={data.image} alt={data.title} />
                </Card>

                <div className={classes["orderProduct-info-content__info"]}>
                  <Link to={"/products/" + data.productId}>
                    <p>상품명 : {data.title}</p>
                  </Link>
                  <p>구매수량 : {data.sQuantity}</p>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default OrderProduct;
