import React from "react";
import MyPageListTitle from "./MyPageListTitle";

import classes from "./OrderDetail.module.css";
const OrderDetail = () => {
  return (
    <React.Fragment>
      <div className={classes.OrderDetail}>
        <div>
          <MyPageListTitle text={"주문 내역 상세"} />
        </div>
        <div className={classes["detail-wrap-top"]}>
          <div className={classes["detail-top-item"]}>
            <label>주문일자</label>
            <span>2022.11.12</span>
          </div>
          <div className={classes["detail-top-item"]}>
            <label>주문번호</label>
            <span>123123123123</span>
          </div>
        </div>
        <div className={classes["detail-wrap-content"]}>
          <table>
            <thead>
              <tr>
                <td>상품주문번호</td>
                <td>상품정보</td>
                <td>상품금액(수량)</td>
                <td>배송비/판매자</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>234534534</td>
                <td>2</td>
                <td>
                  <div className={classes["price-td"]}>
                    <span>53,333원</span>
                    <span>(2개)</span>
                  </div>
                </td>
                <td>
                  <div className={classes["seller-td"]}>
                    <span>3000원</span>
                    <span>판매자</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={classes["detail-wrap-pay"]}>
          <div className={classes["detail-pay-title"]}>
            <h4>주문/결제 금액 정보</h4>
          </div>
          <div className={classes["detail-pay-content"]}>
            <table>
              <thead>
                <tr>
                  <td>주문금액</td>
                  <td>포인트 혜택</td>
                  <td>최종금액</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <span>상품금액</span>
                      <span>50000원</span>
                    </div>
                    <div>
                      <span>배송비</span>
                      <span>3000원</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>포인트 할인</span>
                      <span>3000원</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>주문금액</span>
                      <span>50000원</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={classes["detail-wrap-addr"]}>
          <div className={classes["detail-addr-title"]}>
            <h4>배송지 정보</h4>
          </div>
          <div className={classes["detail-addr-content"]}>
            <table>
              <thead>
                <tr>
                  <td>수령인</td>
                  <td>나</td>
                  <td>주문자정보</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>연락처</td>
                  <td>123123123</td>
                  <td rowSpan={3}>
                    <div>
                      <span>이거주문한사람</span>
                      <span>전화번호</span>
                      <span>이메일</span>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>배송지</td>
                  <td>부산그어딘가아아아아</td>
                </tr>
                <tr>
                  <td>요청사항</td>
                  <td>없음</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderDetail;
