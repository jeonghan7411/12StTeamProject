import React, { useEffect, useState } from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import { getBoard } from "../../../util/getBoard";
import axios from "axios";

const MyPageInquiryList = () => {
  const [boardData, setBoarData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getBoard(setBoarData);
  }, []);

  const getInfo = boardData.filter(
    (it) =>
      it.bBoardtype === "교환/환불문의" ||
      it.bBoardtype === "배송문의" ||
      it.bBoardtype === "상품문의"
  );

  return (
    <React.Fragment>
      <div className={classes.MyPageInquiryList}>
        <MyPageListTitle text={"문의내역"} />
        <div className={classes["inquiry-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <MyPageNullMsg
              className={classes["inquirylist-content-null"]}
              text={"문의 내역이 없습니다."}
            />
          )}
          {getInfo.map((item, key) => {
            return <MyPageListForm key={key} props={item} title={"상품명"} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
