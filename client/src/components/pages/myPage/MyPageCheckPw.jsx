import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./MyPageCheckPw.module.css";
import MyPageListTitle from "./MyPageListTitle";

const MyPageCheckPw = ({ user, setUserPw }) => {
  const [checkInputPw, setCheckInputPw] = useState();

  // const [user, setUser] = useState({});
  const pwInput = useRef();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios
  //       .get("http://localhost:5000/", { withCredentials: true })
  //       .then((response) => {
  //         if (response.data.status === 401) {
  //           alert(response.data.message);
  //           navigate("/login", { replace: true });
  //         } else if (response.data.status === 200) {
  //           getUser(setUser);
  //         }
  //       });
  //   };
  //   fetchData();
  //   authCheck();
  //   getUser(setUser);
  // }, []);

  const checkPw = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:5000/mypage/api/checkingpw", {
        user,
        checkInputPw,
      })
      .then((response) => {
        const msg = response.data.message;
        if (response.data.status === 200) {
          alert(msg);
          setUserPw(true);
        } else if (response.data.status === 400) {
          alert(msg);
          pwInput.current.focus();
        } else if (response.data.status === 401) {
          alert(msg);
          pwInput.current.focus();
        }
      });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageCheckPw}>
        <MyPageListTitle text={"회원 정보 확인"} />
        <div className={classes["checkpw-wrap-title"]}>
          <span>{user.uName}</span>
          님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번 확인 합니다.
        </div>
        <form action="" onSubmit={checkPw}>
          <div className={classes["checkpw-wrap-content"]}>
            <div className={classes["checkpw-wrap-item"]}>
              <div className={classes["checkpw-title"]}>아이디</div>
              <div
                className={`${classes["checkpw-input"]} ${classes["checkpw-input-id"]}`}
              >
                <input type="text" readOnly defaultValue={user.uName} />
              </div>
            </div>

            <div
              className={`${classes["checkpw-wrap-item"]} ${classes["checkpw-wrap-item-border"]}`}
            >
              <div className={classes["checkpw-title"]}>비밀번호</div>
              <div className={classes["checkpw-input"]}>
                <input
                  ref={pwInput}
                  type="password"
                  onChange={(e) => setCheckInputPw(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={classes["checkpw-wrap-button"]}>
            <button type="submit">확인</button>
            <button
              type="button"
              onClick={() => navigate(-1, { replace: true })}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageCheckPw;
