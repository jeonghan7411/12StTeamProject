import React from "react";
import { useState } from "react";

import classes from "./MyPageWriteForm.module.css";

const MyPageWriteForm = ({
  setBboardtype,
  setBcontent,
  writeForm,
  optionItem,
  orderData,
}) => {
  return (
    <React.Fragment>
      <div className={classes["write-wrap-content"]}>
        <div className={classes["write-content-label"]}>
          <div>{writeForm.title}</div>
          <div>
            <input
              type="text"
              name="bTitle"
              // onChange={inquiryHandler}
              defaultValue={orderData.title}
              readOnly
            />
          </div>
        </div>
        <div className={classes["write-content-label"]}>
          <div>{writeForm.category}</div>
          <div>
            <select
              name="bBoardtype"
              onChange={(e) => setBboardtype(e.target.value)}
            >
              {optionItem.map((item, key) => {
                return (
                  <option key={key} value={item.value}>
                    {item.option}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={classes["write-content-label"]}>
          <div>내용</div>
          <div>
            <textarea
              name="bContent"
              // onChange={inquiryHandler}
              onChange={(e) => setBcontent(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={classes["write-content-button"]}>
        <button type="submit">작성하기</button>
      </div>
    </React.Fragment>
  );
};

export default MyPageWriteForm;
