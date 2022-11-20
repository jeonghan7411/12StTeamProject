import React, { useEffect, useState } from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import { getBoard } from "../../../util/getBoard";
import axios from "axios";
import Pagination from "./Pagination";

const MyPageInquiryList = () => {
  const [boardData, setBoarData] = useState([]);
  const [user, setUser] = useState({});

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

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

        <div className={classes["select-wrap"]}>
          <label>표시할 게시물</label>
          <select
            // type={Number}
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="1">1개씩 보기</option>
            <option value="3">3개씩 보기</option>
            <option value="5">5개씩 보기</option>
            <option value="10">10개씩 보기</option>
          </select>
        </div>
        <div className={classes["inquiry-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <MyPageNullMsg
              className={classes["inquirylist-content-null"]}
              text={"문의 내역이 없습니다."}
            />
          )}
          {getInfo.slice(offset, offset + limit).map((item, key) => {
            return <MyPageListForm key={key} props={item} title={"상품명"} />;
          })}
        </div>

        {getInfo.length != 0 && (
          <div>
            <Pagination
              total={getInfo.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
