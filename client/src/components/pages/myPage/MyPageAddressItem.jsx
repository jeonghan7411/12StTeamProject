import React from "react";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({ addUser }) => {
  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-title"]}>
          <h2>{addUser.id}</h2>
        </div>
        <div className={classes["address-item-addr"]}>{addUser.address}</div>
        <div className={classes["address-item-tel"]}>{addUser.tel}</div>
        <div className={classes["address-item-plz"]}>{addUser.plz}</div>
        <div className={classes["address-item-update"]}>
          <button>수정</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressItem;
