import React from "react";
import classes from "./AdminContentTitle.module.css";

const AdminContentTitle = ({ title }) => {
  return (
    <React.Fragment>
      <div className={classes["main-content-title"]}>
        <h2>{title}</h2>
      </div>
    </React.Fragment>
  );
};

export default AdminContentTitle;
