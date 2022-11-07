import React from "react";

import classes from "./MyPageCheckPw.module.css";
import MyPageListTitle from "./MyPageListTitle";

const MyPageCheckPw = ({ setUserPw }) => {
  const checkPw = () => {
    setUserPw(true);
  };
  return (
    <React.Fragment>
      <div className={classes.MyPageCheckPw}>
        <MyPageListTitle text={"회원 정보 확인"} />
        <div className={classes["checkpw-wrap-title"]}>
          <span>홍길동</span> 님의 정보를 안전하게 보호하기 위해 비밀번호를 다시
          한번 확인 합니다.
        </div>
        <form action="" onSubmit={checkPw}>
          <div className={classes["checkpw-wrap-content"]}>
            <div className={classes["checkpw-wrap-item"]}>
              <div className={classes["checkpw-title"]}>아이디</div>
              <div
                className={`${classes["checkpw-input"]} ${classes["checkpw-input-id"]}`}
              >
                <input type="text" readOnly value={"홍길동"} />
              </div>
            </div>

            <div
              className={`${classes["checkpw-wrap-item"]} ${classes["checkpw-wrap-item-border"]}`}
            >
              <div className={classes["checkpw-title"]}>비밀번호</div>
              <div className={classes["checkpw-input"]}>
                <input type="password" />
              </div>
            </div>
          </div>

          <div className={classes["checkpw-wrap-button"]}>
            <button type="submit">확인</button>
            <button type="button" onClick={() => window.history.back()}>
              취소
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageCheckPw;
