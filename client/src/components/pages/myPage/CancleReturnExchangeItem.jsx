import React from "react";
import classes from "./CancleReturnExchangeItem.module.css";
const CancleReturnExchangeItem = () => {
  return (
    <React.Fragment>
      <div className={classes["cre-wrap-content"]}>
        <table>
          <thead>
            <tr>
              <th>교환요청일</th>
              <th>주문일 </th>
              <th>주문번호</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h2>2022.11.04</h2>
              </td>
              <td>
                <h2>2022.11.04</h2>
              </td>
              <td>
                <h2>00001214</h2>
              </td>
            </tr>
          </tbody>
        </table>

        <div className={classes["cre-wrap-item"]}>
          <div className={classes["cre-item-title"]}>
            <h2>상품 제모오오오옥제모오오오옥제모오오오옥제모오오오옥</h2>
          </div>
          <div className={classes["cre-item-price"]}>
            <div>
              <span>1</span> 개
            </div>
            <div>
              <span>3999999</span> 원<div></div>
            </div>
          </div>
          <div className={classes["cre-item-state"]}>
            <div>
              <h4>진행상태</h4>
            </div>
            <div>
              <button>상세보기</button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CancleReturnExchangeItem;
