import React from "react";
import MyPageListTitle from "./MyPageListTitle";
import MyPageListForm from "./MyPageListForm";

import classes from "./MyPageInquiryList.module.css";

const MyPageInquiryList = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageInquiryList}>
        <MyPageListTitle text={"문의내역"} />
        <div className={classes["inquiry-list-wrap-table"]}>
          <MyPageListForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageInquiryList;
