import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";

import axios from "axios";
import AddressModal from "../../layout/AddressModal";

const MyPagePassPw = () => {
  const navigate = useNavigate();
  //modal
  const [showAddr, setShowAddr] = useState(false);

  // 주소 값 받아오기
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");
  const [updateUserInfo, setUpdateUserInfo] = useState({});

  //pw on/off
  const [showPw, setShowPw] = useState(false);
  const [showCkPw, setShowCkPw] = useState(false);

  //에러상태
  const [nameErr, setNameErr] = useState(false);
  const [pwErr, setPwErr] = useState(false);
  const [pwCheckErr, setPwCheckErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);
  const [addrErr, setAddrErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [birthErr, setBirthErr] = useState(false);

  //에러메세지
  const [errNameMsg, setErrNameMsg] = useState("");
  const [errPwMsg, setErrPwMsg] = useState("");
  const [errPwCheckMsg, setErrPwCheckMsg] = useState("");
  const [errPhoneMsg, setErrPhoneMsg] = useState("");
  const [errAddrMsg, setErrAddrMsg] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState("");
  const [errBirthMsg, setErrBirthMsg] = useState("");

  const nameInput = useRef();
  const pwInput = useRef();
  const pwCheckInput = useRef();
  const phoneErrInput = useRef();
  const AddrInput = useRef();
  const EmailErrInput = useRef();
  const birthErrInput = useRef();

  const infoHandler = (e) => {
    const getName = e.target.name;
    const getItem = e.target.value;

    const nullCheck = /\s/; //공백체크
    const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
    const pwCheck = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const numCheck = /[0-9]/g;
    const spcCheck = /[!@#]/;
    // const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    switch (getName) {
      case "updateName":
        if (nullCheck.exec(getItem) || getItem === "") {
          nameInput.current.value = "";
          setNameErr(true);
          setErrNameMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (getItem.length < 2) {
          setNameErr(true);
          setErrNameMsg("이름은 최소 2글자 이상 입력해주세요. ");
          return;
        } else if (getItem.length > 5) {
          setNameErr(true);
          setErrNameMsg("이름은 최대 5글자를 넘길수 없습니다.");
          return;
        } else if (!nameCheck.exec(getItem)) {
          setNameErr(true);
          setErrNameMsg("올바른 이름의 형식이 아닙니다.");
          return;
        } else if (nameCheck.exec(getItem)) {
          setNameErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      case "updateBirth":
        if (nullCheck.exec(getItem) || getItem === "") {
          birthErrInput.current.value = "";
          setBirthErr(true);
          setErrBirthMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (!numCheck.exec(getItem)) {
          birthErrInput.current.value = "";
          setBirthErr(true);
          setErrBirthMsg("생년월일은 숫자만 입력 가능합니다.");
          return;
        } else if (getItem.length > 6) {
          setBirthErr(true);
          setErrBirthMsg("생년월일은 최대 6자리 입니다.");
          return;
        } else if (getItem.length < 6) {
          setBirthErr(true);
          setErrBirthMsg("생년월일 6자리를 입력해주세요.");
          return;
        } else {
          setBirthErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      case "updatePw":
        if (nullCheck.exec(getItem) || getItem === "" || getItem === null) {
          pwInput.current.value = "";
          setPwErr(true);
          setErrPwMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (getItem.length < 8) {
          setPwErr(true);
          setErrPwMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
          return;
        } else if (getItem.length > 15) {
          setPwErr(true);
          setErrPwMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
          return;
        } else if (!spcCheck.exec(getItem)) {
          setPwErr(true);
          setErrPwMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
          return;
        } else if (!pwCheck.exec(getItem) || !numCheck.exec(getItem)) {
          setPwErr(true);
          setErrPwMsg("문자 와 숫자는 1개이상 포함되어야 합니다.");
          return;
        } else if (pwCheck.exec(getItem)) {
          setPwErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;
      case "checkUpdatePw":
        if (nullCheck.exec(getItem) || getItem === "") {
          pwCheckInput.current.value = "";
          setPwCheckErr(true);
          setErrPwCheckMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (getItem.length < 8) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
          return;
        } else if (getItem.length > 15) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
          return;
        } else if (!spcCheck.exec(getItem)) {
          setPwCheckErr(true);
          setErrPwCheckMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
          return;
        } else if (!pwCheck.exec(getItem) || !numCheck.exec(getItem)) {
          setPwCheckErr(true);
          setErrPwCheckMsg("문자 와 숫자는 1개이상 포함되어야 합니다.");
          return;
        } else if (updateUserInfo.updatePw !== getItem) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호가 일치하지 않습니다.");
          return;
        } else {
          setPwCheckErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      case "updatePhone":
        if (nullCheck.exec(getItem) || getItem === "") {
          phoneErrInput.current.value = "";
          setPhoneErr(true);
          setErrPhoneMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (!numCheck.exec(getItem)) {
          phoneErrInput.current.value = "";
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          return;
        } else if (getItem.length < 11) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 10자리에서 11자리를 입력해주세요 ");
          return;
        } else if (getItem.length > 11) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 최대 11 자를 넘길수 없습니다.");
          return;
        } else if (!telPhoneCheck.exec(getItem)) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
          return;
        } else {
          setPhoneErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      case "updateAddressDetail":
        // setAddrErr(false);

        if (nullCheck.exec(getItem) || getItem === "") {
          AddrInput.current.value = "";
          setAddrErr(true);
          setErrAddrMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
        } else if (spcCheck.exec(getItem)) {
          AddrInput.current.value = "";
          setAddrErr(true);
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setAddrErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            zipcode: inputZipCode,
            updateAddressFirst: inputAddr,
            [getName]: getItem,
          });
        }
        break;

      case "updateEmail":
        if (nullCheck.exec(getItem) || getItem === "") {
          EmailErrInput.current.value = "";
          setEmailErr(true);
          setErrEmailMsg("공백값은 입력할수 없습니다. ");
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: "",
          });
          return;
        } else if (!emailCheck.exec(getItem)) {
          setEmailErr(true);
          setErrEmailMsg("E-mail이 올바르지 않습니다. ");
          return;
        } else {
          setEmailErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      default:
        break;
    }
  };

  const inputCheck = () => {
    const {
      updateName,
      updateBirth,
      updatePw,
      checkUpdatePw,
      updatePhone,
      updateEmail,
    } = updateUserInfo;

    if (updateName === undefined || updateName === null || nameErr === true) {
      nameInput.current.focus();
      setNameErr(true);
      setErrNameMsg("이름을 확인해 주세요. ");
    }

    if (
      updateBirth === undefined ||
      updateBirth === null ||
      updateBirth === true
    ) {
      birthErrInput.current.focus();
      setBirthErr(true);
      setErrBirthMsg("생년월일을 입력해 주세요. ");
    }

    if (updatePw === undefined || updatePw === null || updatePw === true) {
      pwInput.current.focus();
      setPwErr(true);
      setErrPwMsg("비밀번호를 입력해 주세요. ");
    }

    if (checkUpdatePw !== updatePw || pwCheckErr === true) {
      pwCheckInput.current.focus();
      setPwCheckErr(true);
      setErrPwCheckMsg("비밀번호가 일치하지 않습니다. ");
    }

    if (
      updatePhone === undefined ||
      updatePhone === null ||
      phoneErr === true
    ) {
      phoneErrInput.current.focus();
      setPhoneErr(true);
      setErrPhoneMsg("전화번호를 입력해 주세요. ");
    }

    if (
      updateEmail === undefined ||
      updateEmail === null ||
      emailErr === true
    ) {
      EmailErrInput.current.focus();
      setEmailErr(true);
      setErrEmailMsg("이메일을 확인해 주세요. ");
    }

    if (
      updateUserInfo.zipcode === "" ||
      updateUserInfo.zipcode === undefined ||
      addrErr === true
    ) {
      EmailErrInput.current.focus();
      setAddrErr(true);
      setErrAddrMsg("주소를 확인해 주세요. ");
    }
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    inputCheck();

    // await axios.post("http://localhost:5000/updateuser", { updateUserInfo });
  };

  console.log(updateUserInfo);

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />
        <div className={classes["passpw-container"]}>
          <div className={classes["passpw-wrap-title"]}>
            <h2>개인정보</h2>
          </div>
          <form action="/updateUser" method="post" onSubmit={submitUpdate}>
            <div className={classes["passpw-wrap-content"]}>
              <div className={classes["passpw-wrap-item"]}>
                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>아이디</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input type="text" name="updateId" />
                  </div>
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>이름</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type="text"
                      name="updateName"
                      ref={nameInput}
                      onChange={infoHandler}
                    />
                  </div>
                  {nameErr && (
                    <div className={classes["err-msg"]}>{errNameMsg}</div>
                  )}
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>생년월일</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type="text"
                      name="updateBirth"
                      ref={birthErrInput}
                      onChange={infoHandler}
                      placeholder="6자리 입력"
                    />
                  </div>
                  {birthErr && (
                    <div className={classes["err-msg"]}>{errBirthMsg}</div>
                  )}
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>비밀번호</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type={!showPw ? "password" : "text"}
                      name="updatePw"
                      ref={pwInput}
                      onChange={infoHandler}
                    />
                    {!showPw ? (
                      <>
                        <FaEyeSlash
                          onClick={() => setShowPw(!showPw)}
                          className={classes["passwd-show-icon"]}
                        />
                      </>
                    ) : (
                      <>
                        <FaEye
                          onClick={() => setShowPw(!showPw)}
                          className={classes["passwd-show-icon"]}
                        />
                      </>
                    )}
                  </div>
                  {pwErr && (
                    <div
                      className={`${classes["err-msg"]} ${classes["err-pw"]}`}
                    >
                      {errPwMsg}
                    </div>
                  )}
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>비밀번호 확인</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type={!showCkPw ? "password" : "text"}
                      name="checkUpdatePw"
                      ref={pwCheckInput}
                      onChange={infoHandler}
                    />
                    {!showCkPw ? (
                      <div>
                        <FaEyeSlash
                          onClick={() => setShowCkPw(!showCkPw)}
                          className={classes["passwd-show-icon"]}
                        />
                      </div>
                    ) : (
                      <>
                        <FaEye
                          onClick={() => setShowCkPw(!showCkPw)}
                          className={classes["passwd-show-icon"]}
                        />
                      </>
                    )}
                  </div>
                  {pwCheckErr && (
                    <div
                      className={`${classes["err-msg"]} ${classes["err-pw"]}`}
                    >
                      {errPwCheckMsg}
                    </div>
                  )}
                </div>
                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>전화번호</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type="text"
                      name="updatePhone"
                      ref={phoneErrInput}
                      onChange={infoHandler}
                      placeholder="-를 제외한 11~12자리"
                    />
                  </div>
                  {phoneErr && (
                    <div className={classes["err-msg"]}>{errPhoneMsg}</div>
                  )}
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div className={classes["passpw-item-title"]}>
                    <h2>이메일</h2>
                  </div>
                  <div className={classes["passpw-item-input"]}>
                    <input
                      type="text"
                      name="updateEmail"
                      ref={EmailErrInput}
                      onChange={infoHandler}
                      placeholder="example@example.com"
                    />
                  </div>
                  {emailErr && (
                    <div className={classes["err-msg"]}>{errEmailMsg}</div>
                  )}
                </div>

                <div className={classes["passpw-content-item"]}>
                  <div
                    className={`${classes["passpw-item-title"]} ${classes["addr-title"]}`}
                  >
                    <h2>주소</h2>
                    <button type="button" onClick={() => setShowAddr(true)}>
                      주소찾기
                    </button>
                    {showAddr && (
                      <AddressModal
                        onClose={handleAddrClose}
                        setInputAddr={setInputAddr}
                        setInputZipCode={setInputZipCode}
                      />
                    )}
                  </div>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-input"]}`}
                  >
                    <input
                      type="text"
                      name="zipcode"
                      onChange={infoHandler}
                      value={inputZipCode}
                    />

                    <input
                      type="text"
                      name="updateAddressFirst"
                      onChange={infoHandler}
                      value={inputAddr}
                    />
                    <input
                      type="text"
                      name="updateAddressDetail"
                      ref={AddrInput}
                      onChange={infoHandler}
                      placeholder="상세주소가 없으면 없음 이라 작성"
                    />
                  </div>
                  {addrErr && (
                    <div className={classes["err-msg"]}>{errAddrMsg}</div>
                  )}
                </div>
              </div>
            </div>

            <div className={classes["passpw-wrap-button"]}>
              <div>
                <button>수정</button>

                <button
                  type="button"
                  onClick={() => navigate(-1, { replace: true })}
                >
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
