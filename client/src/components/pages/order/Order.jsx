import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ModalOrderDeliveryMemo from "./orderInfo/ModalOrderDeliveryMemo";
import OrderConsumer from "./orderInfo/OrderConsumer";
import OrderDeliveryInfo from "./orderInfo/OrderDeliveryInfo";
import OrderPaymentInfo from "./orderInfo/OrderPaymentInfo";
import OrderProduct from "./orderInfo/OrderProduct";

import classes from "./Order.module.css";
import ModalOrderDeliveryInfoChange from "./orderInfo/ModalOrderDeliveryInfoChange";
import { getUser } from "../../../util/getUser";

const Order = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDeliveyFee, setTotalDeliveryFee] = useState(0);

  // 모달 관리
  const [showModal, setShowMadal] = useState({
    isShowDeliveryInfo: false,
    isShowDeliveryMemo: false,
  });

  // 사용자 마일리지 입력
  const [useMileInput, setUseMileInput] = useState({ value: 0, isValid: true });

  // 구매자정보(유저db)
  const [userData, setUserData] = useState();

  // 주문 내역 db에 저장할 정보
  const [orderInfo, setOrderInfo] = useState({
    oUseMile: 0,
    oGetMile: 0,
    oMethod: "",
  });

  useEffect(() => {
    let totalprice = 0;
    orderData.forEach((data) => {
      totalprice += data.price;

      setTotalDeliveryFee(totalDeliveyFee + data.deliveryFee);
    });

    setTotalPrice(totalprice);
    setOrderInfo({
      oUseMile: 0,
      oGetMile: totalprice * 0.03,
      oMethod: "",
    });

    fetchUserData();
  }, []);

  // 배송지 정보 수정
  const handleDeliveryInfoChange = (value) => {
    setOrderInfo((prev) => {
      return {
        ...prev,
        oName: value.name,
        oZipcode: value.zipcode,
        oAddr: value.addr,
        oAdditionalAddr: value.additionalAddr,
        oPhone: value.phone,
      };
    });

    setShowMadal((prev) => {
      return { ...prev, isShowDeliveryInfo: false };
    });
  };

  // 결제 방법 선택
  const hadleOrderMethod = (select) => {
    setOrderInfo((prev) => {
      return { ...prev, oMethod: select };
    });
  };

  // 배송 요청사항 저장 클릭 시
  const handleStorageMemo = (value) => {
    // 모달 닫힘
    setShowMadal((prev) => {
      return { ...prev, isShowDeliveryMemo: false };
    });

    // UI 반영되는 받는 사람 정보 변경
    setOrderInfo((prev) => {
      return { ...prev, oMemo: value };
    });
  };

  // 마일리지 적용 클릭
  const handleUseMileClick = (value) => {
    // 보유 마일리지보다 많게 입력할 경우
    if (+value > user.uMile) {
      setUseMileInput({ value: 0, isValid: false });
      return;
    } else {
      setUseMileInput({ value, isValid: true });
      setOrderInfo((prev) => {
        return { ...prev, oUseMile: value };
      });
    }

    // 유저 정보에 있는 마일리지 감소(UI 용)
    setUser((prev) => {
      return { ...prev, uMile: user.uMile - value };
    });
  };

  // 결제 버튼 클릭
  const handleOrderSubmit = async () => {
    // 유효성 조건 추가하고 통과시 서버 전송 로직 만들기

    await axios
      .post("http://localhost:5000/order/Complete", {
        user,
        orderData,
        oUseMile: orderInfo.oUseMile,
        oGetMile: orderInfo.oGetMile,
        oMethod: orderInfo.oMethod,
      })
      .then(
        // 서버에서 오는게 200이면 페이지 전환하기
        navigate("/orderComplete", {
          state: {
            orderProducts: orderData,
            orderData: {
              ...userData,
              ...orderInfo,
              totalDeliveyFee,
              totalPrice,
            },
          },
        })
      );
  };

  // 구매자 정보 가져오기
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

  // console.log(orderData);
  return (
    <div className={classes.order}>
      <div className={classes["order-title"]}>
        <h3>주문 / 결제</h3>
      </div>
      {/* 구매자 정보 컴포넌트 */}
      <OrderConsumer userData={user} />
      {/* 배송 요청사항 모달 컴포넌트 */}
      {showModal.isShowDeliveryMemo && (
        <ModalOrderDeliveryMemo
          onShowModal={setShowMadal}
          onStorageMemo={handleStorageMemo}
          deliveryMemo={orderInfo.oMemo}
        />
      )}
      {/* 배송지 정보 수정 모달 컴포넌트 */}
      {showModal.isShowDeliveryInfo && (
        <ModalOrderDeliveryInfoChange
          onShowModal={setShowMadal}
          onDeliveryInfoChange={handleDeliveryInfoChange}
        />
      )}
      {/* 받는 사람 정보 컴포넌트 */}
      <OrderDeliveryInfo
        userData={user}
        onShowModal={setShowMadal}
        onShowDeliveryMemo={setOrderInfo}
      />
      {/* 배송 상품 정보 컴포넌트 */}
      <OrderProduct orderData={orderData} />
      {/* 결제 정보 컴포넌트 */}
      <OrderPaymentInfo
        totalDeliveyFee={totalDeliveyFee}
        totalPrice={totalPrice}
        userData={user}
        orderInfo={orderInfo}
        useMileInput={useMileInput}
        onMileInput={setUseMileInput}
        onUseMile={handleUseMileClick}
        onOrderMethod={hadleOrderMethod}
      />

      <div className={classes["order-control"]}>
        <button className={classes["order-control-cancle"]}>취소</button>
        <button
          className={classes["order-control-buy"]}
          onClick={handleOrderSubmit}
        >
          결제
        </button>
      </div>
    </div>
  );
};

export default Order;
