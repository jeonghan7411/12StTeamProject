import React from "react";

import ProductCategoryList from "./ProductCategoryList";
import Banner from "../home/Banner";
import HomeProduct from "../home/HomeProduct";

import classes from "./ProductsCategory.module.css";

const DUMMY_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ProductsCategory = () => {
  return (
    <div className={classes.productsCategory}>
      {/* 좌측 카테고리 정렬 (상단 카테고리 중분류 + 소분류, 하단 대분류) */}
      <div className={classes["productsCategory-left"]} onClick={() => {}}>
        <h4>클릭한 카테고리</h4>
        {DUMMY_LIST.map((it) => (
          <ProductCategoryList title={it} />
        ))}
      </div>

      {/* 우측 상품 */}
      <div className={classes["productsCategory-right"]}>
        <h4>클릭한 카테고리</h4>
        <Banner className={classes["productsCategory-banner"]} />

        <section>
          <p>섹션명</p>
          <div className={classes["productsCategory-products"]}>
            <HomeProduct
              className={classes["productsCategory-products-item"]}
            />
            <HomeProduct
              className={classes["productsCategory-products-item"]}
            />
            <HomeProduct
              className={classes["productsCategory-products-item"]}
            />
            <HomeProduct
              className={classes["productsCategory-products-item"]}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsCategory;
