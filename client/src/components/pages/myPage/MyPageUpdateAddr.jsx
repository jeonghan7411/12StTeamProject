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
      .post("http://localhost:5000/addrupdate", { targetNum, updateInfo })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          setUpdateSate(true);
        }
      });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-addr"]}>
          <input type="hidden" value={addUser.idx} />
          <span>이름 :</span>
          <span>
            <input type="text" name="uName" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>우편번호 :</span>
          <span>
            <input type="text" name="dZipcode" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>주소 :</span>
          <span>
            <input type="text" name="dAddr" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>상세주소 :</span>
          <span>
            <input type="text" name="uAdditionalAddr" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>전화번호 :</span>
          <span>
            <input type="text" name="dPhone" onChange={updateInput} />
          </span>
        </div>
        <div className={classes["address-item-addr"]}>
          <span>요청 사항 :</span>
          <span>
            <input type="text" name="dMemo" onChange={updateInput} />
          </span>
        </div>
        <div>
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
