import React from "react";

import icon from "../../../assets/icons/appleLogin.png";

import classes from "./CategoryItem.module.css";

const CategoryItem = () => {
  return (
    <div className={classes.categoryItem}>
      <div className={classes["categoryItem-img"]}>
        <img src={icon} />
      </div>
      <h4>파인애플</h4>
    </div>
  );
};

export default CategoryItem;
