import React from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageWriteForm from "./MyPageWriteForm";

import classes from "./MyPageInquiry.module.css";

const MyPageInquiry = () => {
  const writeForm = {
    title: "제목",
    category: "유형",
    optiontitle: "유형선택",
    optionFirst: "상품문의",
    optionSecond: "배송문의",
    optionThird: "교환/환불문의",
  };

  const optionItem = [
    {
      value: 1,
      option: "상품문의",
    },
    {
      value: 2,
      option: "배송문의",
    },
    {
      value: 3,
      option: "교환/환불문의",
    },
  ];
  return (
    <React.Fragment>
      <div className={classes.MyPageInquiry}>
        <MyPageListTitle text={"문의하기"} />

        <form action="">
          <MyPageWriteForm writeForm={writeForm} optionItem={optionItem} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiry;
