import React from "react";
import { useState } from "react";
import Modal from "../../../UI/Modal";

import classes from "./ModalOrderDeliveryMemo.module.css";

let checkData = [];

const ModalOrderDeliveryMemo = ({
  onShowDeliveryMemo,
  onStorageMemo,

  onDeliveryMemo,
  deliveryMemo,
}) => {
  const [isDirect, setIsDirect] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState("");

  console.log(checkData);

  const handleDeliveryMemo = (value, isDirect) => {
    setDeliveryInfo(value);
    setIsDirect(isDirect);
    checkData = [value];
  };

  console.log(deliveryInfo);

  return (
    <Modal
      className={classes.ModalOrderDeliveryMemo}
      onClose={() =>
        onShowDeliveryMemo((prev) => {
          return { ...prev, isShowDeliveryMemo: false };
        })
      }
    >
      <header>배송요청사항</header>
      <section>
        <div className={classes["ModalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={deliveryMemo === "문앞"}
            onClick={() => handleDeliveryMemo("문앞", false)}
          />
          <span>문 앞</span>
        </div>
        <div className={classes["ModalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={deliveryMemo === "직접 받고 부재시 문 앞"}
            onClick={() => handleDeliveryMemo("직접 받고 부재시 문 앞", false)}
          />
          <span>직접 받고 부재시 문 앞</span>
        </div>
        <div className={classes["ModalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={deliveryMemo === "경비실"}
            onClick={() => handleDeliveryMemo("경비실", false)}
          />
          <span>경비실</span>
        </div>

        <div
          className={`${classes["ModalOrderDeliveryMemo-select"]} ${classes["ModalOrderDeliveryMemo-select__last"]}`}
        >
          <input type="radio" onClick={() => handleDeliveryMemo("", true)} />
          <span>직접 입력</span>
        </div>

        {isDirect && (
          <div className={classes["ModalOrderDeliveryMemo-directMemo"]}>
            <input
              type="text"
              onChange={(e) => setDeliveryInfo(e.target.value)}
            />
          </div>
        )}
      </section>

      <div className={classes["ModalOrderDeliveryMemo-control"]}>
        <button
          className={classes["ModalOrderDeliveryMemo-control__cancle"]}
          onClick={() =>
            onShowDeliveryMemo((prev) => {
              return { ...prev, isShowDeliveryMemo: false };
            })
          }
        >
          취소
        </button>
        <button
          className={classes["ModalOrderDeliveryMemo-control__storage"]}
          onClick={() => onStorageMemo(deliveryInfo)}
        >
          저장
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderDeliveryMemo;
