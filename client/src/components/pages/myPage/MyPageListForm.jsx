import React from "react";
import { Link } from "react-router-dom";

import classes from "./MyPageListForm.module.css";
const MyPageListForm = ({ props, title, pointCheck }) => {
  const inquiryTitle = props.bTitle;
  const inquiryContent = props.bContent;

  const getpoint = props.oGetpoint;
  const usepoint = props.oUsepoint;
  return (
    <React.Fragment>
      {pointCheck === true ? (
        <div className={classes.pointlist}>
          <table>
            <thead>
              <tr>
                <td>날짜</td>
                <td>포인트</td>
                <td>{title}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{props.oDate}</td>
                <td>{getpoint.toLocaleString("ko-kr")}</td>
                <td>적립</td>
              </tr>
              {props.oUserpotin != 0 && (
                <tr>
                  <td>{props.oDate}</td>
                  <td>{usepoint.toLocaleString("ko-kr")}</td>
                  <td>사용</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
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
