import React from "react";
import { useRef } from "react";
import { useState } from "react";
import AddressModal from "../../layout/AddressModal";

import classes from "./MyPageAddressAdd.module.css";
const MyPageAddressAdd = ({ user, setUser, setUmemo }) => {
  const [showAddr, setShowAddr] = useState(false);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");

  const [newAddr, setNewAddr] = useState(false);
  const [newName, setNewName] = useState(false);
  const [newPhone, setNewPhone] = useState(false);
  const [newMemo, setNewMemo] = useState(false);

  const [errNameMsg, setErrNameMsg] = useState("");
  const [errPhoneMsg, setErrPhoneMsg] = useState("");
  const [errAddrMsg, setErrAddrMsg] = useState("");
  const handleAddrClose = () => {
    setShowAddr(false);
    setNewAddr(true);
  };

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
      case "uName":
        if (nullCheck.exec(getItem)) {
          setErrNameMsg(nullMsg);
          setUser({
            ...user,
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
          setUser({
            ...user,
            [getName]: getItem,
          });
        }

        break;

      case "uAdditionalAddr":
        if (nullCheck.exec(getItem) || getItem === "") {
          setErrAddrMsg(nullMsg);
          setUser({
            ...user,
            [getName]: "",
          });
        } else if (spcCheck.exec(getItem)) {
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setErrAddrMsg("");
          setUser({
            ...user,
            uZipcode: inputZipCode,
            uAddress: inputAddr,
            [getName]: getItem,
          });
        }
        break;

      case "uPhone":
        if (nullCheck.exec(getItem) || getItem === "") {
          // phoneErrInput.current.value = "";
          setErrPhoneMsg(nullMsg);
          setUser({
            ...user,
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
          setUser({
            ...user,
            [getName]: getItem,
          });
        }
        break;

      default:
        break;
    }
    // setUser({
    //   ...user,
    //   zipcode: inputZipCode,
    //   address: inputAddr,
    //   [e.target.name]: e.target.value,
    // });
  };

  console.log(user);
  return (
    <React.Fragment>
      <div className={classes.MyPageAddressAdd}>
        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 이름</h2>
          </div>
          <div>
            {!newName ? (
              <input
                type="text"
                name="uName"
                onChange={addressInfoHandler}
                value={user.uName}
                onClick={() => setNewName(true)}
              />
            ) : (
              <input name="uName" onChange={addressInfoHandler} />
            )}

            <input type="hidden" value={user.idx} />
          </div>
          <small>{errNameMsg}</small>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 주소</h2>
          </div>
          <div>
            <div>
              {!newAddr ? (
                <input
                  type="text"
                  name="uZipcode"
                  value={user.uZipcode}
                  onClick={() => setNewAddr(true)}
                />
              ) : (
                <input
                  type="text"
                  name="uZipcode"
                  onChange={addressInfoHandler}
                  value={inputZipCode}
                />
              )}

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
              {!newAddr ? (
                <input
                  type="text"
                  name="uAddress"
                  value={user.uAddress}
                  onClick={() => setNewAddr(true)}
                />
              ) : (
                <input
                  type="text"
                  name="uAddress"
                  value={inputAddr}
                  onChange={addressInfoHandler}
                />
              )}
            </div>
            <div>
              {!newAddr ? (
                <input
                  type="text"
                  name="uAdditionalAddr"
                  value={user.uAdditionalAddr}
                />
              ) : (
                <input
                  type="text"
                  name="uAdditionalAddr"
                  onChange={addressInfoHandler}
                  placeholder={"상세주소가 없을시 없음이라 작성"}
                />
              )}
            </div>
            <small>{errAddrMsg}</small>
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 전화번호</h2>
          </div>
          <div>
            {!newPhone ? (
              <input
                type="text"
                name="uPhone"
                value={user.uPhone}
                onClick={() => setNewPhone(true)}
              />
            ) : (
              <input type="text" name="uPhone" onChange={addressInfoHandler} />
            )}
          </div>
          <small>{errPhoneMsg}</small>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 요청사항</h2>
          </div>
          <div>
            <input name="dMemo" onChange={(e) => setUmemo(e.target.value)} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressAdd;
