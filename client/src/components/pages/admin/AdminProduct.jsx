import React from "react";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminProduct.module.css";
const AdminProduct = () => {
  return (
    <React.Fragment>
      <div className={classes.AdminProduct}>
        <AdminContentTitle title={"상품관리"} />
      </div>
    </React.Fragment>
  );
};

export default AdminProduct;
