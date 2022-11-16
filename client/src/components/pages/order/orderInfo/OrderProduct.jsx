import React from "react";
import { Link } from "react-router-dom";
import { deliveryDate } from "../../../../util/deliveryDate";
import Card from "../../../UI/Card";

import classes from "./OrderProduct.module.css";

const OrderProduct = ({ orderData }) => {
  console.log(orderData);
  return (
    <div className={classes["orderProduct"]}>
      <h4>
        {/* 1을 map 돌릴때 수정 */}
        배송 {orderData.length}건 중 1
      </h4>
      {orderData.map((data, key) => {
        return (
          <div className={classes["orderProduct-info"]} key={key}>
            <p className={classes["orderProduct-info__deliveryDate"]}>
              {deliveryDate}
            </p>

            <div className={classes["orderProduct-info__content"]}>
              <Card className={classes["orderProduct-info__content__img"]}>
                <img src={data.image} alt={data.title} />
              </Card>

              <div className={classes["orderProduct-info-content__info"]}>
                <Link to={"/products/" + data.productId}>
                  <p>상품명 : {data.title}</p>
                </Link>
                <p>구매수량 : {data.amount}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderProduct;
