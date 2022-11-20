import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import MyPageWriteForm from "./MyPageWriteForm";

const ReviewWrite = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.orderList);

  const optionItem = [
    {
      value: "0",
      option: "유형선택",
    },
    {
      value: "리뷰",
      option: "리뷰",
    },
  ];

  const [bTitle, setBtitle] = useState(orderData.title);
  const [bBoardtype, setBboardtype] = useState();
  const [bContent, setBcontent] = useState();

  const writeReview = (e) => {
    e.preventDefault();

    if (bBoardtype === undefined || bBoardtype === "0") {
      alert("문의 유형을 선택해주세요");
    } else {
      const uId = user.uId;
      const pId = orderData.pId;
      const fetchData = async () => {
        await axios
          .post("http://localhost:5000/mypage/api/write", {
            uId,
            pId,
            bTitle,
            bBoardtype,
            bContent,
          })
          .then((response) => {
            if (response.data.status === 200) {
              alert(response.data.message);
              window.location.href = "http://localhost:3000/mypage";
              // "http://localhost:3000/mypage/reviewlist";
            }
          });
      };
      fetchData();
    }
  };

  console.log(bBoardtype);

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={writeReview}>
        <MyPageWriteForm
          bTitle={bTitle}
          bBoardtype={bBoardtype}
          bContent={bContent}
          setBtitle={setBtitle}
          setBboardtype={setBboardtype}
          setBcontent={setBcontent}
          optionItem={optionItem}
          orderData={orderData}
        />
      </form>
    </React.Fragment>
  );
};

export default ReviewWrite;
