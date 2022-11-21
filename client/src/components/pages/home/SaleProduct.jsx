import React from "react";
import { RiItalic, RiShoppingCart2Line } from "react-icons/ri";
import Card from "../../UI/Card";

import classes from "./SaleProduct.module.css";

const SaleProduct = ({ data }) => {
  return (
    <Card className={classes.saleProduct}>
      <div className={classes["saleProduct-img"]}>
        <img src={data.image} alt={data.title} />
      </div>

      <div className={classes["saleProduct-infoWrap"]}>
        <div className={classes["saleProduct-info"]}>
          <p className={classes["saleProduct-info-price"]}>
            {data.price.toLocaleString("ko-kr")}원
            <span className={classes["saleProduct-info-price__percent"]}>
              {data.pDiscount}%
            </span>
          </p>
          <p className={classes["saleProduct-info-title"]}>{data.title}</p>
        </div>

        <p className={classes["saleProduct-info-review"]}>
          <span className={classes["saleProduct-info-review__star"]}>★</span>
          <span>{`상품평 ( ${data.pReviewCount} )`}</span>
          <span className={classes["saleProduct-info-review__split"]}>|</span>

          <span>{`누적 판매량 ( ${data.pReviewCount} )`}</span>
          <span className={classes["saleProduct-info-review__cart"]}>
            <RiShoppingCart2Line />
          </span>
        </p>
      </div>
    </Card>
  );
};

export default SaleProduct;
