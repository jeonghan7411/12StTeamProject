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
  const [count, setCount] = useState("");

  useEffect(() => {
    authCheck();
    getUser(setUser);

    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/mypage/getbasket", {
          withCredentials: true,
        })
        .then((response) => {
          setCount(response.data.count[0]);
        });
    };

    fetchData();
  }, []);

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
              <a href="adminindex">dd</a>
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
              <NavLink to="">0</NavLink>
            </div>
            <div>배송중</div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="">0</NavLink>
            </div>
            <div>상품평</div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="/cart">{Object.values(count)}</NavLink>
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
