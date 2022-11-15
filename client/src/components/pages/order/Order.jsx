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

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.order);
  console.log(orderData);

  const [totalPrice, setTotalPrice] = useState(0);
  const deliveryFee = 2500;

  console.log(totalPrice + deliveryFee);
  // 모달 관리
  const [showModal, setShowMadal] = useState({
    isShowDeliveryInfo: false,
    isShowDeliveryMemo: false,
  });

  // 사용자 마일리지 입력
  const [useMileInput, setUseMileInput] = useState({ value: 0, isValid: true });

  // 구매자정보(유저db)
  const [userData, setUserData] = useState({
    uName: "",
    uEmail: "",
    uPhone: "",
    uMile: 0,
  });

  // 주문 내역 db에 저장할 정보
  const [orderInfo, setOrderInfo] = useState({
    uId: "",
    // 상품 아이디는 orderData에서 보내기,
    // 상품구매 수량 orderData에서 보내기
    oName: "",
    oPhone: "",
    oZipcode: "123",
    oAddr: "123",
    oAdditionalAddr: "123",
    oMemo: "",
    oUseMile: 0,
    oGetMile: 10,
    oMethod: "",
    oTotalPrice: 0,
  });

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
    console.log(value);
    // 보유 마일리지보다 많게 입력할 경우
    if (+value > userData.uMile) {
      setUseMileInput({ value: 0, isValid: false });
      return;
    } else {
      setUseMileInput({ value, isValid: true });
      setOrderInfo((prev) => {
        return { ...prev, oUseMile: value };
      });
    }

    // 사용한 마일리지, 총 상품가격 수정
    setOrderInfo((prev) => {
      return {
        ...prev,
        oUseMile: value,
        oTotalPrice: orderInfo.oTotalPrice - value,
      };
    });

    // 유저 정보에 있는 마일리지 감소(UI 용)
    setUserData((prev) => {
      return { ...prev, uMile: userData.uMile - value };
    });
  };

  // 결제 버튼 클릭
  const handleOrderSubmit = async () => {
    // 유효성 조건 추가하고 통과시 서버 전송 로직 만들기

    await axios
      .post("http://localhost:5000/order/Complete", {
        uId: orderInfo.uId,
        // 상품 아이디는 orderData에서 보내기,
        pId: orderData[0].productId,
        // 상품구매 수량 orderData에서 보내기
        oQuantity: orderData[0].amount,
        oName: orderInfo.oName,
        oPhone: orderInfo.oPhone,
        oZipcode: orderInfo.oZipcode,
        oAddr: orderInfo.oAddr,
        oAdditionalAddr: orderInfo.oAdditionalAddr,
        oMemo: orderInfo.oMemo,
        oUseMile: orderInfo.oUseMile,
        oGetMile: 10,
        oMethod: orderInfo.oMethod,
        oTotalPrice: orderInfo.oTotalPrice,
      })
      .then(
        // 서버에서 오는게 200이면 페이지 전환하기
        navigate("/orderComplete", {
          state: {
            orderProducts: orderData,
            orderData: { ...userData, ...orderInfo, deliveryFee },
          },
        })
      );
  };

  // 구매자 정보 가져오기
  const fetchUserData = async () => {
    await axios
      .post("http://localhost:5000/order/get/userData", {
        uId: "test1",
      })
      .then((response) => {
        // 상세주소 받아오기
        console.log(response.data.deliveryData[0]);
        const {
          uId,
          uName,
          uZipcode,
          uAddress,
          uAdditionalAddr,
          uEmail,
          uPhone,
          uMile,
        } = response.data.userData[0];

        // 구매자 정보 설정
        setUserData({
          uName,
          uEmail,
          uPhone,
          uMile: +uMile,
        });

        // 주문 내역 정보 설정
        setOrderInfo((prev) => {
          return {
            ...prev,
            uId: uId,
            oName: uName,
            oPhone: uPhone,
            oZipcode: uZipcode,
            oAddr: uAddress,
            oAdditionalAddr: uAdditionalAddr,
            oMemo: "문앞",
            oTotalPrice: totalPrice + deliveryFee,
          };
        });
      });
  };

  useEffect(() => {
    orderData.map((data) => {
      return setTotalPrice(totalPrice + data.price * data.amount);
    });

    fetchUserData();
  }, []);

  return (
    <div className={classes.order}>
      <div className={classes["order-title"]}>
        <h3>주문 / 결제</h3>
      </div>

      {/* 구매자 정보 컴포넌트 */}
      <OrderConsumer userData={userData} />

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
        orderInfo={orderInfo}
        onShowModal={setShowMadal}
        onShowDeliveryMemo={setOrderInfo}
      />

      {/* 배송 상품 정보 컴포넌트 */}
      <OrderProduct orderData={orderData} />

      {/* 결제 정보 컴포넌트 */}
      <OrderPaymentInfo
        totalPrice={totalPrice}
        deleveryFee={deliveryFee}
        userData={userData}
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
