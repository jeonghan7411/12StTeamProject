import React from "react";

import Card from "../../UI/Card";

import { RiShoppingCart2Line } from "react-icons/ri";

import classes from "./SearchItem.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { cookieCheck } from "../../../util/authCheck";
import { useState } from "react";
import { useEffect } from "react";

const SearchItem = ({ data }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  const handleInsertCart = async () => {
    if (isLogin) {
      await axios
        .post("http://localhost:5000/order/api/cart/insert", {
          sQuantity: 1,
          uId: user.uId,
          productId: data.productId,
        })
        .then((response) => {
          if (response.data.status === 200) {
            if (window.confirm(response.data.message)) {
              navigate("/cart");
            }
          }
        });
    } else {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  };

  useEffect(() => {
    cookieCheck(setIsLogin, setUser);
  }, []);

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
          <p
            className={classes["searchItem-info-title"]}
          >{`${data.title.substring(0, 45)}`}</p>
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

          <span>{`누적 판매량 ( ${data.pSellCount} )`}</span>
          <span className={classes["searchItem-info-review__cart"]}>
            <RiShoppingCart2Line onClick={handleInsertCart} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default SearchItem;
