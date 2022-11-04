import React from "react";
import { Link } from "react-router-dom";
import classes from "./MyPageSide.module.css";

const MyPageSide = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageSide}>
        <div className={classes["side-item"]}>
          <h2>MY 쇼핑</h2>
          <div>
            <Link to="/mypage">주문목록</Link>
          </div>
          <div>
            <Link to="cancel-return-exchange">취소/반품/교환/환불 내역</Link>
          </div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 혜택</h2>
          <div>
            <Link>할인쿠폰</Link>
          </div>
          <div>
            <Link>포인트확인</Link>
          </div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 활동</h2>
          <div>
            <Link>문의하기</Link>
          </div>
          <div>
            <Link>문의내역</Link>
          </div>
          <div>
            <Link>리뷰관리</Link>
          </div>
          <div>
            <Link>찜 리스트</Link>
          </div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 정보</h2>
          <div>
            <Link>개인정보 확인/수정</Link>
          </div>
          <div>
            <Link>배송지 관리</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MyPageSide;
