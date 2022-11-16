import React from "react";
import { Link } from "react-router-dom";

import classes from "./MyPageListForm.module.css";
const MyPageListForm = ({ props, title, inquiryList }) => {
  const inquiryTitle = props.bTitle;
  const inquiryContent = props.bContent;
  return (
    <React.Fragment>
      {inquiryList && (
        <div className={classes.MyPageListForm}>
          <table>
            <thead>
              <tr>
                <td>문의 유형</td>
                <td>{title}</td>
                <td>내용</td>
                <td>날짜</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.bBoardtype}</td>
                <td>
                  <Link>{inquiryTitle.substring(0, 10) + "..."}</Link>
                </td>
                <td>{inquiryContent.substring(0, 10) + "..."}</td>
                <td>{props.bWriteDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
};

export default MyPageListForm;
