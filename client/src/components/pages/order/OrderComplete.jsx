import axios from "axios";
import React, { useState, Fragment } from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../../util/getUser";

import classes from "./OrderComplete.module.css";
import OrderConsumer from "./orderInfo/OrderConsumer";
import OrderDeliveryInfo from "./orderInfo/OrderDeliveryInfo";
import OrderProduct from "./orderInfo/OrderProduct";

const OrderComplete = () => {
  const [user, setUser] = useState({});
  // 구매시간
  const buyDate = new Date();
  const location = useLocation();
  const [orderCompleteData, setOrderCompleteData] = useState({
    orderProducts: location.state.orderProducts,
    orderData: location.state.orderData,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      await axios
        .get("http://localhost:5000/mypage", { withCredentials: true })
        .then((response) => {
          if (response.data.status === 401) {
            alert(response.data.message);
            navigate("/login", { replace: true });
          } else if (response.data.status === 200) {
            getUser(setUser);
          }
        });
    };
    fetchUserData();
  }, []);

  // console.log(orderCompleteData.orderData);

  return (
    <div className={classes.orderComplete}>
      <h3 className={classes["orderComplete-title"]}>결제가 완료되었습니다.</h3>

      <div className={classes["orderComplete-recriptWrap"]}>
        <p className={classes["orderComplete-recript-recript"]}>영수증</p>

        <section className={classes["orderComplete-recript-section"]}>
          <h3 className={classes["orderComplete-recript-company"]}>12st</h3>
          <p className={classes["orderComplete-recript-date"]}>
            구매시간 : {buyDate.toLocaleString()}
          </p>
        </section>

        <section className={classes["orderComplete-recript-section"]}>
          <OrderConsumer userData={user} />
        </section>

        <section className={classes["orderComplete-recript-section"]}>
          <h4 className={classes["orderComplete-recript-title"]}>
            받는 사람 정보
          </h4>

          <table className={classes["orderComplete-recript-table"]}>
            <tbody>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  이름
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {user.uName}
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  배송지 주소
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {user.uAddress}
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  연락처
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {user.uPhone}
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  배송요청사항
                </td>
                <td className={classes["orderComplete-recript-table__memo"]}>
                  {user.uAddress}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={classes["orderComplete-recript-section"]}>
          <h4 className={classes["orderComplete-recript-title"]}>
            구매한 상품
          </h4>
          <OrderProduct orderData={orderCompleteData.orderProducts} />
        </section>

        <section className={classes["orderComplete-recript-section"]}>
          <h4 className={classes["orderComplete-recript-title"]}>결제 정보</h4>

          <table className={classes["orderComplete-recript-table"]}>
            <tbody>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  총 상품 금액
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {orderCompleteData.orderData.totalPrice}원
                </td>
              </tr>

              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  배송비
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {orderCompleteData.orderData.totalDeliveyFee}원
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  사용 마일리지
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {orderCompleteData.orderData.oUseMile} 마일리지
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  적립 마일리지
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {orderCompleteData.orderData.oGetMile} 마일리지
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  결제 방법
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  {orderCompleteData.orderData.oMethod}
                </td>
              </tr>
              <tr>
                <td className={classes["orderComplete-recript-table__col1"]}>
                  총 결제 금액
                </td>
                <td className={classes["orderComplete-recript-table__col2"]}>
                  <span
                    className={classes["orderComplete-recript__totalPrice"]}
                  >
                    {orderCompleteData.orderData.totalPrice +
                      orderCompleteData.orderData.totalDeliveyFee -
                      orderCompleteData.orderData.oUseMile}
                    원
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <div className={classes["orderComplete-control"]}>
        <button onClick={() => navigate("/")}>확인</button>
      </div>
    </div>
  );
};

export default OrderComplete;
