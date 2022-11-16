import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyPageAddressAdd from "./MyPageAddressAdd";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({ addUser, reset, setReset }) => {
  const navigate = useNavigate();

  const [updateItem, setUpdateItem] = useState(false);

  const deleteAddr = async () => [
    await axios
      .post("http://localhost:5000/addrdelete", { addUser })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          window.location.href = "http://localhost:3000/mypage/mypageaddress";
          // setReset(!reset);
        }
      }),
  ];

  const updateAddr = async () => {
    // await axios
  };
  return (
    <React.Fragment>
      {!updateItem ? (
        <div className={classes.MyPageAddressItem}>
          <div className={classes["address-item-title"]}>
            <h2>{addUser.uName}</h2>
          </div>
          <div className={classes["address-item-addr"]}>{addUser.dZipcode}</div>
          <div className={classes["address-item-addr"]}>{addUser.dAddr}</div>
          <div className={classes["address-item-addr"]}>
            {addUser.uAdditionalAddr}
          </div>
          <div className={classes["address-item-tel"]}>{addUser.dPhone}</div>
          <div className={classes["address-item-plz"]}>{addUser.dMemo}</div>
          <div className={classes["address-item-update"]}>
            <button type="button">선택</button>
            <button type="button" onClick={() => setUpdateItem(true)}>
              수정
            </button>
            <button type="button" onClick={deleteAddr}>
              삭제
            </button>
          </div>
        </div>
      ) : (
        <div className={classes.MyPageAddressItem}>
          <div className={classes["address-item-title"]}>
            <h2>{addUser.uName}</h2>
          </div>
          <div className={classes["address-item-addr"]}>
            <input />
          </div>
          <div className={classes["address-item-addr"]}>{addUser.dAddr}</div>
          <div className={classes["address-item-addr"]}>
            {addUser.uAdditionalAddr}
          </div>
          <div className={classes["address-item-tel"]}>{addUser.dPhone}</div>
          <div className={classes["address-item-plz"]}>{addUser.dMemo}</div>
          <div className={classes["address-item-update"]}>
            <button type="button">선택</button>
            <button type="button" onClick={() => setUpdateItem(true)}>
              수정
            </button>
            <button type="button" onClick={deleteAddr}>
              삭제
            </button>
          </div>
        </div>

        // <MyPageAddressAdd />
      )}
    </React.Fragment>
  );
};

export default MyPageAddressItem;
