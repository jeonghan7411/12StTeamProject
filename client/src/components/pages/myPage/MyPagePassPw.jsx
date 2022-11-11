import React from "react";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";
import { useState } from "react";
import axios from "axios";
import AddressModal from "../../layout/AddressModal";

const MyPagePassPw = () => {
  const [showAddr, setShowAddr] = useState(false);
  const [inputZipCode, setInputZipCode] = useState("");
  const [inputAddr, setInputAddr] = useState("");
  const [updateUserInfo, setUpdateUserInfo] = useState({
    uName: "",
    uPasswd: "",
    uEamil: "",
    uPhone: "",
    uAdress: "",
  });
  const [checkPw, setCheckPw] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCkPw, setShowCkPw] = useState(false);

  const [passName, setPassName] = useState(false);
  const infoHandler = (e) => {
    // setUpdateUserInfo({
    //   ...updateUserInfo,
    //   [e.target.name]: e.target.value,
    // });
  };

  const checkNameHandler = (e) => {
    const name = e.target.value;
    console.log(name.length);
    if (name.length <= 1) {
      setPassName(false);
    }
    passName(true);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/updateuser", { updateUserInfo });
  };

  const isShow = () => {
    setShowAddr(true);
  };

  const onClose = () => {
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
                    onChange={checkNameHandler}
                    // onChange={infoHandler}
                  />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>비밀번호</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input
                    type={!showPw ? "password" : "text"}
                    name="updatePw"
                    onChange={infoHandler}
                  />
                  {!showPw ? (
                    <>
                      <FaEyeSlash
                        onClick={(e) => setShowPw(!showPw)}
                        className={classes["passwd-show-icon"]}
                      />
                    </>
                  ) : (
                    <>
                      <FaEye
                        onClick={(e) => setShowPw(!showPw)}
                        className={classes["passwd-show-icon"]}
                      />
                    </>
                  )}
                </div>
                {checkPw ? <div>err</div> : ""}
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>비밀번호 확인</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input
                    type={!showCkPw ? "password" : "text"}
                    name="checkUpdatePw"
                  />
                  {!showCkPw ? (
                    <div>
                      <FaEyeSlash
                        onClick={(e) => setShowCkPw(!showCkPw)}
                        className={classes["passwd-show-icon"]}
                      />
                    </div>
                  ) : (
                    <>
                      <FaEye
                        onClick={(e) => setShowCkPw(!showCkPw)}
                        className={classes["passwd-show-icon"]}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>전화번호</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input
                    type="text"
                    name="updatePhone"
                    onChange={infoHandler}
                  />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div
                  className={`${classes["passpw-item-title"]} ${classes["addr-title"]}`}
                >
                  <h2>주소</h2>
                  <button onClick={isShow}>주소찾기</button>
                  {showAddr && (
                    <AddressModal
                      onClose={onClose}
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
                    name="updateAddressSecond"
                    onChange={infoHandler}
                  />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>이메일</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input
                    type="text"
                    name="updateEmail"
                    onChange={infoHandler}
                  />
                </div>
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
