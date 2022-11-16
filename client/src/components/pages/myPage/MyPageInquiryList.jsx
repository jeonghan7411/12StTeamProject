import React, { useEffect, useState } from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";
import MyPageNullMsg from "./MyPageNullMsg";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import axios from "axios";

const MyPageInquiryList = () => {
  const [inquiry, setInquiry] = useState([]);
  const [user, setUser] = useState({});

  const inquiryList = true;
  useEffect(() => {
    authCheck();
    getUser(setUser);

    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/inquirylist", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.data.status === 200) {
            setInquiry(response.data.data);
          }
        });
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.MyPageInquiryList}>
        <MyPageListTitle text={"문의내역"} />
        <div className={classes["inquiry-list-wrap-table"]}>
          {inquiry.length === 0 && (
            <MyPageNullMsg
              className={classes["inquirylist-content-null"]}
              text={"문의 내역이 없습니다."}
            />
          )}
          {inquiry.map((item) => {
            return (
              <MyPageListForm
                props={item}
                title={"제목"}
                inquiryList={inquiryList}
              />
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
