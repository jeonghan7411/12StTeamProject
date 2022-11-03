import React from "react";
import { FaCog } from "react-icons/fa";
import classes from "./MyPage.module.css";

const MyPage = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPage}>
        <div className={classes["mypage-wrap-title"]}>
          <div className={classes["mypage-title-left"]}>
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/public_assets/profile.jpg`}
                alt=""
              />
              1
            </div>
            <div>
              안녕하세요 <span>홍길동</span>님.
            </div>
            <div>등급</div>
          </div>
          <div className={classes["mypage-title-right"]}>
            <div>
              <FaCog className={classes["mypage-title-icon"]} />
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
          <div>
            <h2>주문배송 정보</h2>
          </div>
          <div>
            <div>주문내역</div>
            <div>배송조회</div>
            <div>찜목록</div>
            <div>최근본상품</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPage;
