import React from "react";
import { Link } from "react-router-dom";

import classes from "./MyPageListForm.module.css";
const MyPageListForm = ({ props, title }) => {
  return (
    <React.Fragment>
      <div className={classes.MyPageListForm}>
        <table>
          <thead>
            <tr>
              <td>No</td>
              <td>아이디</td>
              <td>{title}</td>
              <td>날짜</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{props.idx}</td>
              <td>
                <Link>{props.id}</Link>
              </td>
              <td>{props.content}</td>
              <td>{props.regdate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default MyPageListForm;
