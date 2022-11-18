import React from "react";

import MyPageListTitle from "./MyPageListTitle";
import CancleReturnExchangeItem from "./CancleReturnExchangeItem";
import classes from "./CrlList.module.css";
import { useState } from "react";
import MyPageNullMsg from "./MyPageNullMsg";
import { useEffect } from "react";
import { getBoard } from "../../../util/getBoard";
import MyPageListForm from "./MyPageListForm";

const CrlList = () => {
  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    getBoard(setBoardData);
  }, []);

  const getInfo = boardData.filter(
    (it) =>
      it.bBoardtype === "교환" ||
      it.bBoardtype === "취소" ||
      it.bBoardtype === "반품" ||
      it.bBoardtype === "환불"
  );
  return (
    <React.Fragment>
      <div className={classes.CrlListd}>
        <MyPageListTitle text={"취소 반품 교환 목록"} />

        <div className={classes["crl-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <div className={classes["crList-wrap-null"]}>
              <MyPageNullMsg
                text={"신청 하신 내역이 없습니다."}
                className={classes["crlList-content-null"]}
              />
            </div>
          )}
          {getInfo.map((item, key) => {
            return <MyPageListForm key={key} props={item} title={"상품명"} />;
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CrlList;
