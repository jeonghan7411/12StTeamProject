import axios from "axios";
import React from "react";
import { useState } from "react";

// import { useNavigate } from "react-router-dom";
// import MyPageAddressAdd from "./MyPageAddressAdd";

import classes from "./MyPageUpdateAddr.module.css";

const MyPageUpdateAddr = ({
  addUser,
  setAddUser,
  setUpdateSate,
  targetNum,
}) => {
  const [updateInfo, setUpdateInfo] = useState(addUser[0]);
  const updateInput = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name]: e.target.value,
    });
  };

  const updateAddr = async (e) => {
    await axios
      .post("http://localhost:5000/mypage/api/addrupdate", {
        targetNum,
        updateInfo,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          window.location.href = "http://localhost:3000/mypage/mypageaddress";
          setUpdateSate(true);
        }
      });
  };
  <span>
    <button>주소찾기</button>
  </span>;
  return (
    <React.Fragment>
      <div className={classes.MyPageUpdateAddr}>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>이름</h2>
          </span>
          <span>
            <input type="text" name="uName" onChange={updateInput} />
            <input type="hidden" value={addUser.idx} />
          </span>
        </div>

        <div className={classes["address-item-button"]}>
          <span>
            <button type="button">주소검색</button>
          </span>
        </div>

        <div className={classes["address-item-addr"]}>
          <span>
            <h2>우편번호</h2>
          </span>
          <span>
            <input type="text" name="dZipcode" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>주소</h2>
          </span>
          <span>
            <input type="text" name="dAddr" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>상세주소</h2>
          </span>
          <span>
            <input type="text" name="uAdditionalAddr" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>전화번호</h2>
          </span>
          <span>
            <input type="text" name="dPhone" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>
            <h2>요청 사항</h2>
          </span>
          <span>
            <input type="text" name="dMemo" onChange={updateInput} />
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
