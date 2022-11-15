import React, { Fragment, useState } from "react";
import Modal from "../../../UI/Modal";
import DaumPostcode from "react-daum-postcode";

import { AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { BsPhoneVibrate } from "react-icons/bs";

import classes from "./ModalOrderDeliveryInfoChange.module.css";
import AddressModal from "../../../layout/AddressModal";
import { useEffect } from "react";

const ModalOrderDeliveryInfoChange = ({
  onShowModal,
  onDeliveryInfoChange,
}) => {
  const [deliveryInfoValue, setDeliveryInfoValue] = useState({
    name: "",
    zipcode: "",
    addr: "",
    additionalAddr: "",
    phone: "",
  });

  const [isShowAddrSearch, setIsShowAddrSearch] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    // console.log(data);
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setIsShowAddrSearch(false);
    setDeliveryInfoValue((prev) => {
      return { ...prev, zipcode: data.zonecode };
    });
    setDeliveryInfoValue((prev) => {
      return { ...prev, addr: fullAddress };
    }); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  return (
    <Modal
      className={classes.modalOrderDeliveryInfoChange}
      onClose={() =>
        onShowModal((prev) => {
          return { ...prev, isShowDeliveryInfo: false };
        })
      }
    >
      <header>
        <h4>배송지 정보 수정</h4>
      </header>
      <section className={classes["modalOrderDeliveryInfoChange-inputWrap"]}>
        <div className={classes["modalOrderDeliveryInfoChange-input"]}>
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <AiOutlineUser
              className={classes["modalOrderDeliveryInfoChange-icon"]}
            />
          </div>

          <div className={classes["modalOrderDeliveryInfoChange-input__input"]}>
            <input
              maxLength="5"
              onChange={(e) =>
                setDeliveryInfoValue((prev) => {
                  return { ...prev, name: e.target.value };
                })
              }
              placeholder="받는 사람 이름을 입력해주세요"
            />
          </div>
        </div>

        {isShowAddrSearch && (
          <div>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        )}

        <div
          className={`${classes["modalOrderDeliveryInfoChange-input"]} ${classes.enteredAddr}`}
        >
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <BiMap className={classes["modalOrderDeliveryInfoChange-icon"]} />
          </div>
          <div
            className={classes["modalOrderDeliveryInfoChange-enteredAddrWrap"]}
          >
            <div
              className={
                classes["modalOrderDeliveryInfoChange-input__readOnly"]
              }
            >
              <input
                readOnly
                value={
                  deliveryInfoValue.zipcode
                    ? `${deliveryInfoValue.addr} [ ${deliveryInfoValue.zipcode} ]`
                    : ""
                }
              />
              <span
                className={
                  classes[
                    "modalOrderDeliveryInfoChange-enteredAddr-btn__search"
                  ]
                }
                onClick={() => setIsShowAddrSearch(true)}
              >
                <AiOutlineSearch />
              </span>
            </div>

            <div
              className={classes["modalOrderDeliveryInfoChange-input__input"]}
            >
              <input
                onChange={(e) =>
                  setDeliveryInfoValue((prev) => {
                    return { ...prev, additionalAddr: e.target.value };
                  })
                }
                placeholder="상세주소를 입력해주세요"
              />
            </div>
          </div>
        </div>

        <div className={classes["modalOrderDeliveryInfoChange-input"]}>
          <div className={classes["modalOrderDeliveryInfoChange-iconWrap"]}>
            <BsPhoneVibrate
              className={classes["modalOrderDeliveryInfoChange-icon"]}
            />
          </div>
          <div className={classes["modalOrderDeliveryInfoChange-input__input"]}>
            <input
              onChange={(e) =>
                setDeliveryInfoValue((prev) => {
                  return { ...prev, phone: e.target.value };
                })
              }
              placeholder="받는 사람 전화번호를 입력해주세요"
            />
          </div>
        </div>
      </section>
      <div className={classes["modalOrderDeliveryInfoChange-control"]}>
        <button
          className={classes["modalOrderDeliveryInfoChange-control__cancle"]}
          onClick={() =>
            onShowModal((prev) => {
              return { ...prev, isShowDeliveryInfo: false };
            })
          }
        >
          취소
        </button>
        <button
          className={classes["modalOrderDeliveryInfoChange-control__storage"]}
          onClick={() => onDeliveryInfoChange(deliveryInfoValue)}
        >
          저장
        </button>
      </div>
    </Modal>
  );
};

export default ModalOrderDeliveryInfoChange;
