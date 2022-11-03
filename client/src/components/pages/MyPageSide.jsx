import React from "react";
import classes from "./MyPageSide.module.css";

const MyPageSide = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageSide}>
        <div className={classes["side-item"]}>
          <h2>MY 쇼핑</h2>
          <div>주문목록/배송조회</div>
          <div>취소/반품/교환/환불 내역</div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 혜택</h2>
          <div>할인쿠폰</div>
          <div>캐시확인</div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 활동</h2>
          <div>문의하기</div>
          <div>문의내역</div>
          <div>리뷰관리</div>
          <div>짐 리스트</div>
          <hr />
        </div>

        <div className={classes["side-item"]}>
          <h2>MY 정보</h2>
          <div>개인정보 확인/수정</div>
          <div>배송지 관리</div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default MyPageSide;
