import React, { useEffect, useState } from "react";

import ProductCategoryList from "./ProductCategoryList";
import Banner from "../home/Banner";
import HomeProduct from "../home/HomeProduct";

import classes from "./ProductsCategory.module.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ProductsCategory = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState([]);
  const [products, setProducts] = useState([]);
  const type = searchParams.get("type");
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          "http://localhost:5000/product/api/get/products/category?type=" + type
        )
        .then((response) => {
          setProducts(response.data.products);
          setCategory(response.data.category);
          setCategory2(response.data.category2);
        });
    };
    fetchData();
  }, [type]);
  // console.log(category);
  // console.log(category2);
  return (
    <div className={classes.productsCategory}>
      {/* 좌측 카테고리 정렬 (상단 카테고리 중분류 + 소분류, 하단 대분류) */}
      <div className={classes["productsCategory-left"]} onClick={() => {}}>
        <h4>{category}</h4>
        {category2.map((it) => (
          <ProductCategoryList
            title={it.category2}
            type={type}
            setProducts={setProducts}
          />
        ))}
      </div>

      {/* 우측 상품 */}
      <div className={classes["productsCategory-right"]}>
        <h4>클릭한 카테고리</h4>
        <Banner
          className={classes["productsCategory-banner"]}
          products={products}
        />

        <section>
          <p>섹션명</p>
          <div className={classes["productsCategory-products"]}>
            {/* <HomeProduct
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
            /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductsCategory;
