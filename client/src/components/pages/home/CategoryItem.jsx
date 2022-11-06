import React from "react";

import { useNavigate } from "react-router-dom";

import icon from "../../../assets/icons/appleLogin.png";

import classes from "./CategoryItem.module.css";

const CategoryItem = () => {
  const navigate = useNavigate();

  return (
    <div
      className={classes.categoryItem}
      onClick={() => navigate("/productsCategory")}
    >
      <div className={classes["categoryItem-img"]}>
        <img src={icon} />
      </div>
      <h4>파인애플</h4>
    </div>
  );
};

export default CategoryItem;
