import React, { useState } from "react";
import { useEffect } from "react";
import Pagination from "react-js-pagination";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminUser.module.css";
import UserViewModal from "./UserViewModal";
const User = ({ userList }) => {
  const [currentPage, setCurrntPage] = useState(1); // 현재페이지
  const [indexOfLastQnA, setIndexOfLastQnA] = useState(0);
  const [indexOfFirstQnA, setIndexOfFirstQnA] = useState(0);
  // const perPage = 10;
  const [perPage, setPerPage] = useState(10);

  const [userView, setUserView] = useState(false);

  useEffect(() => {
    setIndexOfLastQnA(currentPage * perPage);
    setIndexOfFirstQnA(indexOfLastQnA - perPage);
  }, [currentPage, indexOfFirstQnA, indexOfLastQnA, perPage]);

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
              {userList.slice(indexOfFirstQnA, indexOfLastQnA).map((it) => (
                <tr>
                  <td>
                    <div>
                      <input type="checkbox" />
                    </div>
                  </td>
                  <td>{it.idx}</td>
                  <td>
                    <button
                      className={classes["user-view"]}
                      onClick={() => setUserView(true)}
                      // navigate로 아이디 보내서 select으로 찾기
                    >
                      {it.uId}
                    </button>
                  </td>
                  <td>{it.uName}</td>
                  <td>{it.uEmail}</td>
                  <td>{it.uBirth}</td>
                  <td>{it.uRegdate}</td>
                  <td>{it.uAuth}</td>
                  <td>Delete</td>
                </tr>
              ))}
              {userView === true && <UserViewModal props={userList} />}
            </tbody>
          </table>
        </div>

        {userList.length != 0 && (
          <div>
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={perPage}
              totalItemsCount={userList.length}
              pageRangeDisplayed={5}
              prevPageText={"<"}
              nextPageText={">"}
              onChange={setCurrntPage}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default User;
