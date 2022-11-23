import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";

import axios from "axios";

import AddressModal from "../../layout/AddressModal";

const MyPagePassPw = ({ user, setUserPw }) => {
  const navigate = useNavigate();
  //modal
  const [showAddr, setShowAddr] = useState(false);

  const handleAddrClose = () => {
    setShowAddr(false);
  };

  //유저 정보
  const [uName, setUname] = useState(user.uName);
  const [uPasswd, setUpasswd] = useState(user.uPasswd);
  const [CheckPasswd, setCheckPasswd] = useState("");
  const [uPhone, setUphone] = useState(user.uPhone);
  const [uEmail, setUemail] = useState(user.uEmail);
  const [uBirth, setUbirth] = useState(user.uBirth);
  const [uZipcode, setUzipcode] = useState(user.uZipcode);
  const [uAddress, setUaddress] = useState(user.uAddress);
  const [uAdditionalAddr, setUadditionalAddr] = useState(user.uAdditionalAddr);

  const updateUname = useRef();
  const updateUbirth = useRef();
  const updateUpasswd = useRef();
  const updateUpasswdCheck = useRef();
  const updateUphone = useRef();
  const updateUemail = useRef();
  const updateZipcode = useRef();
  const updateAddrCode = useRef();
  const updateUdetail = useRef();

  //주소 업데이트
  const [updateAddr, setUpdateAddr] = useState(false);

  // 주소 값 받아오기
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");

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

  //주소 모달에서 값 받아오기
  const getAddrInfo = () => {
    if (inputZipCode === "") {
      updateZipcode.current.value = uZipcode;
    } else {
      updateZipcode.current.value = inputZipCode;
      setUzipcode(inputZipCode);
    }
    if (inputAddr === "") {
      updateAddrCode.current.value = uAddress;
    } else {
      updateAddrCode.current.value = inputAddr;
      setUaddress(inputAddr);
      updateUdetail.current.value = "";
      setUadditionalAddr("");
    }
  };

  //주소 받아온 값 변경 될 떄마다 표시
  useEffect(() => {
    if (updateAddr === true) {
      getAddrInfo();
    }
  }, [inputZipCode]);

  //수정 유효성 검사

  const inputCheck = (e) => {
    const nullMsg = "공백값은 입력할수 없습니다. ";
    const newInfoName = e.target.name;
    const newInfo = e.target.value;

    const nullCheck = /\s/; //공백체크
    const nameCheck = /^[가-힝a-zA-Z]{2,}$/;
    const pwCheck = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    const numCheck = /[0-9]/g;
    const spcCheck = /[!@#]/;
    // const phoneCheck = /^\d{3}\d{3,4}\d{4}$/;
    const telPhoneCheck = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    switch (newInfoName) {
      case "uName":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setUname("");
          setNameErr(true);
          setErrNameMsg(nullMsg);
          updateUname.current.value = "";
          return;
        } else if (newInfo.length < 2) {
          setUname("");
          setNameErr(true);
          setErrNameMsg("이름은 최소 2글자 이상 입력해주세요.");
          return;
        } else if (newInfo.length > 5) {
          setUname("");
          setNameErr(true);
          setErrNameMsg("이름은 최대 5글자를 넘길수 없습니다.");
          return;
        } else if (!nameCheck.exec(newInfo)) {
          setUname("");
          setNameErr(true);
          setErrNameMsg("올바른 이름의 형식이 아닙니다.");
          return;
        } else if (nameCheck.exec(newInfo)) {
          setNameErr(false);
          setUname(newInfo);
        }
        break;

      case "uBirth":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setUbirth("");
          setBirthErr(true);
          setErrBirthMsg(nullMsg);
          updateUbirth.current.value = "";
          return;
        } else if (!numCheck.exec(newInfo)) {
          setUbirth("");
          setBirthErr(true);
          setErrBirthMsg("생년월일은 숫자만 입력 가능합니다.");
          updateUbirth.current.value = "";
          return;
        } else if (newInfo.length != 8) {
          setUbirth("");
          setBirthErr(true);
          setErrBirthMsg("생년월일은 8자리를 입력해 주세요.");
          return;
        } else {
          setBirthErr(false);
          setUbirth(newInfo);
        }
        break;

      case "uPasswd":
        // if (nullCheck.exec(newInfo) || newInfo === "" || newInfo === null) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg(nullMsg);
        //   updateUpasswd.current.value = "";
        //   return;
        // } else if (!pwCheck.exec(newInfo)) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg("문자는 1개이상 포함되어야 합니다.");
        //   return;
        // } else if (!numCheck.exec(newInfo)) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg("숫자는 1개이상 포함되어야 합니다.");
        //   return;
        // } else if (!spcCheck.exec(newInfo)) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg(
        //     "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
        //   );
        //   return;
        // } else if (newInfo.length <= 7) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
        //   return;
        // } else if (newInfo.length > 15) {
        //   setUpasswd("");
        //   setPwErr(true);
        //   setErrPwMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
        //   return;
        // } else if (pwCheck.exec(newInfo)) {
        //   setPwErr(false);
        //   setUpasswd(newInfo);
        //   setErrPwMsg("");
        // }

        if (nullCheck.exec(newInfo) || newInfo === "" || newInfo === null) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg(nullMsg);
          updateUpasswd.current.value = "";
          return;
        } else if (!pwCheck.exec(newInfo)) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg("문자는 1개이상 포함되어야 합니다.");
          return;
        } else if (!numCheck.exec(newInfo)) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg("숫자는 1개이상 포함되어야 합니다.");
          return;
        } else if (!spcCheck.exec(newInfo)) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
          return;
        } else if (newInfo.length < 8) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
          return;
        } else if (newInfo.length > 15) {
          setUpasswd("");
          setPwErr(true);
          setErrPwMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
          return;
        } else {
          setPwErr(false);
          setUpasswd(newInfo);
          setErrPwMsg("");
        }

        break;

      case "CheckPasswd":
        if (nullCheck.exec(newInfo) || newInfo === "" || newInfo === null) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwMsg(nullMsg);
          updateUpasswdCheck.current.value = "";
          return;
        } else if (newInfo.length < 8) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwMsg("비밀번호는 최소 8글자 이상 입력해주세요. ");
          return;
        } else if (newInfo.length > 15) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwMsg("비밀번호는 최대 15 자를 넘길수 없습니다.");
          return;
        } else if (!spcCheck.exec(newInfo)) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwMsg(
            "! @ # 중 하나를 포함 해야하며 이외 특수문자는 사용이 불가합니다."
          );
          return;
        } else if (!pwCheck.exec(newInfo) || !numCheck.exec(newInfo)) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwMsg("문자 와 숫자는 1개이상 포함되어야 합니다.");
          return;
        } else if (uPasswd !== newInfo) {
          setCheckPasswd("");
          setPwCheckErr(true);
          setErrPwCheckMsg("비밀번호가 일치하지 않습니다.");
        } else {
          setPwCheckErr(false);
          setCheckPasswd(newInfo);
          setErrPwCheckMsg("");
        }
        break;

      case "uPhone":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg(nullMsg);
          updateUphone.current.value = "";
          return;
        } else if (!numCheck.exec(newInfo)) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 숫자만 입력 가능합니다.");
          updateUphone.current.value = "";
          return;
        } else if (newInfo.length < 11) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 10자리에서 11자리를 입력해주세요 ");
          return;
        } else if (newInfo.length > 11) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호는 최대 11자리를 넘길수 없습니다. ");
          return;
        } else if (!telPhoneCheck.exec(newInfo)) {
          setUphone("");
          setPhoneErr(true);
          setErrPhoneMsg("휴대폰번호 앞자리를 확인해주세요.");
          return;
        } else {
          setPhoneErr(false);
          setUphone(newInfo);
        }
        break;

      case "uEmail":
        if (nullCheck.exec(newInfo) || newInfo === "") {
          setUemail("");
          setEmailErr(true);
          setErrEmailMsg(nullMsg);

          updateUemail.current.value = "";
          return;
        } else if (!emailCheck.exec(newInfo)) {
          setUemail("");
          setEmailErr(true);
          setErrEmailMsg("E-mail이 올바르지 않습니다. ");
          return;
        } else {
          setEmailErr(false);
          setUemail(newInfo);
        }
        break;

      case "uDetail":
        if (spcCheck.exec(newInfo)) {
          updateUdetail.current.value = "";
          setUadditionalAddr("");
          setAddrErr(true);
          setErrAddrMsg("특수 문자를 제외한 정보만 입력해주세요");
          return;
        } else {
          setAddrErr(false);
          setUadditionalAddr(newInfo);
        }

        // if (nullCheck.exec(newInfo)) {
        //   setUadditionalAddr("");
        //   setAddrErr(true);
        //   setErrAddrMsg(nullMsg);
        //   updateUdetail.current.value = "";
        // } else
        break;

      default:
        break;
    }
  };

  //마지막 유효성 검사

  const submitUpdate = async (e) => {
    e.preventDefault();

    if (
      nameErr === true ||
      birthErr === true ||
      emailErr === true ||
      phoneErr === true
    ) {
      alert("수정 정보를 확인해주세요");
    } else if (uPasswd.length > 16) {
      alert("비밀번호를 입력해주세요.");
    } else if (CheckPasswd === "" || CheckPasswd != uPasswd) {
      updateUpasswdCheck.current.focus();
      alert("비밀번호가 같지않습니다. ");
    } else {
      updateUserHandle();
    }
  };

  //수정 통신
  const updateUserHandle = async () => {
    const idx = user.idx;
    await axios
      .post("http://localhost:5000/mypage/api/updateuser", {
        idx,
        uName,
        uPasswd,
        uPhone,
        uEmail,
        uBirth,
        uZipcode,
        uAddress,
        uAdditionalAddr,
      })
      .then((response) => {
        if (response.data.status === 200) {
          alert(response.data.message);
          navigate("/mypage", { replace: true });
        }
      });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />
        <form action="/updateUser" method="post" onSubmit={submitUpdate}>
          <table>
            <thead>
              <tr>
                <td>
                  <h2>이름</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        ref={updateUname}
                        defaultValue={uName}
                        name="uName"
                        maxLength={5}
                        minLength={2}
                        onChange={inputCheck}
                      />
                    </div>
                    {nameErr && (
                      <div className={classes["err-msg"]}>{errNameMsg}</div>
                    )}
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <h2>아이디</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        name="updateId"
                        defaultValue={user.uId}
                        className={classes["id-input"]}
                        readOnly
                      />
                      <input
                        type="hidden"
                        name="userIdx"
                        defaultValue={user.idx}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>비밀번호</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type={!showPw ? "password" : "text"}
                        ref={updateUpasswd}
                        name="uPasswd"
                        maxLength={15}
                        minLength={8}
                        onChange={inputCheck}
                      />
                      {!showPw ? (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEyeSlash onClick={() => setShowPw(!showPw)} />
                        </div>
                      ) : (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEye onClick={() => setShowPw(!showPw)} />
                        </div>
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
                </td>
              </tr>
              <tr>
                <td>
                  <h2>비밀번호 확인</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type={!showCkPw ? "password" : "text"}
                        ref={updateUpasswdCheck}
                        name="CheckPasswd"
                        maxLength={15}
                        minLength={8}
                        onChange={inputCheck}
                      />
                      {!showCkPw ? (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEyeSlash onClick={() => setShowCkPw(!showCkPw)} />
                        </div>
                      ) : (
                        <div className={classes["passwd-show-icon"]}>
                          <FaEye onClick={() => setShowCkPw(!showCkPw)} />
                        </div>
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
                </td>
              </tr>
              <tr>
                <td>
                  <h2>생년월일</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        ref={updateUbirth}
                        maxLength={8}
                        minLength={8}
                        defaultValue={uBirth}
                        name="uBirth"
                        onChange={inputCheck}
                      />
                    </div>
                    {birthErr && (
                      <div className={classes["err-msg"]}>{errBirthMsg}</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>전화번호</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        ref={updateUphone}
                        name="uPhone"
                        maxLength={11}
                        minLength={10}
                        defaultValue={uPhone}
                        onChange={inputCheck}
                      />
                    </div>
                    {phoneErr && (
                      <div className={classes["err-msg"]}>{errPhoneMsg}</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>이메일</h2>
                </td>
                <td>
                  <div className={classes["passpw-item-input"]}>
                    <div>
                      <input
                        type="text"
                        ref={updateUemail}
                        name="uEmail"
                        // ref={EmailErrInput}
                        defaultValue={uEmail}
                        onChange={inputCheck}
                      />
                    </div>
                    {emailErr && (
                      <div className={classes["err-msg"]}>{errEmailMsg}</div>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <h2>주소</h2>
                </td>
                <td>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-zipcode-input"]}`}
                  >
                    <div>
                      <input
                        type="text"
                        ref={updateZipcode}
                        defaultValue={uZipcode}
                        readOnly
                      />
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddr(true);
                          setUpdateAddr(true);
                        }}
                      >
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
                  </div>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-addr-input"]}`}
                  >
                    <div>
                      <input
                        type="text"
                        ref={updateAddrCode}
                        defaultValue={uAddress}
                        readOnly
                      />
                    </div>
                  </div>
                  <div
                    className={`${classes["passpw-item-input"]} ${classes["addr-detail-input"]}`}
                  >
                    <div>
                      <input
                        type="text"
                        name="uDetail"
                        ref={updateUdetail}
                        defaultValue={uAdditionalAddr}
                        onChange={inputCheck}
                      />
                    </div>
                    {addrErr && (
                      <div className={classes["err-msg"]}>{errAddrMsg}</div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={classes["passpw-wrap-button"]}>
            <div>
              <button className={classes["left-button"]}>수정</button>

              <button
                type="button"
                className={classes["right-button"]}
                onClick={() => setUserPw(false)}
              >
                취소
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
