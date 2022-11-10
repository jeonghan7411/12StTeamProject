import React from "react";
import { useState } from "react";
import classes from "./MyPageWriteForm.module.css";

const MyPageWriteForm = ({ writeForm, optionItem }) => {
  const [test, setTest] = useState("");
  console.log(test);
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
            <select>
              <option>{writeForm.optiontitle}</option>
              {optionItem.map((item) => {
                return (
                  <option value={item.value} onChange={(e) => alert("dd")}>
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
        <button onClick={() => alert("dd")}>작성하기</button>
      </div>
    </React.Fragment>
  );
};

export default MyPageWriteForm;
