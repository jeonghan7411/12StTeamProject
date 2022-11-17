import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageAddressAdd from "./MyPageAddressAdd";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({ addUser, getNum, targetNum }) => {
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

  const [updateInfo, setUpdateInfo] = useState(addUser[0]);
  // const updateInput = (e) => {
  //   setUpdateInfo({
  //     ...updateInfo,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  // const updateAddr = async (e) => {
  //   await axios
  //     .post("http://localhost:5000/mypage/api/addrupdate", {
  //       targetNum,
  //       updateInfo,
  //     })
  //     .then((response) => {
  //       if (response.data.status === 200) {
  //         alert(response.data.message);
  //         window.location.href = "http://localhost:3000/mypage/mypageaddress";
  //         // setUpdateSate(true);
  //       }
  //     });
  // };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-addr"]}>
          <input type="hidden" value={addUser.idx} />
          <span>이름 :</span>

          <span>
            <h2> {addUser.uName}</h2>
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>우편번호 :</span>
          <span>{addUser.dZipcode}</span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>주소 :</span>
          <span>{addUser.dAddr}</span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>상세주소 :</span>
          <span>{addUser.dAdditionalAddr}</span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>전화번호 :</span>
          <span>{addUser.dPhone}</span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>요청 사항 :</span>
          <span>{addUser.dMemo}</span>
        </div>
        <div className={classes["address-item-update"]}>
          <button type="button">선택</button>
          {/* 선택전용 db만들어서 넣어야함*/}
          <button type="button" onClick={getNum} name={addUser.idx}>
            수정
          </button>
          <button type="button" onClick={deleteAddr}>
            삭제
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressItem;
