import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import MyPageSide from "./MyPageSide";

import Profile from "../../../assets/profile.jpg";

import { FaCog } from "react-icons/fa";
import classes from "./MyPage.module.css";

import axios from "axios";

const MyPage = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (userToken === null) {
  //     navigate("/login");
  //   }

  // const fetchData = async () => {
  //   await axios
  //     .get("http://localhost:5000/mypage", { userToken })
  //     .then((response) => {
  //       setUserData(response.data.result);
  //     });
  // };

  // fetchData();
  // });

  return (
    <React.Fragment>
      <div className={classes.MyPage}>
        <div className={classes["mypage-wrap-title"]}>
          <div className={classes["mypage-title-left"]}>
            <div className={classes["mypage-wrap-profile"]}>
              <img src={Profile} alt="" />
            </div>
            <div>
              안녕하세요 <span></span>님.
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
        <div className={classes["mypage-wrap-content"]}>
          <div className={classes["mypage-quick-btn"]}>
            <div className={classes["mypage-quick-item"]}>
              <div>0</div>
              <div>배송중</div>
            </div>
            <div className={classes["mypage-quick-item"]}>
              <div>0</div>
              <div>상품평</div>
            </div>
            <div className={classes["mypage-quick-item"]}>
              <div>0</div>
              <div>찜 리스트</div>
            </div>
            <div className={classes["mypage-quick-item"]}>
              <div>0</div>
              <div>최근본상품</div>
            </div>
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
