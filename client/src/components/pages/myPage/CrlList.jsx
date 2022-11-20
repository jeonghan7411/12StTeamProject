import React from "react";

import MyPageListTitle from "./MyPageListTitle";
import classes from "./CrlList.module.css";
import { useState } from "react";
import MyPageNullMsg from "./MyPageNullMsg";
import { useEffect } from "react";
import { getBoard } from "../../../util/getBoard";
import MyPageListForm from "./MyPageListForm";
import { authCheck } from "../../../util/authCheck";
import Pagination from "./Pagination";

const CrlList = () => {
  const [boardData, setBoardData] = useState([]);

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    authCheck();
    getBoard(setBoardData);
  }, []);

  const getInfo = boardData.filter(
    (it) =>
      it.bBoardtype === "교환" ||
      it.bBoardtype === "취소" ||
      it.bBoardtype === "반품" ||
      it.bBoardtype === "환불"
  );

  console.log(getInfo);
  return (
    <React.Fragment>
      <div className={classes.CrlListd}>
        <MyPageListTitle text={"취소 반품 교환 목록"} />

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

        <div className={classes["crl-list-wrap-table"]}>
          {getInfo.length === 0 && (
            <div className={classes["crList-wrap-null"]}>
              <MyPageNullMsg
                text={"신청 하신 내역이 없습니다."}
                className={classes["crlList-content-null"]}
              />
            </div>
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

export default CrlList;
