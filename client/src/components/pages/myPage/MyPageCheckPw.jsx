import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./MyPageCheckPw.module.css";
import MyPageListTitle from "./MyPageListTitle";

import { getUser } from "../../../util/getUser";

const MyPageCheckPw = ({ setUserPw }) => {
  const [checkInputPw, setCheckInputPw] = useState();

  const [user, setUser] = useState({});

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

  const checkPw = (e) => {
    e.preventDefault();

    if (checkInputPw != user.uPasswd) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      setUserPw(true);
      alert("본인확인이 완료 되었습니다.");
    }
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
                <input type="text" readOnly value={user.uName} />
              </div>
            </div>

            <div
              className={`${classes["checkpw-wrap-item"]} ${classes["checkpw-wrap-item-border"]}`}
            >
              <div className={classes["checkpw-title"]}>비밀번호</div>
              <div className={classes["checkpw-input"]}>
                <input
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
              onClick={() => navigate("/", { replace: true })}
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
