import React from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageWriteForm from "./MyPageWriteForm";

import classes from "./MyPageInquiry.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import axios from "axios";

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
      value: 0,
      option: "유형선택",
    },
    {
      value: "상품문의",
      option: "상품문의",
    },
    {
      value: "배송문의",
      option: "배송문의",
    },
    {
      value: "교환/환불문의",
      option: "교환/환불문의",
    },
  ];

  const [user, setUser] = useState({});
  const [inquiry, setInquiry] = useState({
    bTitle: "",
    bBoardtype: "",
    bContent: "",
  });

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  const inquirySubmit = (e) => {
    e.preventDefault();
    const uId = user.uId;
    const fetchData = async () => {
      await axios
        .post("http://localhost:5000/inquiry", { uId, inquiry })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            window.location.href =
              "http://localhost:3000/mypage/mypageinquirylist";
          }
        });
    };

    fetchData();
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageInquiry}>
        <MyPageListTitle text={"문의하기"} />

        <form action="inquiry" onSubmit={inquirySubmit}>
          <MyPageWriteForm
            inquiry={inquiry}
            setInquiry={setInquiry}
            writeForm={writeForm}
            optionItem={optionItem}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiry;
