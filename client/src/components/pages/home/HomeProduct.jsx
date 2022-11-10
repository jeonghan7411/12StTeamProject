import React, { useState } from "react";
import { Link } from "react-router-dom";

import Card from "../../UI/Card";

import classes from "./HomeProduct.module.css";

const DUMMY_URL =
  "https://cdn.011st.com/11dims/resize/x300/11src/pd/v2/8/4/4/3/3/0/Xbjtt/5090844330_L300.jpg";

const Product = (props) => {
  // SQL에서 할인율 컬럼에 랜덤난수 0~40 부여하고 여기 구문 수정하기
  let disc = Math.floor(Math.random() * 40);
  let originalPrice = props.data.price;
  let discPrice =
    Math.ceil((props.data.price * ((100 - disc) / 10)) / 100) * 10;
  return (
    <Link
      to={`/products/${props.data.productId}`}
      className={`${classes.product} ${props.className}`}
    >
      <Card>
        {props.children}
        <Card className={classes["product-img"]}>
          <img src={props.data.image} alt="" />
        </Card>
        <div className={classes["product-content"]}>
          <h3 className={classes["product-content-title"]}>
            {props.data.title.substring(0, 13)}
          </h3>
          <div className={classes["product-content-priceInfo"]}>
            <span className={classes["product-content-discount"]}>{disc}%</span>
            <div className={classes["product-content-priceWrap"]}>
              <span className={classes["product-content-price"]}>
                {discPrice}원
              </span>
              <span className={classes["product-content-costPrice"]}>
                {originalPrice}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Product;
