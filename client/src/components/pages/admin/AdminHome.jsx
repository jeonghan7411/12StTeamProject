import React from "react";
import classes from "./AdminHome.module.css";

import AdminModal from "./AdminModal";
const AdminHome = () => {
  return (
    <React.Fragment>
      <div className={classes.AdminHome}>
        <AdminModal />
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
