import React from "react";

import MyPageListTitle from "./MyPageListTitle";
import CancleReturnExchangeItem from "./CancleReturnExchangeItem";
import classes from "./CrlList.module.css";
import { useState } from "react";
import MyPageNullMsg from "./MyPageNullMsg";

const CrlList = () => {
  const [crlList, setCrlList] = useState([]);
  return (
    <React.Fragment>
      <div className={classes.CrlListd}>
        <MyPageListTitle text={"취소 반품 교환 목록"} />

        {crlList.length === 0 && (
          <div className={classes["crList-wrap-null"]}>
            <MyPageNullMsg
              text={"신청 하신 내역이 없습니다."}
              className={classes["crlList-content-null"]}
            />
          </div>
        )}

        {crlList.map((itme) => {
          return <CancleReturnExchangeItem />;
        })}
      </div>
    </React.Fragment>
  );
};

export default CrlList;
