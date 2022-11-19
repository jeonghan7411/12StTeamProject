import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressModal from "../../layout/AddressModal";
import MyPageAddressAdd from "./MyPageAddressAdd";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({ addUser, setTargetNum, setUpdateSate }) => {
  const navigate = useNavigate();

  const deleteAddr = async () => {
    if (window.confirm("삭제 하시겠습니까?")) {
      await axios
        .post("http://localhost:5000/mypage/api/addrdelete", { addUser })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            window.location.href = "http://localhost:3000/mypage/mypageaddress";
            // setReset(!reset);
          }
        });
    }
  };

  // const updateInput = (e) => {
  //   setUpdateInfo({
  //     ...updateInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const updateAddr = async (e) => {
    await axios
      .post("http://localhost:5000/mypage/api/addrupdate", {
        uIdx,
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
          // setUpdateSate(true);
        }
      });
  };

  const [uIdx, setUidx] = useState(addUser.idx);
  const [uName, setUname] = useState(addUser.uName);
  const [dZipcode, setDzipcode] = useState(addUser.dZipcode);
  const [dAddr, setDaddr] = useState(addUser.dAddr);
  const [dAdditionalAddr, setDAdditionalAddr] = useState(
    addUser.dAdditionalAddr
  );
  const [dPhone, setDphone] = useState(addUser.dPhone);
  const [dMemo, setDmemo] = useState(addUser.dMemo);
  const [updateInput, setUpdateInput] = useState(false);

  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");
  const [showAddr, setShowAddr] = useState(false);

  const updateZipcode = useRef();
  const updateAddrCode = useRef();

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  const getAddrINfo = () => {
    if (inputZipCode === "") {
      updateZipcode.current.value = dZipcode;
    } else {
      updateZipcode.current.value = inputZipCode;
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
    if (updateInput === true) {
      getAddrINfo();
    }
  }, [inputZipCode]);

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-addr"]}>
          <span>이름 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                defaultValue={addUser.uName}
                onChange={(e) => setUname(e.target.value)}
              />
            ) : (
              <h2> {addUser.uName}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>우편번호 :</span>

          <span className={classes["zipcode-wrap-input"]}>
            {updateInput === true ? (
              <input
                type="text"
                name="dZipcode"
                defaultValue={addUser.dZipcode}
                onChange={getAddrINfo}
                ref={updateZipcode}
              />
            ) : (
              <h2> {addUser.dZipcode}</h2>
            )}
          </span>

          {updateInput && (
            <span className={classes["search-wrap-button"]}>
              <button
                type="button"
                onClick={() => {
                  setShowAddr(true);
                  getAddrINfo();
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
          )}
        </div>
        <div className={classes["address-item-addr"]}>
          <span>주소 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                name="dAddr"
                defaultValue={addUser.dAddr}
                onChange={getAddrINfo}
                ref={updateAddrCode}
              />
            ) : (
              <h2> {addUser.dAddr}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>상세주소 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                defaultValue={addUser.dAdditionalAddr}
                onChange={(e) => setDAdditionalAddr(e.target.value)}
              />
            ) : (
              <h2>{addUser.dAdditionalAddr}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>전화번호 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                defaultValue={addUser.dPhone}
                onChange={(e) => setDphone(e.target.value)}
              />
            ) : (
              <h2> {addUser.dPhone}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>요청 사항 :</span>
          <span>
            {updateInput === true ? (
              <input
                type="text"
                defaultValue={addUser.dMemo}
                onChange={(e) => setDmemo(e.target.value)}
              />
            ) : (
              <h2> {addUser.dMemo}</h2>
            )}
          </span>
        </div>
        <div className={classes["address-item-update"]}>
          {!updateInput ? (
            <>
              <button type="button">선택</button>
              {/* 선택전용 db만들어서 넣어야함*/}
              <button
                type="button"
                onClick={(e) => {
                  setUpdateInput(!updateInput);
                  setTargetNum(e.target.name);
                  setUpdateSate(true);
                }}
                name={addUser.idx}
              >
                수정
              </button>
              <button type="button" onClick={deleteAddr}>
                삭제
              </button>
            </>
          ) : (
            <>
              <button type="button" name={addUser.idx} onClick={updateAddr}>
                저장
              </button>
              <button
                type="button"
                onClick={() => {
                  setUpdateInput(!updateInput);
                  setUpdateSate(false);
                }}
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressItem;
