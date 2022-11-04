import React, { useState } from "react";

import UserInfoInput from "./UserInfoInput";

import classes from "./SectionUserInfoInput.module.css";
import ModalConfirmation from "./ModalConfirmation";

const SectionUserInfoInput = () => {
  const [isShown, setIsShow] = useState(false);

  return (
    <div className={classes["sectionUserInfoInput"]}>
      {isShown && <ModalConfirmation onClose={() => setIsShow(!isShown)} />}

      <UserInfoInput id="id" type="text" text="아이디" />
      <UserInfoInput id="passwd" type="password" text="비밀번호" />
      <UserInfoInput id="RePasswd" type="password" text="비밀번호 재입력" />

      <div className={classes["sectionUserInfoInput-input"]}>
        <UserInfoInput
          className={classes["sectionUserInfoInput-phone"]}
          id="phone"
          type="text"
          text="전화번호"
        >
          <div>010</div>
          <span>-</span>
          <button
            className={classes["sectionUserInfoInput-confirmation"]}
            onClick={() => setIsShow(!isShown)}
          >
            인증확인
          </button>
        </UserInfoInput>
      </div>

      <div>
        <div
          className={`${classes["sectionUserInfoInput-input"]} ${classes["sectionUserInfoInput-zipcode-wrap"]}`}
        >
          <UserInfoInput
            className={classes["sectionUserInfoInput-zipcode"]}
            type="text"
            text="주소"
            id="zipcode"
          >
            <button className={classes["regist-btn-searchAdress"]}>
              주소 찾기
            </button>
          </UserInfoInput>
        </div>

        <div className={classes["sectionUserInfoInput-address"]}>
          <input type="text" />
          <input type="text" />
        </div>
      </div>

      <div className={classes["sectionUserInfoInput-input"]}>
        <UserInfoInput
          className={classes["sectionUserInfoInput-email"]}
          type="text"
          text="이메일"
        >
          <div className={classes["sectionUserInfoInput-email-adress"]}>
            <span>@</span>
            <div className={classes["email-adress"]}>example.com</div>
          </div>
        </UserInfoInput>
      </div>
    </div>
  );
};

export default SectionUserInfoInput;
