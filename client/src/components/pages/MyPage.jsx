import React from "react";
import classes from "./MyPage.module.css";

const MyPage = () => {
  return (
    <React.Fragment>
      <div className={classes.mypage}>
        <div className={classes["mypage-wrap-title"]}>
          <h2>마이페이지</h2>
        </div>
        <div>
          <table>
            <thead>
              <th>1</th>
              <th>2</th>
            </thead>
            <tbody>
              <tr>
                <td>아이디</td>
                <td>ㅇㄴㅁㅇㄴㅁ</td>
                <td>사진</td>
                <td>사진</td>
              </tr>
              <tr>
                <td>이름</td>
                <td>이름</td>
              </tr>
              <tr>
                <td>생년월일</td>
                <td>이름</td>
              </tr>
              <tr>
                <td>성별</td>
                <td>이름</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPage;
