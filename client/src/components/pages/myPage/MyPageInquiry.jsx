import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import MyPageListTitle from "./MyPageListTitle";
import MyPageWriteForm from "./MyPageWriteForm";

import classes from "./MyPageInquiry.module.css";

import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import axios from "axios";

const MyPageInquiry = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.orderList);
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

  const [bTitle, setBtitle] = useState(orderData.title);
  const [bBoardtype, setBboardtype] = useState();
  const [bContent, setBcontent] = useState();

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  const inquirySubmit = (e) => {
    e.preventDefault();
    const uId = user.uId;
    const fetchData = async () => {
      await axios
        .post("http://localhost:5000/mypage/api/inquiry", {
          uId,
          bTitle,
          bBoardtype,
          bContent,
        })
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
            bTitle={bTitle}
            bBoardtype={bBoardtype}
            bContent={bContent}
            setBtitle={setBtitle}
            setBboardtype={setBboardtype}
            setBcontent={setBcontent}
            writeForm={writeForm}
            optionItem={optionItem}
            orderData={orderData}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiry;
