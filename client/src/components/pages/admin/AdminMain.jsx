import React from "react";
import AdminContentTitle from "./AdminContentTitle";
import classes from "./AdminMain.module.css";
const AdminMain = () => {
  return (
    <React.Fragment>
      <div className={classes.AdminMain}>
        <AdminContentTitle title={"메인"} />

        <div className={classes["main-content-top"]}>
          <p>- 쇼핑몰 관련 전체적인 정보를 요약하여 보여주는 화면입니다.</p>
          <p>
            - 현재 처리해야 할 주문건수와 매출, 주문처리, 적립금 현황, 고객 분석
            데이터, 공지사항등을 한 화면에서 확인할 수 있습니다.
          </p>
          <p>
            - 메인 대시보드 내용은 운영자 권한에 따라 표시 여부가 결정됩니다.
          </p>
        </div>
        <div className={classes["main-content-sub"]}>
          <p>
            - 오늘 처리 해야 할 주문상태별 수와 게시물 관리 현황을 보여줍니다.
          </p>
          <p>- 각 주문상태의 건수 클릭 시, 해당되는 상세내역을 보여줍니다.</p>
          <p>
            - 해당 주문 목록을 볼 수 있는 메뉴로 이동 시, 검색조건 영역에서 기간
            항목을 제외하고 (검색조회 항목 저장)에서 저장한 값이 표시됩니다.
          </p>
          <p>- 주문상태의 집계 기준은 '30일전 ~ 오늘'입니다.</p>
          <p>- 게시물 현황 집계 기준은 '금일 00:00 ~ 금일 23:59'입니다</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminMain;
