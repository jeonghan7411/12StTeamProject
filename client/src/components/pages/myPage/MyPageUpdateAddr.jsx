import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddressModal from "../../layout/AddressModal";

// import { useNavigate } from "react-router-dom";
// import MyPageAddressAdd from "./MyPageAddressAdd";

import classes from "./MyPageUpdateAddr.module.css";

const MyPageUpdateAddr = ({ addUser, setUpdateSate, targetNum }) => {
  const [updateInfo, setUpdateInfo] = useState(addUser[0]);

  const [uName, setUname] = useState(addUser[0].uName);
  const [dZipcode, setDzipcode] = useState(addUser[0].dZipcode);
  const [dAddr, setDaddr] = useState(addUser[0].dAddr);
  const [dAdditionalAddr, setDAdditionalAddr] = useState(
    addUser[0].dAdditionalAddr
  );
  const [dPhone, setDphone] = useState(addUser[0].dPhone);
  const [dMemo, setDmemo] = useState(addUser[0].dMemo);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");
  const [showAddr, setShowAddr] = useState(false);

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  const updateAddr = async (e) => {
    await axios
      .post("http://localhost:5000/mypage/api/addrupdate", {
        targetNum,
        uName,
        dZipcode,
        dAddr,
        dAdditionalAddr,
        dPhone,
        dMemo,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          window.location.href = "http://localhost:3000/mypage/mypageaddress";
          setUpdateSate(true);
        }
      });
  };

  const updateZipcod = useRef();
  const updateAddrCode = useRef();
  const addrUpdate = () => {
    if (inputZipCode === "") {
      updateZipcod.current.value = dZipcode;
    } else {
      updateZipcod.current.value = inputZipCode;
      setDzipcode(inputZipCode);
    }

    if (inputAddr === "") {
      updateAddrCode.current.value = dAddr;
    } else {
      updateAddrCode.current.value = inputAddr;
      setDaddr(inputAddr);
    }
  };

  useEffect(() => {
    addrUpdate();
  }, [inputZipCode]);

  console.log(addUser);
  return (
    <React.Fragment>
      <div className={classes.MyPageUpdateAddr}>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>이름</h2>
          </span>
          <span>
            <input
              type="text"
              name="uName"
              onChange={(e) => setUname(e.target.value)}
              defaultValue={uName}
            />
            <input type="hidden" value={updateInfo.idx} />
          </span>
        </div>
        <div className={classes["address-item-button"]}>
          <span>
            <button
              type="button"
              onClick={() => {
                setShowAddr(true);
                addrUpdate();
              }}
            >
              주소검색
            </button>
            {showAddr && (
              <AddressModal
                onClose={handleAddrClose}
                setInputAddr={setInputAddr}
                setInputZipCode={setInputZipCode}
              />
            )}
          </span>
        </div>

        <div className={classes["address-item-addr"]}>
          <span>
            <h2>우편번호</h2>
          </span>
          <span>
            <input
              type="text"
              name="dZipcode"
              ref={updateZipcod}
              defaultValue={updateInfo.dZipcode}
              onChange={addrUpdate}
            />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>주소</h2>
          </span>
          <span>
            <input
              type="text"
              name="dAddr"
              ref={updateAddrCode}
              defaultValue={updateInfo.dAddr}
              onChange={addrUpdate}
            />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>상세주소</h2>
          </span>
          <span>
            <input
              type="text"
              name="dAdditionalAddr"
              onChange={(e) => setDAdditionalAddr(e.target.value)}
              defaultValue={updateInfo.dAdditionalAddr}
            />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>전화번호</h2>
          </span>
          <span>
            <input
              type="text"
              name="dPhone"
              onChange={(e) => setDphone(e.target.value)}
              defaultValue={updateInfo.dPhone}
            />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>요청 사항</h2>
          </span>
          <span>
            <input
              type="text"
              name="dMemo"
              onChange={(e) => setDmemo(e.target.value)}
              defaultValue={updateInfo.dMemo}
            />
          </span>
        </div>
        <div className={classes["update-wrap-button"]}>
          <button type="button" onClick={updateAddr}>
            수정
          </button>
          <button type="button" onClick={() => setUpdateSate(false)}>
            취소
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageUpdateAddr;
