import React from "react";
import { Link } from "react-router-dom";

import classes from "./MyPageListForm.module.css";
const MyPageListForm = () => {
  return (
    <React.Fragment>
      <div className={classes.MyPageListForm}>
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>아이디</td>
              <td>내용</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
            <tr>
              <td>1</td>
              <td>
                <Link>123213</Link>
              </td>
              <td>적립 + 10000</td>
              <td>2022-11-11</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default MyPageListForm;
