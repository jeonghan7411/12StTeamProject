import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import classes from "./AdminHome.module.css";

import AdminModal from "./AdminModal";
const AdminHome = () => {
  const [user, setUser] = useState({});
  const location = useLocation();
  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);
  // console.log(location);
  if (location.state === null || location.state.user.uAuth !== 2) {
    alert("관리자가 아닙니다");
    window.location.href = "/";
    return null;
  }
  return (
    <React.Fragment>
      <div className={classes.AdminHome}>
        <AdminModal />
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
