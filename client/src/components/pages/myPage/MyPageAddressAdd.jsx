import React from "react";
import { useRef } from "react";
import { useState } from "react";
import AddressModal from "../../layout/AddressModal";

import classes from "./MyPageAddressAdd.module.css";
const MyPageAddressAdd = ({ user, addState, setAddState }) => {
  const [dataId, setDataId] = useState(user.uId);
  const [dataPhone, setDataPhone] = useState(user.uPhone);
  const [dataZipCode, setDataZipCode] = useState(user.uZipcode);
  const [dataAddress, setDataAddress] = useState(user.uAddress);
  const [dataDetail, setDataDetail] = useState(user.uAdditionalAddr);

  const [showAddr, setShowAddr] = useState(false);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");

  const [newAddr, setNewAddr] = useState(false);

  const [errNameMsg, setErrNameMsg] = useState("");
  const [errPhoneMsg, setErrPhoneMsg] = useState("");
  const [errAddrMsg, setErrAddrMsg] = useState("");
  const handleAddrClose = () => {
    setShowAddr(false);
    setNewAddr(true);
  };

  const nameRef = useRef();
  const addressInfoHandler = (e) => {
    const nullMsg = "공백값은 입력할수 없습니다. ";
    const getName = e.target.name;
    const getItem = e.target.value;

    const nullCheck = /\s/; //공백체크
    const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
    const spcCheck = /[!@#]/;
    const numCheck = /[0-9]/g;
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
    switch (getName) {
      case "name":
        if (nullCheck.exec(getItem)) {
          nameRef.current.value = "";
          setErrNameMsg(nullMsg);
          setAddState({
            ...addState,
            [getName]: "",
          });
          return;
        } else if (getItem.length < 2) {
          setErrNameMsg("이름은 최소 2글자 이상 입력해주세요. ");
          return;
        } else if (getItem.length > 5) {
          setErrNameMsg("이름은 최대 5글자를 넘길수 없습니다.");
          return;
        } else if (!nameCheck.exec(getItem)) {
          setErrNameMsg("올바른 이름의 형식이 아닙니다.");
          return;
        } else {
          setErrNameMsg("");
          setAddState({
            ...addState,
            [getName]: getItem,
          });
        }

        break;

      case "detail":
        if (nullCheck.exec(getItem) || getItem === "") {
          setErrAddrMsg(nullMsg);
          setAddState({
            ...addState,
            [getName]: "",
          });
        } else if (spcCheck.exec(getItem)) {
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setErrAddrMsg("");
          setAddState({
            ...addState,
            zipcode: inputZipCode,
            uAddress: inputAddr,
            [getName]: getItem,
          });
        }
        break;

      case "phone":
        if (nullCheck.exec(getItem) || getItem === "") {
          // phoneErrInput.current.value = "";
          setErrPhoneMsg(nullMsg);
          setAddState({
            ...addState,
            [getName]: "",
          });
          return;
        } else if (!numCheck.exec(getItem)) {
          // phoneErrInput.current.value = "";

          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          return;
        } else if (getItem.length < 11) {
          setErrPhoneMsg("휴대폰번호는 10자리에서 11자리를 입력해주세요 ");
          return;
        } else if (getItem.length > 11) {
          setErrPhoneMsg("휴대폰번호는 최대 11 자를 넘길수 없습니다.");
          return;
        } else if (!telPhoneCheck.exec(getItem)) {
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
          return;
        } else {
          setErrPhoneMsg("");
          setAddState({
            ...addState,
            [getName]: getItem,
          });
        }
        break;

      case "plz":
        setAddState({
          ...addState,
          [getName]: getItem,
        });

      default:
        break;
    }
    // setAddState({
    //   ...addState,
    //   zipcode: inputZipCode,
    //   address: inputAddr,
    //   [e.target.name]: e.target.value,
    // });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressAdd}>
        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 이름</h2>
          </div>
          <div>
            <input
              type="text"
              name="name"
              onChange={addressInfoHandler}
              ref={nameRef}
            />
            <input type="hidden" value={user.uidx} />
          </div>
          <small>{errNameMsg}</small>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 주소</h2>
          </div>
          <div>
            <div>
              <input
                type="text"
                name="zipcode"
                onChange={addressInfoHandler}
                value={inputZipCode}
              />

              <button type="button" onClick={() => setShowAddr(true)}>
                주소찾기
              </button>
              {showAddr && (
                <AddressModal
                  onClose={handleAddrClose}
                  setInputAddr={setInputAddr}
                  setInputZipCode={setInputZipCode}
                />
              )}
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={inputAddr}
                onChange={addressInfoHandler}
              />
            </div>
            <div>
              <input type="text" name="detail" onChange={addressInfoHandler} />
            </div>
            <small>{errAddrMsg}</small>
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 전화번호</h2>
          </div>
          <div>
            <input type="text" name="phone" onChange={addressInfoHandler} />
          </div>
          <small>{errPhoneMsg}</small>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 요청사항</h2>
          </div>
          <div>
            <input name="plz" onClick={addressInfoHandler} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressAdd;
