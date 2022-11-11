import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import UserInfoInput from "./UserInfoInput";
import ModalConfirmation from "./ModalConfirmation";
import useUserInput from "../../../hooks/use-userInput";
import RegistSection from "./RegistSection";

import classes from "./RegistUserInfoInput.module.css";
import { clause, personalInfo } from "../../../util/clause";

// 이메일 배열
const email = [
  "naver.com",
  "hanmail.net",
  "daum.net",
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
];

// 유효성 검사 로직

const passwdRegex = /^[0-9a-zA-Z!@#$%]/gi;
const exRegex = /\s/;

console.log(exRegex.test("12 3"));

const checkId = (value) =>
  value.trim().length >= 5 && value.trim().length <= 20;

const checkName = (value) => value.trim().length >= 2;

const checkPasswd = (value) =>
  // passwdRegex.test(value) &&
  value.trim().length >= 8;

const checkPhone = (value) => value.trim().length >= 8;

const checkEmail = (value) => value.trim().length > 0;

const RegistUserInfoInput = () => {
  const [isShown, setIsShow] = useState(false);

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectEmail, setSelectEmail] = useState("선택해주세요");
  const [isNoneSelectEmail, setIsNoneSelectEmail] = useState(false);
  const [isShownEmail, setIsShownEmail] = useState(false);

  const [isDuplication, setIsDuplication] = useState(false);

  const navigate = useNavigate();

  // 커스텀 훅
  const {
    value: enteredId,
    isValid: enteredIdIsValid,
    hasError: idHasError,
    HandleValueChange: handleIdChange,
    HandleInputBlur: handleIdBlur,
    reset: resetIdInput,
  } = useUserInput(checkId);

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
    isDuplication &&
    enteredIdIsValid &&
    enteredNameIsValid &&
    enteredPasswdIsValid &&
    enteredRePasswdIsValid &&
    enteredPhoneIsValid &&
    enteredEmailIsValid &&
    checkedItems.length === 2;

  console.log(`${enteredEmail}@${selectEmail}`);

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
        uEamil: `${enteredEmail}@${selectEmail}`,
        uPhone: enteredPhone,
      })
      .then((response) => {
        if (response.data.status === "200") {
          window.alert("회원가입을 축하드립니다.");

          resetIdInput();
          resetnameInput();
          resetPasswd();
          resetRePasswd();
          resetPhone();
          resetEmail();

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
    setIsNoneSelectEmail(false);
    setSelectEmail(selected);
    setIsShownEmail(false);
  };

  const handleNoneSelectEmail = (value) => {
    setIsNoneSelectEmail(true);
    setSelectEmail(value);
  };

  const handleDuplication = async () => {
    if (enteredIdIsValid) {
      await axios
        .post("http://localhost:5000/duplication", { uId: enteredId })
        .then((response) => {
          console.log(response.data.message);
          if (response.data.status === 409) {
            window.alert(response.data.message);
          } else if (response.data.status === 200) {
            setIsDuplication(true);
            window.alert(response.data.message);
          }
        });
    } else {
      window.alert("유효한 아이디를 입력해주세요");
    }
  };

  console.log(`${enteredEmail}@${selectEmail}`);
  console.log(selectEmail);

  return (
    <>
      <RegistSection title={"1 정보입력"}>
        <div className={classes["sectionUserInfoInput"]}>
          {isShown && <ModalConfirmation onClose={() => setIsShow(!isShown)} />}

          <div className={classes["sectionUserInfoInput-input"]}>
            {!isDuplication && (
              <p className={classes["sectionUserInfoInput-error"]}>
                아이디 중복검사를 해주세요.
              </p>
            )}
            <UserInfoInput
              id="id"
              type="text"
              text="아이디"
              className={idInputClasses}
              onChange={handleIdChange}
              onBlur={handleIdBlur}
            >
              <button
                className={classes["sectionUserInfoInput-duplication"]}
                onClick={handleDuplication}
              >
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
                영문, 숫자, 특수문자를 포함한 8자 이상의 비밀번호를
                입력해주세요.
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
                  {isNoneSelectEmail && (
                    <div
                      className={
                        classes["sectionUserInfoInput-control-noneSelected"]
                      }
                    >
                      <input
                        onChange={(e) => handleNoneSelectEmail(e.target.value)}
                        className={
                          classes[
                            "sectionUserInfoInput-control-noneSelected__input"
                          ]
                        }
                      />
                      <button
                        onClick={() => setIsNoneSelectEmail((prev) => !prev)}
                      >
                        X
                      </button>
                    </div>
                  )}

                  {!isNoneSelectEmail && (
                    <>
                      <div
                        className={
                          classes["sectionUserInfoInput-control-selected"]
                        }
                        onClick={handleShowEmail}
                      >
                        {selectEmail}
                      </div>
                      {isShownEmail && (
                        <ul
                          className={
                            classes["sectionUserInfoInpu-control-items"]
                          }
                        >
                          <li>
                            <button
                              className={
                                classes[
                                  "sectionUserInfoInpu-control-items__none"
                                ]
                              }
                            >
                              선택해주세요
                            </button>
                          </li>

                          {email.map((it, idx) => (
                            <li key={idx}>
                              <button onClick={() => handleEmailValue(it)}>
                                {it}
                              </button>
                            </li>
                          ))}

                          <li>
                            <button onClick={() => setIsNoneSelectEmail(true)}>
                              직접입력
                            </button>
                          </li>
                        </ul>
                      )}
                    </>
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
            <div className={classes["clause-content-check"]}>
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
            <div className={classes["clause-content-check"]}>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, "check1")}
                checked={
                  isAllChecked
                    ? "checked"
                    : checkedItems.find((it) => it === "check1")
                    ? "checked"
                    : ""
                }
              />
              약관에 동의합니다.
            </div>

            <h3 className={classes["clause-title"]}>
              개인정보 수집 및 이용 동의 <span>(필수)</span>
            </h3>
            <div className={classes["clause-content"]}>
              <p>{personalInfo}</p>
            </div>
            <div className={classes["clause-content-check"]}>
              <input
                type="checkbox"
                onChange={(e) => handleChecked(e.target.checked, "check2")}
                checked={
                  isAllChecked
                    ? "checked"
                    : checkedItems.find((it) => it === "check2")
                    ? "checked"
                    : ""
                }
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
