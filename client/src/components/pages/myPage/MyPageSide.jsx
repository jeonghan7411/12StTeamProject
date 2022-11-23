import React from "react";
import MyPageSideLink from "./MyPageSideLink";

import classes from "./MyPageSide.module.css";

const MyPageSide = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageSide}>
        <div className={classes["side-item"]}>
          <h2>MY 쇼핑</h2>
          <div>
            <MyPageSideLink to="/mypage" text={"주문목록"} first={true} />
          </div>

          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 혜택</h2>

          <div>
            <MyPageSideLink to="mypointcheck" text={"포인트확인"} />
          </div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 활동</h2>
          <div>
            <MyPageSideLink to="reviewlist" text={"리뷰내역"} />
          </div>

          <div>
            <MyPageSideLink to="mypageinquirylist" text={"문의내역"} />
          </div>
          <div>
            <MyPageSideLink to="/cart" text={"장바구니"} />
          </div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 정보</h2>
          <div>
            <MyPageSideLink to="/updateuser" text={"개인정보 확인/수정"} />
          </div>
          <div>
            <MyPageSideLink to="mypageaddress" text={"배송지 관리"} />
          </div>
          <div>
            <MyPageSideLink to="deleteuser" text={"회원탈퇴"} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MyPageSide;
