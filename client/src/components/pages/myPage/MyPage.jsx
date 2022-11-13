import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import MyPageSide from "./MyPageSide";

import Profile from "../../../assets/profile.jpg";

import { FaCog } from "react-icons/fa";
import classes from "./MyPage.module.css";

import axios from "axios";

import { getUser } from "../../../util/getUser";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

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
              <NavLink to="/cart">0</NavLink>
            </div>
            <div>장바구니</div>
          </div>
          <div className={classes["mypage-quick-item"]}>
            <div>
              <NavLink to="mypointcheck">{user.uMile}</NavLink>
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
