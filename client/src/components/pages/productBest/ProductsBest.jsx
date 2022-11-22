import React, { useEffect, useState } from "react";

import classes from "./ProductsBest.module.css";
import SearchItem from "../search/SearchItem";

import bestlogo from "../../../assets/icons/best.png";

import ProductsBestTen from "./ProductsBestThree";

const ProductsBest = ({ bestProduct }) => {
  const [time, setTime] = useState();

  useEffect(() => {
    const time = new Date();
    setTime(time.toLocaleString("ko-kr"));
  }, []);

  return (
    <div className={classes.productsBest}>
      <div className={classes["productsBest-titleWrap"]}>
        <h3 className={classes["productsBest-title"]}>
          <img src={bestlogo} alt="bestProduct" /> 12st 베스트 3 상품
        </h3>
        <span className={classes["productsBest-time"]}>
          {time} 기준 BEST 100
        </span>
      </div>

      <section className={classes["productsBest-threeContent"]}>
        {bestProduct.slice(0, 3).map((it, idx) => (
          <ProductsBestTen key={idx} data={it} />
        ))}
      </section>

      <div className={classes["productsBest-titleWrap"]}>
        <h3 className={classes["productsBest-title"]}>
          <img src={bestlogo} alt="bestProduct" /> 12st 베스트 상품
        </h3>
        <span className={classes["productsBest-time"]}>
          {time} 기준 BEST 100
        </span>
      </div>
      <section className={classes["productsBest-content"]}>
        {bestProduct.slice(3, 101).map((it, idx) => (
          <SearchItem data={it} key={idx} />
        ))}
      </section>
    </div>
  );
};

export default ProductsBest;
