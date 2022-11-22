import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import Profile from "../../../assets/profile.jpg";

import MyPageSide from "./MyPageSide";

import { FaCog } from "react-icons/fa";
import { getUser } from "../../../util/getUser";
import { authCheck } from "../../../util/authCheck";
import classes from "./MyPage.module.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const mile = parseInt(user.uMile);
  const [basketCount, setBasketCount] = useState("");
  const [boardData, setBoardData] = useState([]);
  // const [c, setReviewCount] = useState([]);
  // const [inquiryCount, setInquiryCount] = useState([]);

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  useEffect(() => {
    const basketData = async () => {
      await axios
        .get("http://localhost:5000/mypage/api/getbasket", {
          withCredentials: true,
        })
        .then((response) => {
          setBasketCount(response.data.count[0]);
          setBoardData(response.data.result[1]);
        });
    };

    basketData();
  }, []);

  const reviewCount = boardData.filter((it) => {
    return it.bBoardtype === "리뷰";
  });
  const inquiryCount = boardData.filter((it) => {
    return (
      it.bBoardtype === "상품문의" ||
      it.bBoardtype === "배송문의" ||
      it.bBoardtype === "교환/환불문의" ||
      it.bBoardtype === "반품" ||
      it.bBoardtype === "취소" ||
      it.bBoardtype === "환불" ||
      it.bBoardtype === "교환"
    );
  });

  return (
    <React.Fragment>
      <div className={classes.MyPage}>
        <div className={classes["mypage-wrap-title"]}>
          <div className={classes["mypage-title-left"]}>
            <div className={classes["mypage-wrap-profile"]}>
              <img src={Profile} alt="" />
            </div>
            <div>
              안녕하세요 <span>{user.uName}</span>님.
            </div>
          </div>
          <div className={classes["mypage-title-right"]}>
            <div>
              <Link to="/updateuser">
                <FaCog className={classes["mypage-title-icon"]} />
              </Link>
            </div>
            <div>개인정보수정</div>
          </div>
        </div>

        <div className={classes["mypage-quick-btn"]}>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="">{inquiryCount.length}</NavLink>
            </div>
            <div>문의/교환 환불 내역 </div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="reviewlist">{reviewCount.length}</NavLink>
            </div>
            <div>상품평</div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="/cart">{Object.values(basketCount)}</NavLink>
            </div>
            <div>장바구니</div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="mypointcheck">
                {mile === "NaN" ? 0 : mile.toLocaleString("ko-kr")}
              </NavLink>
            </div>
            <div>나의 포인트</div>
          </div>
        </div>
      </div>
      <div className={classes["mypage-wrap-bottom"]}>
        <MyPageSide />
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default MyPage;
