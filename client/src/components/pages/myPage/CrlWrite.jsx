import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import classes from "./CrlWrite.module.css";
import MyPageListTitle from "./MyPageListTitle";
import MyPageWriteForm from "./MyPageWriteForm";

const CrlWrite = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(location.state.orderList);

  const [user, setUser] = useState({});
  const [bTitle, setBtitle] = useState(orderData.pId);
  const [bBoardtype, setBboardtype] = useState();
  const [bContent, setBcontent] = useState();
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
      value: "취소",
      option: "취소",
    },
    {
      value: "반품",
      option: "반품",
    },
    {
      value: "교환",
      option: "교환",
    },
    {
      value: "환불",
      option: "환불",
    },
  ];

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  const crlWriteSubmit = (e) => {
    e.preventDefault();
    const uId = user.uId;
    const fetchData = async () => {
      await axios
        .post("http://localhost:5000/mypage/api/crlwrite", {
          uId,
          bTitle,
          bBoardtype,
          bContent,
        })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            window.location.href =
              "http://localhost:3000/mypage/cancel-return-exchange";
          }
        });
    };
    fetchData(0);
  };

  return (
    <React.Fragment>
      <div className={classes.CrlWrite}>
        <MyPageListTitle text={"취소 반품 교환 환불 신청"} />

        <form action="crlwrite" onSubmit={crlWriteSubmit}>
          <MyPageWriteForm
            writeForm={writeForm}
            optionItem={optionItem}
            orderData={orderData}
            setBboardtype={setBboardtype}
            setBcontent={setBcontent}
          />
        </form>
      </div>
    </React.Fragment>
  );
};

export default CrlWrite;
