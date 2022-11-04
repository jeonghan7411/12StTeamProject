import React from "react";
import Product from "./Product";

import classes from "./Products.module.css";

const Products = ({ title }) => {
  return (
    <section className={classes.products}>
      <h2>{title}</h2>

      <div className={classes["products-wrap"]}>
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
    </section>
  );
};

export default Products;
