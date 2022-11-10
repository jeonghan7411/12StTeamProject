import React from "react";
import classes from "./MyPageNullMsg.module.css";

const MyPageNullMsg = ({ className, text }) => {
  return (
    <React.Fragment>
      <div className={className}>
        <h2 className={classes.title}>{text}</h2>
      </div>
    </React.Fragment>
  );
};

export default MyPageNullMsg;
