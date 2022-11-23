import React, { useEffect, useState } from "react";
import axios from "axios";
import MyPageAddressAdd from "./MyPageAddressAdd";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import { getUser } from "../../../util/getUser";
import { authCheck, cookieCheck } from "../../../util/authCheck";

import classes from "./MyPageAddress.module.css";
const MyPageAddress = () => {
  const [user, setUser] = useState({}); //유저 정보 받아오는 곳

  const [addUser, setAddUser] = useState([]); // 추가 된 주소 저장
  const [reset, setReset] = useState(false);

  const [addAddress, setAddAddress] = useState(false);
  const [defaultAddr, setDefaultAddr] = useState([]);

  useEffect(() => {
    const addlist = async () => {
      await axios
        .get(
          "http://localhost:5000/mypage/api/addlist",

          {
            withCredentials: true,
          }
        )
        .then((listRes) => {
          if (listRes.data.status === 200) {
            setAddUser(listRes.data.user);
          }
        });
    };

    const defaultaddr = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/defaultaddr", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setDefaultAddr(response.data.user);
          }
        });
    };
    defaultaddr();
    addlist();
  }, [reset]);

  const [updateState, setUpdateSate] = useState(false);

  const [targetNum, setTargetNum] = useState("");

  const getNum = (e) => {
    setUpdateSate(true);
    setTargetNum(e.target.name);
  };

  console.log(defaultAddr[0]);
  return (
    <React.Fragment>
      <div className={classes.MyPageAddress}>
        <div>
          <MyPageListTitle text={"기본 배송지"} />
        </div>
        {/* <div>
          <MyPageAddressItem addUser={defaultAddr[0]} />
        </div> */}

        <div className={classes["default-addr"]}>
          <MyPageListTitle text={"배송지 관리"} />
        </div>
        {addAddress === true ? (
          <MyPageAddressAdd
            user={user}
            addAddress={addAddress}
            setAddAddress={setAddAddress}
            reset={reset}
            setReset={setReset}
          />
        ) : (
          <div>
            {addUser.length === 0 && (
              <MyPageNullMsg
                className={classes["address-content-null"]}
                text={"등록된 주소가 없습니다."}
              />
            )}

            {addUser.map((user, idx) => (
              <MyPageAddressItem
                key={idx}
                addUser={user}
                getNum={getNum}
                targetNum={targetNum}
                setTargetNum={setTargetNum}
                setUpdateSate={setUpdateSate}
                reset={reset}
                setReset={setReset}
              />
            ))}
          </div>
        )}
        <div className={classes["address-wrap-content"]}></div>
        <div className={classes["address-wrap-button"]}>
          {addAddress === false && updateState === false ? (
            <button type="button" onClick={() => setAddAddress(true)}>
              추가하기
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
