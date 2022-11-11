import React from "react";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import AddressModal from "../../layout/AddressModal";

const MyPagePassPw = () => {
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
  // const [addrErr, setAddrErr] = useState(false);
  const [emailErr, setEmailErr] = useState(false);

  //에러메세지
  const [errNameMsg, setErrNameMsg] = useState("");
  const [errPwMsg, setErrPwMsg] = useState("");
  const [errPwCheckMsg, setErrPwCheckMsg] = useState("");
  const [errPhoneMsg, setErrPhoneMsg] = useState("");
  // const [errAddrMsg, setErrAddrMsg] = useState("");
  const [errEmailMsg, setErrEmailMsg] = useState("");

  const nameInput = useRef();
  const pwInput = useRef();
  const pwCheckInput = useRef();
  const phoneErrInput = useRef();
  // const AddrInput = useRef();
  const EmailErrInput = useRef();

  const infoHandler = (e) => {
    const getName = e.target.name;
    const getItem = e.target.value;

    const nullCheck = /\s/; //공백체크
    const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
    const pwCheck = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const numCheck = /[0-9]/g;
    const spcCheck = /[!@#]/;
    const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    switch (getName) {
      case "updateName":
        if (nullCheck.exec(getItem) || getItem === "") {
          nameInput.current.value = "";
          setNameErr(true);
          setErrNameMsg("공백값은 입력할수 없습니다. ");
        } else if (getItem.length < 2) {
          setNameErr(true);
          setErrNameMsg("이름은 최소 2글자 이상 입력해주세요. ");
        } else if (getItem.length > 5) {
          setNameErr(true);
          setErrNameMsg("이름은 최대 5글자를 넘길수 없습니다.");
        } else if (!nameCheck.exec(getItem)) {
          setNameErr(true);
          setErrNameMsg("올바른 이름의 형식이 아닙니다.");
        } else if (nameCheck.exec(getItem)) {
          setNameErr(false);
          setUpdateUserInfo({
            ...updateUserInfo,
            [getName]: getItem,
          });
        }
        break;

      case "updatePw":
        if (nullCheck.exec(getItem) || getItem === "") {
          pwInput.current.value = "";
          setPwErr(true);
          setErrPwMsg("공백값은 입력할수 없습니다. ");
        } else if (getItem.length < 8) {
          setPwErr(true);
          setErrPwMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
        } else if (getItem.length > 15) {
          setPwErr(true);
          setErrPwMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
        } else if (!spcCheck.exec(getItem)) {
          setPwErr(true);
          setErrPwMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
        } else if (!pwCheck.exec(getItem) || !numCheck.exec(getItem)) {
          setPwErr(true);
          setErrPwMsg("문자 와 숫자는 1개이상 포함되어야 합니다.");
        } else if (phoneCheck.exec(getItem)) {
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
        } else if (getItem.length < 8) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
        } else if (getItem.length > 15) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
        } else if (!spcCheck.exec(getItem)) {
          setPwCheckErr(true);
          setErrPwCheckMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
        } else if (!pwCheck.exec(getItem) || !numCheck.exec(getItem)) {
          setPwCheckErr(true);
          setErrPwCheckMsg("문자 와 숫자는 1개이상 포함되어야 합니다.");
        } else if (updateUserInfo.updatePw != getItem) {
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호가 일치하지 않습니다.");
        } else {
          setPwCheckErr(false);
        }
        break;

      case "updatePhone":
        if (nullCheck.exec(getItem) || getItem === "") {
          phoneErrInput.current.value = "";
          setPhoneErr(true);
          setErrPhoneMsg("공백값은 입력할수 없습니다. ");
        } else if (!numCheck.exec(getItem)) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          phoneErrInput.current.value = "";
        } else if (getItem.length < 11) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 11자리에서 12자리를 입력해주세요 ");
        } else if (getItem.length > 11) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 최대 11 자를 넘길수 없습니다.");
        } else if (!telPhoneCheck.exec(getItem)) {
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
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
        setUpdateUserInfo({
          ...updateUserInfo,
          [getName]: getItem,
        });
        break;

      case "updateEmail":
        if (nullCheck.exec(getItem) || getItem === "") {
          EmailErrInput.current.value = "";
          setEmailErr(true);
          setErrEmailMsg("공백값은 입력할수 없습니다. ");
        } else if (!emailCheck.exec(getItem)) {
          setEmailErr(true);
          setErrEmailMsg("E-mail이 올바르지 않습니다. ");
        } else {
          setEmailErr(false);
        }
        break;

      default:
        break;
    }
  };

  console.log(updateUserInfo);
  const submitUpdate = async (e) => {
    e.preventDefault();

    // if (updateUserInfo.updateAddressDetail === undefined) {
    //   alert("test");
    // }
    //빈값일때 alert 로 경고창 띄우기
    // await axios.post("http://localhost:5000/updateuser");
  };

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />

        <form action="/updateUser" method="post" onSubmit={submitUpdate}>
          <div className={classes["passpw-wrap-content"]}>
            <div className={classes["passpw-wrap-title"]}>
              <h2>개인정보</h2>
            </div>
            <div className={classes["passpw-wrap-item"]}>
              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>아이디</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input type="text" />
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
                {nameErr && <div>{errNameMsg}</div>}
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
                {pwErr && <div>{errPwMsg}</div>}
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
                {pwCheckErr && <div>{errPwCheckMsg}</div>}
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
                {phoneErr && <div>{errPhoneMsg}</div>}
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
                    // ref={AddrInput}
                    onChange={infoHandler}
                    placeholder="상세주소"
                  />
                </div>
                {/* {addrErr && <div>{errAddrMsg}</div>} */}
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
                {emailErr && <div>{errEmailMsg}</div>}
              </div>
            </div>
          </div>

          <div className={classes["passpw-wrap-button"]}>
            <div>
              <button>수정</button>

              <button type="button">취소</button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
