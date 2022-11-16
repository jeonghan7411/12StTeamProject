import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MyPageAddress.module.css";
import MyPageAddressAdd from "./MyPageAddressAdd";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import axios from "axios";

import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";
import MyPageUpdateAddr from "./MyPageUpdateAddr";

const MyPageAddress = () => {
  const [user, setUser] = useState({}); //유저 정보 받아오는 곳
  const [uMemo, setUmemo] = useState("");
  const [addUser, setAddUser] = useState([]); // 추가 된 주소 저장
  const [reset, setReset] = useState(false);

  const [addAddress, setAddAddress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // const fetchData = async () => {

    //   await axios
    //     .get("http://localhost:5000/mypage", { withCredentials: true })
    //     .then((response) => {
    //       if (response.data.status === 401) {
    //         alert(response.data.message);
    //         navigate("/login", { replace: true });
    //       } else if (response.data.status === 200) {
    //         getUser(setUser);
    //         const addlist = async () => {
    //           await axios
    //             .get("http://localhost:5000/addlist", {
    //               withCredentials: true,
    //             })
    //             .then((listRes) => {
    //               if (listRes.data.status === 200) {
    //                 setAddUser(listRes.data.user);

    //                 // navigate("/mypage/mypageaddress", { replace: true });
    //               }
    //             });
    //         };
    //         addlist();
    //       }
    //     });
    // };
    // fetchData();

    authCheck();

    getUser(setUser);
    const addlist = async () => {
      await axios
        .get(
          "http://localhost:5000/addlist",

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
    addlist();
  }, [reset]);

  const addDeliver = async () => {
    await axios
      .post("http://localhost:5000/adddeliver", { user, uMemo })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          setReset(!reset);
          // window.location.href = "http://localhost:3000/mypage/mypageaddress";
        }
      });
    setAddAddress(!addAddress);
  };

  const [updateState, setUpdateSate] = useState(false);
  // const [testa, setTestA] = useState({});

  const [targetNum, setTargetNum] = useState("");
  const getNum = (e) => {
    setUpdateSate(true);
    setTargetNum(e.target.name);
  };

  const addAddressItem = async (e) => {
    e.preventDefault();
    addDeliver();
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddress}>
        <div>
          <MyPageListTitle text={"배송지 관리"} />
        </div>

        <form method="post" onSubmit={addAddressItem}>
          <div className={classes["address-wrap-content"]}>
            {!addAddress ? (
              <>
                {addUser.length === 0 && (
                  <MyPageNullMsg
                    className={classes["address-content-null"]}
                    text={"등록된 주소가 없습니다."}
                  />
                )}
                {!updateState ? (
                  <>
                    {addUser.map((user) => (
                      <MyPageAddressItem
                        key={user.idx}
                        addUser={user}
                        setAddUser={setAddUser}
                        getNum={getNum}
                        setUpdateSate={setUpdateSate}
                        setReset={setReset}
                      />
                    ))}
                  </>
                ) : (
                  <MyPageUpdateAddr
                    addUser={addUser}
                    setAddUser={setAddUser}
                    targetNum={targetNum}
                    setUpdateSate={setUpdateSate}
                  />
                )}
              </>
            ) : (
              <MyPageAddressAdd
                user={user}
                setUser={setUser}
                setUmemo={setUmemo}
              />
            )}
          </div>

          <div className={classes["address-wrap-button"]}>
            {addAddress === false && updateState === false ? (
              <button onClick={() => setAddAddress(true)}>추가하기</button>
            ) : (
              <div className={classes["additem-button"]}>
                {!updateState && (
                  <>
                    <button type="submit">추가</button>
                    <button type="button" onClick={() => setAddAddress(false)}>
                      취소
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
