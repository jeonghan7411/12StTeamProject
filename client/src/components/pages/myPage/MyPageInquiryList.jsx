import React, { useState } from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";
import MyPageNullMsg from "./MyPageNullMsg";

const MyPageInquiryList = () => {
  const [inquiry, setInquiry] = useState([
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
    // {
    //   idx: 1,
    //   id: "홍길동",
    //   content: "+ 1000",
    //   regdate: `${new Date().getFullYear()}년 ${
    //     new Date().getMonth() + 1
    //   }월 ${new Date().getDate()}일`,
    // },
  ]);

  return (
    <React.Fragment>
      <div className={classes.MyPageInquiryList}>
        <MyPageListTitle text={"문의내역"} />
        <div className={classes["inquiry-list-wrap-table"]}>
          {inquiry.length === 0 && (
            <MyPageNullMsg
              className={classes["inquirylist-content-null"]}
              text={"문의 내역이 없습니다."}
            />
          )}
          {inquiry.map((item) => {
            return <MyPageListForm props={item} title={"제목"} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
