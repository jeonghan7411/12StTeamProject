import React from "react";

import classes from "./MyPageAddressAdd.module.css";
const MyPageAddressAdd = ({ addState, setAddState }) => {
  const AddUserHandle = (e) => {
    setAddState({
      ...addState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <React.Fragment>
      <div className={classes.MyPageAddressAdd}>
        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 이름</h2>
          </div>
          <div>
            <input type="text" name="id" onChange={AddUserHandle} />
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 주소</h2>
          </div>
          <div>
            <input type="text" name="address" onChange={AddUserHandle} />
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 전화번호</h2>
          </div>
          <div>
            <input type="text" name="tel" onChange={AddUserHandle} />
          </div>
        </div>

        <div className={classes["addressadd-wrap-item"]}>
          <div>
            <h2> 요청사항</h2>
          </div>
          <div>
            <textarea name="plz" onChange={AddUserHandle} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MyPageAddressAdd;
