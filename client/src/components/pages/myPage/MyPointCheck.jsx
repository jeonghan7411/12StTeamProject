import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyPageListForm from "./MyPageListForm";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import classes from "./MyPointCheck.module.css";

import { getUser } from "../../../util/getUser";

const MyPointCheck = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isShowList, setIsShowList] = useState(false);

  const [pointList, setPointList] = useState([
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
  ]);

  const [checkInputPw, setCheckInputPw] = useState();

  const [user, setUser] = useState({});

  const mile = parseInt(user.uMile);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage", { withCredentials: true })
        .then((response) => {
          if (response.data.status === 401) {
            alert(response.data.message);
            navigate("/login", { replace: true });
          } else if (response.data.status === 200) {
            getUser(setUser);
          }
        });
    };
    fetchData();
  }, []);

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
              <span>{mile === "NaN" ? 0 : mile.toLocaleString("ko-kr")}</span>원
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
        {pointList.length === 0 && (
          <MyPageNullMsg
            className={classes["pointcheck-content-null"]}
            text={"적립 내역이 없습니다."}
          />
        )}

        {pointList.map((item, key) => {
          return <MyPageListForm props={item} title={"내역"} key={key} />;
        })}
      </div>
    </React.Fragment>
  );
};

export default MyPointCheck;
