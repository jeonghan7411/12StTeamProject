import React from "react";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminOrder.module.css";
const AdminOrder = () => {
  return (
    <React.Fragment>
      <div className={classes.AdminOrder}>
        <AdminContentTitle title={"주문관리"} />
      </div>
    </React.Fragment>
  );
};

export default AdminOrder;
