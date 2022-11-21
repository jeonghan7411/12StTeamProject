import React from "react";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminBoard.module.css";

const AdminBoard = () => {
  return (
    <React.Fragment>
      <div>
        <AdminContentTitle title={"게시판 관리"} />
      </div>
    </React.Fragment>
  );
};

export default AdminBoard;
