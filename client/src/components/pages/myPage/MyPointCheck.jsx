import React, { useState } from "react";
import MyPageListForm from "./MyPageListForm";
import MyPageListTitle from "./MyPageListTitle";

import classes from "./MyPointCheck.module.css";

const MyPointCheck = () => {
  const [myPoint, setMyPoint] = useState(333333);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isShowList, setIsShowList] = useState(false);

  const searchDate = (e) => {
    e.preventDefault();
    console.log(startDate);
    console.log(endDate);
  };
  return (
    <React.Fragment>
      <div className={classes.MyPointCheck}>
        <MyPageListTitle text={"포인트 내역 확인"} />

        <div className={classes["check-content-wrap"]}>
          <div className={classes["check-content-item"]}>
            <div>나의 포인트</div>
            <div>
              <span>{myPoint.toLocaleString("ko-KR")}</span>원
            </div>
          </div>
          <div className={classes["check-content-item"]}>
            <div>나의 쿠폰</div>
            <div>
              <span>12</span>장
            </div>
          </div>
        </div>
        <div className={classes["point-check-date"]}>
          <MyPageListTitle text={"적립 및 사용내역 보기"} />
          <form onSubmit={searchDate}>
            <div className={classes["check-wrap-date"]}>
              <div className={classes["check-date-item"]}>
                <div>시작일 :</div>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes["check-date-item"]}>
                <div>종료일 :</div>
                <div>
                  <input
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className={classes["check-date-button"]}>
                <button type="submit">검색</button>
              </div>
            </div>
          </form>
        </div>

        <MyPageListForm />
      </div>
    </React.Fragment>
  );
};

export default MyPointCheck;
