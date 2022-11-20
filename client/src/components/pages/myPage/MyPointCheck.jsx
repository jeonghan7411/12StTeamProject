import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyPageListForm from "./MyPageListForm";
import MyPageListTitle from "./MyPageListTitle";
import MyPageNullMsg from "./MyPageNullMsg";

import classes from "./MyPointCheck.module.css";

import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";
import Pagination from "./Pagination";

const MyPointCheck = () => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [pointList, setPointList] = useState([]);

  const [user, setUser] = useState({});

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const mile = parseInt(user.uMile);
  const pointCheck = true;

  useEffect(() => {
    // const fetchData = async () => {
    //   await axios
    //     .get("http://localhost:5000/mypage", { withCredentials: true })
    //     .then((response) => {
    //       if (response.data.status === 401) {
    //         alert(response.data.message);
    //         navigate("/login", { replace: true });
    //       } else if (response.data.status === 200) {
    //         getUser(setUser);
    //       }
    //     });
    // };
    // fetchData();
    authCheck();
    getUser(setUser);

    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/pointlist", {
          withCredentials: true,
        })
        .then((response) => {
          setPointList(response.data.data);
        });
    };
    fetchData();
  }, []);

  const searchDate = (e) => {
    e.preventDefault();
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
        <div className={classes["select-wrap"]}>
          <label>표시할 게시물</label>
          <select
            // type={Number}
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="1">1개씩 보기</option>
            <option value="3">3개씩 보기</option>
            <option value="5">5개씩 보기</option>
            <option value="10">10개씩 보기</option>
          </select>
        </div>
        {pointList.length === 0 && (
          <MyPageNullMsg
            className={classes["pointcheck-content-null"]}
            text={"적립 내역이 없습니다."}
          />
        )}
        {pointList.slice(offset, offset + limit).map((item, key) => {
          return (
            <MyPageListForm
              props={item}
              title={"내역"}
              key={key}
              pointCheck={pointCheck}
            />
          );
        })}
        {pointList.length != 0 && (
          <div className={classes["page-wrap"]}>
            <Pagination
              total={pointList.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPointCheck;
