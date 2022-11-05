import React, { useEffect, useState } from "react";

import HomeProduct from "../home/HomeProduct";
import BestTag from "./BestTag";

import classes from "./ProductsBest.module.css";
import ProductsBestTen from "./ProductsBestTen";

const DUMMY_LIST = [];

const ProductsBest = () => {
  const [list, setList] = useState([]);

  const [time, setTime] = useState();

  useEffect(() => {
    for (let i = 1; i <= 100; i++) {
      DUMMY_LIST.push(i);
    }

    const time = new Date();

    setTime(time.toLocaleString("ko-kr"));

    setList(DUMMY_LIST);
  }, []);

  return (
    <div className={classes.productsBest}>
      <div className={classes["productsBest-time"]}>
        <span>
          {time} 기준 <strong>BEST 100</strong>
        </span>
      </div>

      <div className={classes["ProductsBest-tenContent"]}>
        {list.slice(0, 10).map((it) => (
          <ProductsBestTen>
            <BestTag ranking={it} />
          </ProductsBestTen>
          // <HomeProduct>
          //   <BestTag ranking={it} />
          // </HomeProduct>
        ))}
      </div>

      <div className={classes["ProductsBest-content"]}>
        {list.slice(10, 100).map((it) => (
          <div>
            <HomeProduct>
              <BestTag ranking={it} />
            </HomeProduct>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsBest;
