import React from "react";
import { Link } from "react-router-dom";

import eximg from "../../../assets/icon-grade1.png";
import classes from "./OrderItem.module.css";
const OrderItem = () => {
  return (
    <React.Fragment>
      <div className={classes.OrderItem}>
        <div className={classes["orderitem-wrap-title"]}>
          <div>
            <h2>2022.11.04</h2>
          </div>
          <div>
            <Link>주문 상세보기</Link>
          </div>
        </div>
        <div className={classes["orderitem-wrap-items"]}>
          <div className={classes["orderitem-wrap-left"]}>
            <div className={classes["orderitem-item-title"]}>
              <h3>배송처리상태</h3>
            </div>
            <div className={classes["orderitem-item-content"]}>
              <div className={classes["orderitem-item-img"]}>
                <img src={eximg} alt="" />
              </div>

              <div className={classes["orderitem-item-porfile"]}>
                <div className={classes["orderitem-porfile-title"]}>
                  <h4>상품 제모오오오옥제모오오오옥제모오오오옥제모오오오옥</h4>
                </div>
                <div className={classes["orderitem-porfile-content"]}>
                  <span>
                    <h5>3333</h5>원
                  </span>
                  <span>
                    <h5>30개</h5>수량
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
