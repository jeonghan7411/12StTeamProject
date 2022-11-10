import React, { useState } from "react";

import classes from "./MyPageAddress.module.css";
import MyPageAddressAdd from "./MyPageAddressAdd";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

const MyPageAddress = () => {
  const [user, setUser] = useState([
    //유저 정보 받아오는 곳
  ]);

  const [addUser, setAddUser] = useState([]); // 추가 된 주소 서장

  const [addState, setAddState] = useState({}); //주소 추가 값 받아오기

  const [addAddress, setAddAddress] = useState(false);

  const addAddressItem = (e) => {
    alert("ok");
    setAddUser([...addUser, addState]);

    setAddAddress(!addAddress);
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddress}>
        <div>
          <MyPageListTitle text={"배송지 관리"} />
        </div>

        <div className={classes["address-wrap-content"]}>
          {!addAddress ? (
            <>
              {addUser.length === 0 && (
                <MyPageNullMsg
                  className={classes["address-content-null"]}
                  text={"등록된 주소가 없습니다."}
                />
              )}
              {addUser.map((user) => (
                <MyPageAddressItem addUser={user} />
              ))}
            </>
          ) : (
            <MyPageAddressAdd
              user={user}
              addState={addState}
              setAddState={setAddState}
            />
          )}
        </div>

        <div className={classes["address-wrap-button"]}>
          {!addAddress ? (
            <button onClick={() => setAddAddress(!addAddress)}>추가하기</button>
          ) : (
            <div className={classes["additem-button"]}>
              <button onClick={addAddressItem}>추가</button>
              <button onClick={() => setAddAddress(!addAddress)}>취소</button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
