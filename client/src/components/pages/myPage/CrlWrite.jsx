import React from "react";

import classes from "./CrlWrite.module.css";
import MyPageListTitle from "./MyPageListTitle";
import MyPageWriteForm from "./MyPageWriteForm";

const CrlWrite = () => {
  const writeForm = {
    title: "상품",
    category: "유형",
  };

  const optionItem = [
    {
      value: "",
      option: "유형선택",
    },
    {
      value: 1,
      option: "취소",
    },
    {
      value: 2,
      option: "반품",
    },
    {
      value: 3,
      option: "교환",
    },
    {
      value: 4,
      option: "환불",
    },
  ];

  return (
    <React.Fragment>
      <div className={classes.CrlWrite}>
        <MyPageListTitle text={"취소 반품 교환 환불 신청"} />

        <form action="">
          <MyPageWriteForm writeForm={writeForm} optionItem={optionItem} />
        </form>
      </div>
    </React.Fragment>
  );
};

export default CrlWrite;
