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

  const [newName, setNewName] = useState(false);
  const [newAddr, setNewAddr] = useState(false);
  const [newPhone, setNewPhone] = useState(false);

  const [errMsg, setErrMsg] = useState("");
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
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
    switch (getName) {
      case "name":
        if (nullCheck.exec(getItem)) {
          nameRef.current.value = "";
          setErrMsg(nullMsg);
          return;
        } else {
          setAddState({
            ...addState,
            [getName]: getItem,
          });
        }
        console.log(addState);
        break;

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
            {!newName ? (
              <input
                type="text"
                name="name"
                onChange={addressInfoHandler}
                value={user.uName}
                onClick={() => setNewName(true)}
              />
            ) : (
              <input
                type="text"
                name="name"
                onChange={addressInfoHandler}
                ref={nameRef}
              />
            )}
            <small>{errMsg}</small>

            <input type="hidden" value={user.uidx} />
          </div>
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
                  name="zipcode"
                  value={user.uZipcode}
                  onClick={() => setNewAddr(true)}
                />
              ) : (
                <input
                  type="text"
                  name="zipcode"
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
                  name="address"
                  value={user.uAddress}
                  onClick={() => setNewAddr(true)}
                />
              ) : (
                // <input
                //   type="text"
                //   name="address"
                //   onChange={addressInfoHandler}
                //   value={inputAddr}
                // />
                <input
                  type="text"
                  name="address"
                  value={inputAddr}
                  onChange={addressInfoHandler}
                />
              )}
            </div>
            <div>
              {!newAddr ? (
                <input
                  type="text"
                  name="detail"
                  value={user.uAdditionalAddr}
                  onClick={() => setNewAddr(true)}
                />
              ) : (
                <input
                  type="text"
                  name="detail"
                  onChange={addressInfoHandler}
                />
              )}
            </div>
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
                name="phone"
                onChange={addressInfoHandler}
                value={user.uPhone}
                onClick={() => setNewPhone(true)}
              />
            ) : (
              <input type="text" name="phone" onChange={addressInfoHandler} />
            )}
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 요청사항</h2>
          </div>
          <div>
            <textarea name="plz" onClick={addressInfoHandler} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressAdd;
