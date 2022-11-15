import React from "react";
import { useState } from "react";
import Modal from "../../../UI/Modal";

import classes from "./ModalOrderDeliveryMemo.module.css";

let checkData = "";

const ModalOrderDeliveryMemo = ({ onShowModal, onStorageMemo }) => {
  const [isDirect, setIsDirect] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState("");

  console.log(checkData);

  const handleDeliveryMemo = (value, isDirect) => {
    setDeliveryInfo(value);
    setIsDirect(isDirect);
    checkData = value;
  };

  console.log(deliveryInfo);

  return (
    <Modal
      className={classes.modalOrderDeliveryMemo}
      onClose={() =>
        onShowModal((prev) => {
          return { ...prev, isShowDeliveryMemo: false };
        })
      }
    >
      <header>
        <h4>배송요청사항</h4>
      </header>
      <section>
        <div className={classes["modalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={checkData === "문앞"}
            onClick={() => handleDeliveryMemo("문앞", false)}
          />
          <span>문 앞</span>
        </div>
        <div className={classes["modalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={checkData === "직접 받고 부재시 문 앞"}
            onClick={() => handleDeliveryMemo("직접 받고 부재시 문 앞", false)}
          />
          <span>직접 받고 부재시 문 앞</span>
        </div>
        <div className={classes["modalOrderDeliveryMemo-select"]}>
          <input
            type="radio"
            checked={checkData === "경비실"}
            onClick={() => handleDeliveryMemo("경비실", false)}
          />
          <span>경비실</span>
        </div>

        <div
          className={`${classes["modalOrderDeliveryMemo-select"]} ${classes["ModalOrderDeliveryMemo-select__last"]}`}
        >
          <input
            type="radio"
            checked={checkData === "직접입력"}
            onClick={() => handleDeliveryMemo("직접입력", true)}
          />
          <span>직접 입력</span>
        </div>

        {isDirect && (
          <div className={classes["modalOrderDeliveryMemo-directMemo"]}>
            <input
              type="text"
              onChange={(e) => setDeliveryInfo(e.target.value)}
            />
          </div>
        )}
      </section>

      <div className={classes["modalOrderDeliveryMemo-control"]}>
        <button
          className={classes["ModalOrderDeliveryMemo-control__cancle"]}
          onClick={() =>
            onShowModal((prev) => {
              return { ...prev, isShowDeliveryMemo: false };
            })
          }
        >
          취소
        </button>
        <button
          className={classes["modalOrderDeliveryMemo-control__storage"]}
          onClick={() => onStorageMemo(deliveryInfo)}
        >
          저장
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderDeliveryMemo;
