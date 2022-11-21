import React, { useEffect } from "react";
import { useState } from "react";
import { authCheck } from "../../../util/authCheck";
import { getUser } from "../../../util/getUser";
import classes from "./AdminHome.module.css";

import AdminModal from "./AdminModal";
const AdminHome = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    authCheck();
    getUser(setUser);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.AdminHome}>
        <AdminModal />
      </div>
    </React.Fragment>
  );
};

export default AdminHome;
