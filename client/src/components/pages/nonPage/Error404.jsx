import React from "react";
import image404 from "../../../assets/icons/siba.png";
import classes from "./Error404.module.css";
const Error404 = () => {
  return (
    <div className={classes["error404-wrap"]}>
      <div className={classes["error404"]}></div>
      <h1>잘못된 접근입니다</h1>
    </div>
  );
};

export default Error404;
