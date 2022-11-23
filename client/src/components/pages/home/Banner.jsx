import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";
import SearchItem from "../search/SearchItem";

import classes from "./Banner.module.css";

const Banner = ({ products }) => {
  return (
    <div className={classes.banner}>
      {products.map((data) => {
        return (
          <Link to={`/products/${Number.parseInt(data.productId)}`}>
            <SearchItem data={data} />
          </Link>
        );
      })}
    </div>
  );
};

export default Banner;
