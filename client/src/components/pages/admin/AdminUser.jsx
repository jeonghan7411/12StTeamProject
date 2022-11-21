import React from "react";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminUser.module.css";
const User = ({ userlist }) => {
  return (
    <React.Fragment>
      <div className={classes.User}>
        <AdminContentTitle title={"고객관리"} />

        <div className={classes["user-table-user"]}>
          <table>
            <thead>
              <tr>
                <td>
                  <div>
                    <input type="checkbox" />
                  </div>
                </td>
                <td>No</td>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Birth</td>
                <td>RegDate</td>
                <td>Auth</td>
                <td>비고</td>
              </tr>
            </thead>
            <tbody>
              {userlist.map((it) => (
                <tr>
                  <td>
                    <div>
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>{it.idx}</td>
                  <td>{it.uId}</td>
                  <td>{it.uName}</td>
                  <td>{it.uEmail}</td>
                  <td>{it.uBirth}</td>
                  <td>{it.uRegdate}</td>
                  <td>{it.uAuth}</td>
                  <td>Delete</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default User;
