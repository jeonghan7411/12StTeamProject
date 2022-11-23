import React, { Fragment, useState } from "react";
import Card from "../../../UI/Card";

import Modal from "../../../UI/Modal";

import { GrClose } from "react-icons/gr";

import classes from "./OrderDeliveryInfo.module.css";
import { useNavigate } from "react-router-dom";

const OrderDeliveryInfo = ({ addrData, onAddrChange, isOrderComplete }) => {
  const navigate = useNavigate();
  const [isShowModal, setIsShowModal] = useState(false);
  const [addPlace, setAddPlace] = useState(false); //이거써서 밑에 인풋창 띄우고 다시 접기
  const { dAdditionalAddr, dAddr, dMemo, dPhone, dZipcode, dName } =
    addrData.defaultAddr;

  console.log(addrData);

  const handleSelectAddr = (
    dName,
    dZipcode,
    dAddr,
    dAdditionalAddr,
    dPhone,
    dMemo
  ) => {
    onAddrChange(dName, dZipcode, dAddr, dAdditionalAddr, dPhone, dMemo);
    setIsShowModal(false);
  };

  return (
    <Fragment>
      {isShowModal && (
        <Modal
          onClose={() => setIsShowModal(false)}
          className={classes.modalChangeAddr}
        >
          <header className={classes["modalChangeAddr-header"]}>
            배송지 선택
            <GrClose
              className={classes["modalChangeAddr-header__close"]}
              onClick={() => setIsShowModal(false)}
            />
          </header>
          <section className={classes["modalChangeAddr-section"]}>
            {addrData.addrs.map((it, idx) => (
              <Card
                key={idx}
                className={classes["modalChangeAddr-section__item"]}
              >
                <p className={classes["modalChangeAddr-section__item__name"]}>
                  {it.dName}
                </p>

                <p className={classes["modalChangeAddr-section__item__addr"]}>
                  {`${it.dAddr} [ ${it.dZipcode} ]`}
                </p>
                <p
                  className={
                    classes["modalChangeAddr-section__item__additionalAddr"]
                  }
                >
                  {it.dAdditionalAddr}
                </p>

                <p className={classes["modalChangeAddr-section__item__phone"]}>
                  {it.dPhone}
                </p>

                <p className={classes["modalChangeAddr-section__item__memo"]}>
                  배송요청사항 : {it.dMemo}
                </p>

                <div
                  className={classes["modalChangeAddr-section__item__select"]}
                >
                  <button
                    onClick={handleSelectAddr.bind(
                      null,
                      it.dName,
                      it.dZipcode,
                      it.dAddr,
                      it.dAdditionalAddr,
                      it.dPhone,
                      it.dMemo
                    )}
                  >
                    선택
                  </button>
                </div>
              </Card>
            ))}
          </section>
        </Modal>
      )}

      <div className={classes["orderDeliveryInfo"]}>
        <div className={classes["orderDeliveryInfo-deliveryChange"]}>
          <h4>받는 사람 정보</h4>

          {!isOrderComplete && (
            <>
              <button onClick={() => setIsShowModal(true)}>
                받는 사람 정보 변경
              </button>
              <button onClick={() => setAddPlace(true)}>배송지 변경</button>
            </>
          )}
        </div>

        <table className={classes["orderDeliveryInfo-table"]}>
          <tbody>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>이름</td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {dName}
              </td>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                배송지 주소
              </td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {`${dAddr} [ ${dZipcode} ] ${dAdditionalAddr}`}
              </td>
              <button></button>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                연락처
              </td>
              <td className={classes["orderDeliveryInfo-table__col2"]}>
                {dPhone}
              </td>
            </tr>
            <tr>
              <td className={classes["orderDeliveryInfo-table__col1"]}>
                배송요청사항
              </td>
              <td className={classes["orderDeliveryInfo-table__memo"]}>
                {dMemo}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default OrderDeliveryInfo;
