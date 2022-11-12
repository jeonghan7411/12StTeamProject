import React from "react";
import { Link } from "react-router-dom";

import eximg from "../../../assets/icon-grade1.png";
import classes from "./OrderItem.module.css";
const OrderItem = ({ orderList }) => {
  return (
    <React.Fragment>
      <div className={classes.OrderItem}>
        <div className={classes["orderitem-wrap-title"]}>
          <div>
            <h2>{orderList.regdate}</h2>
          </div>
          <div>
            <Link to={"orderdetail"}>주문 상세</Link>
          </div>
        </div>

        <div className={classes["orderitem-wrap-items"]}>
          <div className={classes["orderitem-wrap-left"]}>
            <div className={classes["orderitem-item-title"]}>
              <h3>{orderList.state}</h3>
            </div>
            <div className={classes["orderitem-item-content"]}>
              <div className={classes["orderitem-item-img"]}>
                <img src={eximg} alt="" />
              </div>

              <div className={classes["orderitem-item-porfile"]}>
                <div className={classes["orderitem-porfile-title"]}>
                  <h4>{orderList.title}</h4>
                </div>
                <div className={classes["orderitem-porfile-content"]}>
                  <span>
                    <h5>{orderList.price}</h5>원
                  </span>
                  <span>
                    <h5>{orderList.count}</h5>개
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes["orderitem-wrap-right"]}>
            <button>리뷰쓰기</button>
            <button>교환,반품 신청</button>
            <button>재구매</button>
            <button>판매자문의</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderItem;
