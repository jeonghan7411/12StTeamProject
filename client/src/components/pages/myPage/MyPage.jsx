import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaCog } from "react-icons/fa";
import MyPageSide from "./MyPageSide";
import Profile from "../../../assets/profile.jpg";
import classes from "./MyPage.module.css";
const MyPage = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPage}>
        <div className={classes["mypage-wrap-title"]}>
          <div className={classes["mypage-title-left"]}>
            <div className={classes["mypage-wrap-profile"]}>
              <img src={Profile} alt="" />
            </div>
            <div>
              안녕하세요 <span>홍길동</span>님.
            </div>
            <div>등급</div>
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
