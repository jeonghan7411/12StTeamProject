import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import UserInfoInput from "./UserInfoInput";
import ModalConfirmation from "./ModalConfirmation";
import useUserInput from "../../../hooks/use-userInput";
import RegistSection from "./RegistSection";

import classes from "./RegistUserInfoInput.module.css";
import { clause, personalInfo } from "../../../util/clause";
import { registAction } from "../../../store/registSlice";

// // 유효성 검사 로직
// const checkId = (value) =>
//   value.trim().length >= 5 && value.trim().length <= 20;

const checkName = (value) => value.trim().length >= 2;

const checkPasswd = (value) => value.trim().length >= 8;

const checkPhone = (value) => value.trim().length >= 8;

const checkEmail = (value) => value.trim().length > 0;

const RegistUserInfoInput = () => {
  const [isShown, setIsShow] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectEmail, setSelectEmail] = useState("선택해주세요");
  const [isShownEmail, setIsShownEmail] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const enteredId = useSelector((state) => state.regist.enteredId);
  const idHasError = useSelector((state) => state.regist.idHasError);
  console.log(idHasError);

  // 커스텀 훅
  // const {
  //   value: enteredId,
  //   isValid: enteredIdIsValid,
  //   hasError: idHasError,
  //   HandleValueChange: handleIdChange,
  //   HandleInputBlur: handleIdBlur,
  //   reset: resetIdInput,
  // } = useUserInput(checkId);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    HandleValueChange: handlenameChange,
    HandleInputBlur: handlenameBlur,
    reset: resetnameInput,
  } = useUserInput(checkName);

  const {
    value: enteredPasswd,
    isValid: enteredPasswdIsValid,
    hasError: passwdHasError,
    HandleValueChange: handlePasswdChange,
    HandleInputBlur: handlePasswdBlur,
    reset: resetPasswd,
  } = useUserInput(checkPasswd);

  const {
    value: enteredRePasswd,
    isValid: enteredRePasswdIsValid,
    hasError: rePasswdHasError,
    HandleValueChange: handleRePasswdChange,
    HandleInputBlur: handleRePasswdBlur,
    reset: resetRePasswd,
  } = useUserInput((value) => value.trim() === enteredPasswd);

  const {
    value: enteredPhone,
    isValid: enteredPhoneIsValid,
    hasError: phoneHasError,
    HandleValueChange: handlePhoneChange,
    HandleInputBlur: handlePhoneBlur,
    reset: resetPhone,
  } = useUserInput(checkPhone);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    HandleValueChange: handleEmailChange,
    HandleInputBlur: handleEmailBlur,
    reset: resetEmail,
  } = useUserInput(checkEmail);

  //이메일 선택
  const handleEmail = (selected) => {
    setSelectEmail(selected);
  };
  // 약관 체크
  const handleChecked = (checked, id) => {
    if (checked) {
      if (id === "allCheck") {
        setIsAllChecked(true);
        setCheckedItems(["check1", "check2"]);
        console.log("전체 체크 성공");
        return;
      }
      setCheckedItems([...checkedItems, id]);
      console.log(`${id}번 체크 성공`);
    } else {
      if (id === "allCheck") {
        setIsAllChecked(false);
        setCheckedItems([]);
        console.log("전체 체크 해체 성공");
        return;
      }

      setCheckedItems(checkedItems.filter((it) => it !== id));
      console.log(`${id}번 체크 해체 성공`);
    }
  };

  // hasError에 따른 className 변경
  const idInputClasses = idHasError
    ? `${classes["sectionUserInfoInput-id"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-id"];
  const nameInputClasses = nameHasError ? classes.hasError : "";
  const passwdInputClasses = passwdHasError ? classes.hasError : "";
  const rePasswdInputClasses = rePasswdHasError ? classes.hasError : "";
  const phoneInputClasses = phoneHasError
    ? `${classes["sectionUserInfoInput-phone"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-phone"];
  const emailInputClasses = emailHasError
    ? `${classes["sectionUserInfoInput-email"]} ${classes.hasError}`
    : classes["sectionUserInfoInput-email"];

  // registIsValid가 false이면 입력 유효성 중 하나는 false
  let registIsValid =
    // enteredIdIsValid &&
    enteredNameIsValid &&
    enteredPasswdIsValid &&
    enteredRePasswdIsValid &&
    enteredPhoneIsValid &&
    enteredEmailIsValid &&
    checkedItems.length === 2;

  const handleRegist = async () => {
    if (!registIsValid) {
      return console.log("fail");
    }
    // // 서버 전송
    await axios
      .post("http://localhost:5000/regist", {
        uId: enteredId,
        uName: enteredName,
        uPasswd: enteredPasswd,
        uEmail: enteredEmail,
        uPhone: enteredPhone,
      })
      .then((response) => {
        if (response.data.status === "200") {
          window.alert("회원가입을 축하드립니다.");
          navigate("/");
        } else if (response.data.status === "400") {
          window.alert("관리자에게 문의 부탁드립니다.");
        }
      });
  };
  const handleShowEmail = () => {
    setIsShownEmail((prev) => !prev);
  };

  const handleEmailValue = (selected) => {
    setSelectEmail(selected);
    setIsShownEmail(false);
  };

  console.log(selectEmail);

  return (
    <>
      <RegistSection title={"1 정보입력"}>
        <div className={classes["sectionUserInfoInput"]}>
          {isShown && <ModalConfirmation onClose={() => setIsShow(!isShown)} />}

          <div className={classes["sectionUserInfoInput-input"]}>
            <UserInfoInput
              id="id"
              type="text"
              text="아이디"
              className={idInputClasses}
              onChange={(e) =>
                dispatch(registAction.handleIdChange(e.target.value))
              }
              onBlur={() => dispatch(registAction.handleIdBlur())}
            >
              <button className={classes["sectionUserInfoInput-duplication"]}>
                중복검사
              </button>
            </UserInfoInput>
          </div>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {idHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                5~20자의 영문 소문자, 숫자와 특수기호(_), (-)만 사용 가능합니다.
              </p>
            )}
          </div>

          <UserInfoInput
            id="name"
            type="text"
            text="이름"
            className={nameInputClasses}
            value={enteredName}
            onChange={handlenameChange}
            onBlur={handlenameBlur}
          ></UserInfoInput>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {nameHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                유효한 형식이 아닙니다.
              </p>
            )}
          </div>

          <UserInfoInput
            id="passwd"
            type="password"
            text="비밀번호"
            className={passwdInputClasses}
            value={enteredPasswd}
            onChange={handlePasswdChange}
            onBlur={handlePasswdBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {passwdHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                영문, 숫자를 포함한 8자 이상의 비밀번호를 입력해주세요.
              </p>
            )}
          </div>

          <UserInfoInput
            id="RePasswd"
            type="password"
            className={rePasswdInputClasses}
            text="비밀번호 재입력"
            value={enteredRePasswd}
            onChange={handleRePasswdChange}
            onBlur={handleRePasswdBlur}
          />
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {rePasswdHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <div className={classes["sectionUserInfoInput-input"]}>
            <UserInfoInput
              className={phoneInputClasses}
              id="phone"
              type="text"
              text="전화번호"
              value={enteredPhone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
            >
              <button
                className={classes["sectionUserInfoInput-confirmation"]}
                onClick={() => setIsShow(!isShown)}
              >
                인증확인
              </button>
            </UserInfoInput>
          </div>
          <div className={classes["sectionUserInfoInput-feedback"]}>
            {phoneHasError && (
              <p className={classes["sectionUserInfoInput-error"]}>
                유효하지 않은 전화번호 입력입니다.
              </p>
            )}
          </div>
          <div>
            <div className={classes["sectionUserInfoInput-zipcode-wrap"]}>
              <UserInfoInput
                className={classes["sectionUserInfoInput-zipcode"]}
                type="text"
                text="주소"
                id="zipcode"
                readOnly={true}
              >
                <button className={classes["regist-btn-searchAdress"]}>
                  주소 찾기
                </button>
              </UserInfoInput>
            </div>

            <div className={classes["sectionUserInfoInput-address"]}>
              <input type="text" readOnly style={{ cursor: "default" }} />
              <input type="text" />
            </div>
          </div>

          <div className={classes["sectionUserInfoInput-input"]}>
            <UserInfoInput
              className={emailInputClasses}
              type="text"
              text="이메일"
              value={enteredEmail}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
            >
              <div className={classes["sectionUserInfoInput-email-adress"]}>
                <span>@</span>
                <div className={classes["sectionUserInfoInput-control"]}>
                  <div
                    className={classes["sectionUserInfoInput-control-selected"]}
                    onClick={handleShowEmail}
                  >
                    {selectEmail}
                  </div>
                  {isShownEmail && (
                    <ul
                      className={classes["sectionUserInfoInpu-control-items"]}
                    >
                      <li>
                        <button onClick={() => handleEmailValue("naver.com")}>
                          naver.com
                        </button>
                      </li>
                      <li>
                        <button>naver.com</button>
                      </li>
                      <li>
                        <button>naver.com</button>
                      </li>
                      <li>
                        <button>naver.com</button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </UserInfoInput>
            <div className={classes["sectionUserInfoInput-feedback"]}>
              {emailHasError && (
                <p className={classes["sectionUserInfoInput-error"]}>
                  이메일을 입력해주세요.
                </p>
              )}
            </div>
          </div>
        </div>
      </RegistSection>

      <RegistSection title="2 약관동의">
        <div className={classes.clause}>
          <div className={classes["clause-contentWrap"]}>
            <div>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, "allCheck")}
              />
              전체 약관에 동의합니다.
            </div>

            <h3 className={classes["clause-title"]}>
              이용약관 동의 <span>(필수)</span>
            </h3>
            <div className={classes["clause-content"]}>
              <p>{clause}</p>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, "check1")}
                checked={isAllChecked ? "checked" : ""}
              />
              약관에 동의합니다.
            </div>

            <h3 className={classes["clause-title"]}>
              개인정보 수집 및 이용 동의 <span>(필수)</span>
            </h3>
            <div className={classes["clause-content"]}>
              <p>{personalInfo}</p>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, "check2")}
                checked={isAllChecked ? "checked" : ""}
              />
              약관에 동의합니다.
            </div>
          </div>
        </div>
      </RegistSection>

      <div className={classes["regist-control"]}>
        <button
          className={classes["regist-control-cencel"]}
          onClick={() => navigate("/")}
        >
          취소
        </button>
        <button
          className={classes["regist-control-regist"]}
          onClick={handleRegist}
        >
          회원가입
        </button>
      </div>
    </>
  );
};

export default RegistUserInfoInput;
