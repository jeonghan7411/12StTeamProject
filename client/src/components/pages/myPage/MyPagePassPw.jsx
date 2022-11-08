import React from "react";
import RegistSection from "../regist/RegistSection";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import classes from "./MyPagePassPw.module.css";
import { useState } from "react";

const MyPagePassPw = () => {
  const [showPw, setShowPw] = useState(false);
  const [showCkPw, setShowCkPw] = useState(false);

  return (
    <React.Fragment>
      <div className={classes.MyPagePassPw}>
        <RegistSection title={"회원정보 수정"} />

        <form action="">
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
                  <input type="text" readOnly />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>비밀번호</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input type={!showPw ? "password" : "text"} />
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
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>비밀번호 확인</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input type={!showCkPw ? "password" : "text"} />
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
                  <input type="text" />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div
                  className={`${classes["passpw-item-title"]} ${classes["addr-title"]}`}
                >
                  <h2>주소</h2>
                  <button>주소찾기</button>
                </div>
                <div
                  className={`${classes["passpw-item-input"]} ${classes["addr-input"]}`}
                >
                  <input type="text" />
                  <input type="text" />
                </div>
              </div>

              <div className={classes["passpw-content-item"]}>
                <div className={classes["passpw-item-title"]}>
                  <h2>이메일</h2>
                </div>
                <div className={classes["passpw-item-input"]}>
                  <input type="text" />
                </div>
              </div>
            </div>
          </div>

          <div className={classes["passpw-wrap-button"]}>
            <div>
              <button>수정</button>

              <button>취소</button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPagePassPw;
