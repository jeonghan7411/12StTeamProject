import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MyPageAddress.module.css";
import MyPageAddressAdd from "./MyPageAddressAdd";
import MyPageAddressItem from "./MyPageAddressItem";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import axios from "axios";

import { getUser } from "../../../util/getUser";

const MyPageAddress = () => {
  const [user, setUser] = useState({}); //유저 정보 받아오는 곳

  const [addUser, setAddUser] = useState([]); // 추가 된 주소 저장

  const [addState, setAddState] = useState({
    name: "",
    phone: "",
    zipcode: "",
    uAddress: "",
    detail: "",
    plz: "",
  }); //주소 추가 값 받아오기

  const [addAddress, setAddAddress] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage", { withCredentials: true })
        .then((response) => {
          if (response.data.status === 401) {
            alert(response.data.message);
            navigate("/login", { replace: true });
          } else if (response.data.status === 200) {
            getUser(setUser);
          }
        });
    };
    fetchData();
  }, []);

  const addAddressItem = async (e) => {
    e.preventDefault();
    if (addState.name === "") {
      console.log("ok");
    }
    // setAddUser([...addUser, addState]);
    addDeliver();
  };
  const addDeliver = async () => {
    await axios.post("http://localhost:5000/adddeliver", { user, addState });
    setAddAddress(!addAddress);
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
              <button onClick={() => setAddAddress(!addAddress)}>
                추가하기
              </button>
            ) : (
              <div className={classes["additem-button"]}>
                <button type="submit">추가</button>
                <button
                  type="button"
                  onClick={() => setAddAddress(!addAddress)}
                >
                  취소
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddress;
