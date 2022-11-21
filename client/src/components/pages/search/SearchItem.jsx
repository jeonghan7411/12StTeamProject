import React from "react";

import Card from "../../UI/Card";

import { RiShoppingCart2Line } from "react-icons/ri";

import classes from "./SearchItem.module.css";
import { Link } from "react-router-dom";

const SearchItem = ({ data }) => {
  return (
    <div className={classes.searchItem}>
      <Link
        className={classes["product-link"]}
        to={`/products/${data.productId}`}
      >
        <Card className={classes["searchItem-img"]}>
          <img src={data.image} alt={data.title} />
        </Card>
      </Link>

      <div className={classes["searchItem-info"]}>
        <p className={classes["searchItem-info-mallname"]}>{data.mallname}</p>

        <Link
          className={classes["product-link"]}
          to={`/products/${data.productId}`}
        >
          <p className={classes["searchItem-info-title"]}>{`${data.title}`}</p>
        </Link>
        <p className={classes["searchItem-info-price"]}>
          {data.price.toLocaleString("ko-kr")}
        </p>

        <p className={classes["searchItem-info-realPrice"]}>
          {(
            data.price - Math.ceil((data.price * data.pDiscount) / 100)
          ).toLocaleString("ko-kr")}
          원
          <span className={classes["searchItem-info-realPrice__percent"]}>
            {data.pDiscount}%
          </span>
        </p>
        <p className={classes["searchItem-info-review"]}>
          <span className={classes["searchItem-info-review__star"]}>★</span>
          <span>{`상품평 ( ${data.pReviewCount} )`}</span>
          <span className={classes["searchItem-info-review__split"]}>|</span>

          <span>{`누적 판매량 ( ${data.pReviewCount} )`}</span>
          <span className={classes["searchItem-info-review__cart"]}>
            <RiShoppingCart2Line />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchItem;
