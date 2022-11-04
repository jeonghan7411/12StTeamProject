import React from "react";

import classes from "./Regist.module.css";

const Regist = () => {
  return (
    <>
      <div>
        <h3>1 정보입력</h3>

        <form className={classes["regist-input-wrap"]}>
          <div className={classes["regist-input"]}>
            {/* <div className={classes["regist-input-label"]}> */}
            <label htmlFor="id">아이디</label>
            {/* </div> */}
            <input id="id" />
          </div>
          <div className={classes["regist-input"]}>
            <label htmlFor="passwd">비밀번호</label>

            <input id="passwd" />
          </div>
          <div className={classes["regist-input"]}>
            <label htmlFor="rePasswd">비빌번호 확인</label>

            <input id="rePasswd" />
          </div>
          <div className={classes["regist-input"]}>
            <label htmlFor="name">이름</label>

            <input id="name" />
          </div>
          <div className={classes["regist-input"]}>
            <label htmlFor="birth">생년월일</label>

            <input id="birth" />
          </div>

          <div className={classes["regist-input"]}>
            <label htmlFor="gender">성별</label>

            <div className={`${classes["regist-input-gender"]}`}>
              <input type="radio" value="남자" />
              <span> 남자</span>
              <input type="radio" value="여자" />
              <span> 여자</span>
            </div>
          </div>

          <div className={classes["regist-input"]}>
            <label htmlFor="phone">휴대전화</label>

            <div className={`${classes["regist-input-phone"]}`}>
              <select>
                <option>010</option>
                <option>011</option>
                <option>012</option>
              </select>
              <input id="phone" />
            </div>
          </div>
        </form>
      </div>

      <div className={`${classes["regist-clause-wrap"]}`}>
        <h3>2 약관동의</h3>
        <div className={`${classes["regist-clause-content"]}`}></div>
      </div>

      <div className={classes["resist-control"]}>
        <button className={classes["resist-control-btn"]} text="취소" />
        <button className={classes["resist-control-btn"]} text="회원가입" />
      </div>
    </>
  );
};

export default Regist;
