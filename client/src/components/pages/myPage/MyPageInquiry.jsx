import React from "react";
import MyPageListTitle from "./MyPageListTitle";

import classes from "./MyPageInquiry.module.css";
const MyPageInquiry = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageInquiry}>
        <MyPageListTitle text={"문의하기"} />

        <form action="">
          <div className={classes["inquiry-wrap-content"]}>
            <div className={classes["inquiry-content-label"]}>
              <div>제목</div>
              <div>
                <input type="text" />
              </div>
            </div>
            <div className={classes["inquiry-content-label"]}>
              <div>유형</div>
              <div>
                <select>
                  <option>유형선택</option>
                  <option value="">상품문의</option>
                  <option value="">배송문의</option>
                  <option value="">교환/환불문의</option>
                </select>
              </div>
            </div>
            <div className={classes["inquiry-content-label"]}>
              <div>내용</div>
              <div>
                <textarea></textarea>
              </div>
            </div>
          </div>
          <div className={classes["inquiry-content-button"]}>
            <button>작성하기</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiry;
