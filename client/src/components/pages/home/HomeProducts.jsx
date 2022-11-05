import React from "react";
import Product from "./HomeProduct";

import classes from "./HomeProducts.module.css";
import RecommendTag from "./RecommendTag";

const Products = (props) => {
  return (
    <section className={`${classes.products} ${props.className}`}>
      <h2>{props.title}</h2>

      <div className={classes["products-wrap"]}>
        <Product>
          <RecommendTag />
        </Product>
        <Product>
          <RecommendTag />
        </Product>
        <Product>
          <RecommendTag />
        </Product>
        <Product>
          <RecommendTag />
        </Product>
        <Product>
          <RecommendTag />
        </Product>
      </div>
    </section>
  );
};

export default Products;
