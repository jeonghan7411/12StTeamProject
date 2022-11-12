import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import TotalAmount from "./TotalAmount";
import Card from "../../UI/Card";

import classes from "./Order.module.css";

const Order = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);
  console.log(orderData);

  const [deleveryFee, setDeleveryFee] = useState(2500);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    orderData.map((data) => {
      return setTotalPrice(totalPrice + data.price * data.amount);
    });
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes["order-title"]}>
        <h3>주문 / 결제</h3>
      </div>

      {/* 구매자 정보 컴포넌트 */}
      <div className={classes["order-consumer"]}>
        <h4>구매자 정보</h4>

        <table className={classes["order-consumer-table"]}>
          <tbody>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>이름</td>
              <td className={classes["order-consumer-table__col2"]}>홍길동</td>
            </tr>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>이메일</td>
              <td className={classes["order-consumer-table__col2"]}>
                test123@naver.com
              </td>
            </tr>
            <tr>
              <td className={classes["order-consumer-table__col1"]}>연락처</td>
              <td className={classes["order-consumer-table__col2"]}>
                01012341234
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 배송지 정보 컴포넌트 */}

      <div className={classes["order-deliveryInfo"]}>
        <h4>받는 사람 정보</h4>

        <table className={classes["order-deliveryInfo-table"]}>
          <tbody>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                이름
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                홍길동
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                배송지 주소
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                부산 어딘가
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                연락처
              </td>
              <td className={classes["order-deliveryInfo-table__col2"]}>
                01012341234
              </td>
            </tr>
            <tr>
              <td className={classes["order-deliveryInfo-table__col1"]}>
                배송요청사항
              </td>
              <td className={classes["order-deliveryInfo-table__memo"]}>
                <span>문앞에놔둬주세요</span>
                <button
                  className={classes["order-deliveryInfo-table__changeMemo"]}
                >
                  변경
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 배송 상품 정보 컴포넌트 */}
      <div>
        <div className={classes["order-product"]}>
          <h4>
            {/* 1을 map 돌릴때 수정 */}
            배송 {orderData.length}건 중 1
          </h4>
          {orderData.map((data, key) => {
            return (
              <div className={classes["order-product-info"]} key={key}>
                <p className={classes["order-product-info__deliveryDate"]}>
                  도착일
                </p>

                <div className={classes["order-product-info__content"]}>
                  <Card className={classes["order-product-info__content__img"]}>
                    <img src={data.image} alt={data.title} />
                  </Card>

                  <div className={classes["order-product-info-content__info"]}>
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

        {/* 결제 정보 컴포넌트 */}
        <div className={classes["order-paymentInfo"]}>
          <table className={classes["order-paymentInfo-table"]}>
            <tbody>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  총 상품 가격
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {totalPrice}원
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  배송비
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {deleveryFee}원
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  마일리지 사용
                </td>
                <td className={classes["order-paymentInfo-table__mile"]}>
                  <div className={classes["order-paymentInfo-table__useMile"]}>
                    <input type="text" />
                    <span>원</span>
                    <span
                      className={classes["order-paymentInfo-table__totalMile"]}
                    >
                      보유 마일리지 : <span>회원디비에서 가져오기</span>원
                    </span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  총 결제금액
                </td>
                <td className={classes["order-paymentInfo-table__col2"]}>
                  {totalPrice + deleveryFee}원
                </td>
              </tr>

              <tr>
                <td className={classes["order-paymentInfo-table__col1"]}>
                  결제 방법
                </td>
                <td className={classes["order-paymentInfo-table__payment"]}>
                  <div
                    className={
                      classes["order-paymentInfo-table__payment__select"]
                    }
                  >
                    <input type="checkbox" />
                    <span>신용/체크카드</span>
                    <input type="checkbox" />
                    <span>법인카드</span>
                    <input type="checkbox" />
                    <span>휴대폰</span>
                    <input type="checkbox" />
                    <span>무통장입금</span>
                  </div>

                  <Card
                    className={
                      classes["order-paymentInfo-table__payment__selectInfo"]
                    }
                  >
                    각 결제방법에 해당하는 박스 구성하기
                  </Card>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className={classes["order-control"]}>
        <button className={classes["order-control-cancle"]}>취소</button>
        <button className={classes["order-control-buy"]}>결제</button>
      </div>
    </div>
  );
};

export default Order;
