import React from "react";

import classes from "./MyPageWriteForm.module.css";

const MyPageWriteForm = ({ writeForm, optionItem }) => {
  return (
    <React.Fragment>
      <div className={classes["write-wrap-content"]}>
        <div className={classes["write-content-label"]}>
          <div>{writeForm.title}</div>
          <div>
            <input type="text" />
          </div>
        </div>
        <div className={classes["write-content-label"]}>
          <div>{writeForm.category}</div>
          <div>
            <select onChange={(e) => console.log(e.target.value)}>
              {optionItem.map((item, key) => {
                return (
                  <option key={item.value} value={item.value}>
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
            <textarea></textarea>
          </div>
        </div>
      </div>
      <div className={classes["write-content-button"]}>
        <button>작성하기</button>
      </div>
    </React.Fragment>
  );
};

export default MyPageWriteForm;
