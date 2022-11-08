import React from "react";
import { useState } from "react";

import classes from "./MyPageAddress.module.css";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";

const MyPageAddress = () => {
  const [user, setUser] = useState([
    {
      id: "1",
      address: "2",
      tel: "3",
      plz: "4",
    },
    {
      id: "1",
      address: "2",
      tel: "3",
      plz: "4",
    },
    {
      id: "1",
      address: "2",
      tel: "3",
      plz: "4",
    },
  ]);
  console.log(user.length);

  const addAddress = () => {
    alert("ok");
    setUser([
      ...user,
      {
        id: "",
        address: "",
        tel: "",
        plz: "",
      },
    ]);
  };
  return (
    <React.Fragment>
      <div className={classes.MyPageAddress}>
        <div>
          <MyPageListTitle text={"배송지 관리"} />
        </div>

        <div className={classes["address-wrap-content"]}>
          {user.map((item) => (
            <MyPageAddressItem
              id={item.id}
              address={item.address}
              tel={item.tel}
              plz={item.plz}
            />
          ))}
        </div>

        <div className={classes["address-wrap-button"]}>
          <button onClick={addAddress}>추가하기</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
