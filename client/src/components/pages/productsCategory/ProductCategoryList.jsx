import React, { useState } from "react";

import { HiArrowCircleDown } from "react-icons/hi";

import classes from "./ProductCategoryList.module.css";

const DUMMY_DATA = [1, 2, 3, 4, 5];

const ProductCategoryList = ({ title }) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <ul
      className={classes["productsCategory-categoryList-wrap"]}
      onClick={() => setIsShown((prev) => !prev)}
    >
      <div className={classes["productsCategory-categoryList"]}>
        {`${title} 카테고리`} <HiArrowCircleDown />
      </div>

      {isShown && (
        <div className={classes["productsCategory-categoryList-items"]}>
          {DUMMY_DATA.map((it) => (
            <li>
              <a href="#">{it}</a>
            </li>
          ))}
        </div>
      )}
    </ul>
  );
};

export default ProductCategoryList;
