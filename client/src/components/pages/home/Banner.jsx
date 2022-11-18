import React from "react";

import classes from "./Banner.module.css";

const Banner = ({ products }) => {
  return (
    <div className={classes.banner}>
      {products.map((data) => {
        return <div>{data.title}</div>;
      })}
    </div>
  );
};

export default Banner;
