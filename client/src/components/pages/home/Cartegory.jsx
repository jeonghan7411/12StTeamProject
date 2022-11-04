import React from "react";

import classes from "./Cartegory.module.css";
import CategoryItem from "./CategoryItem";
import Card from "../../UI/Card";

const Cartegory = () => {
  return (
    <Card className={classes.category}>
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
      <CategoryItem />
    </Card>
  );
};

export default Cartegory;
