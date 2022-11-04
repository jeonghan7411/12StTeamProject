import React from "react";

import classes from "./Regist.module.css";

const Regist = () => {
  return (
    <div className={classes.regist}>
      <header className={classes["regist-haader"]}>
        <h2>회원가입</h2>
      </header>
      <div className={classes["regist-userInfo"]}>
        <h3>1 정보입력</h3>

        <div className={classes["regist-userInfo-input"]}>
          <label htmlFor="name">이름</label>
          <input type="text" id="id" />
          <label htmlFor="id">아이디</label>
          <input type="text" id="id" />
          <label htmlFor="passwd">비밀번호</label>
          <input type="text" id="id" />
          <label htmlFor="rePasswd">비밀번호 재입력</label>
          <input type="text" id="id" />
          <label htmlFor="phone">전화번호</label>

          <div className={classes["regist-userInfo-phone"]}>
            <div>010</div>
            <span>-</span>
            <input type="text" id="id" />
            <button className={classes["regist-btn-confirmation"]}>
              인증확인
            </button>
          </div>

          <label htmlFor="adress">주소</label>
          <div>
            <div className={classes["regist-userInfo-zipcode"]}>
              <input id="adress" />
              <button>주소 찾기</button>
            </div>
            <div className={classes["regist-userInfo-address"]}>
              <input type="text" />
              <input type="text" />
            </div>
          </div>

          <label htmlFor="id">이메일</label>
          <div className={classes["regist-userInfo-email"]}>
            <input type="text" id="id" />
            <span>@</span>
            <div>example.com</div>
          </div>
        </div>
      </div>

      <div className={classes["regist-clause"]}>
        <h3>2 약관동의</h3>

        <div className={classes["regist-clause-contentWrap"]}>
          <p>
            <input type="checkbox" />
            전체 약관에 동의합니다.
          </p>

          <div className={classes["regist-clause-content"]}></div>
          <p>
            <input type="checkbox" /> 약관에 동의합니다.
          </p>

          <div className={classes["regist-clause-content"]}></div>
          <p>
            <input type="checkbox" /> 약관에 동의합니다.
          </p>
        </div>
      </div>

      <div className={classes["regist-control"]}>
        <button className={classes["regist-control-cencel"]}>취소</button>
        <button className={classes["regist-control-regist"]}>회원가입</button>
      </div>
    </div>
  );
};

export default Regist;
