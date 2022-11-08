import React from "react";

import classes from "./MyPageAddressItem.module.css";

const MyPageAddressItem = ({ id, address, tel, plz }) => {
  return (
    <React.Fragment>
      <div className={classes.MyPageAddressItem}>
        <div className={classes["address-item-title"]}>
          <h2>{id}</h2>
        </div>
        <div className={classes["address-item-addr"]}>{address}</div>
        <div className={classes["address-item-tel"]}>{tel}</div>
        <div className={classes["address-item-plz"]}>{plz}</div>
        <div className={classes["address-item-update"]}>
          <button>수정</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressItem;
