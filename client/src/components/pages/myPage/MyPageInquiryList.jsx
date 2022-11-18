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
    // authCheck();
    // getUser(setUser);

    // const getBoard = async () => {
    //   await axios
    //     .get("http://localhost:5000/mypage/api/boardlist", {
    //       withCredentials: true,
    //     })
    //     .then((response) => {
    //       if (response.data.status === 200) {
    //         setInquiry(response.data.data);
    //       }
    //     });
    // };
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

          {/* {inquiry.map((item) => {
            return (
              <MyPageListForm
                props={item}
                title={"제목"}
                inquiryList={inquiryList}
              />
            );
          })} */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
