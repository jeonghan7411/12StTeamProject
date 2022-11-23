import React from "react";

import axios from "axios";
import { useEffect } from "react";
import AdminContentTitle from "./AdminContentTitle";

import classes from "./AdminOrder.module.css";
import { useState } from "react";
const AdminOrder = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/admin/api/get/orderList")
        .then((response) => {
          console.log(response.data);
        });
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.AdminOrder}>
        <AdminContentTitle title={"주문관리"} />
      </div>
    </React.Fragment>
  );
};

export default AdminOrder;
