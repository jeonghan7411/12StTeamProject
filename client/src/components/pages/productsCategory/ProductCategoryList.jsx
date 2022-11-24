import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleDown } from "react-icons/hi";

import classes from "./ProductCategoryList.module.css";
import ProductCategoryListDetail from "./ProductCategoryListDetail";

const ProductCategoryList = ({ title, type, setProducts }) => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [category3, setCategory3] = useState([]);
  useEffect(() => {
    setSubtitle(title);
  }, [subtitle]);

  const fetchData = async () => {
    await axios
      .get(
        "http://www.localhost:5000/product/api/get/products/subcategory?type2=" +
          subtitle
      )
      .then((response) => {
        setCategory3(response.data.category3);
        setProducts(response.data.products);
      });
  };
  const handleSubtitle = () => {
    setIsShown((prev) => !prev);
    setSubtitle(title);
    navigate(`/categories?type=${type}&type2=${subtitle}`);
    fetchData();
  };

  return (
    <ul className={classes["productsCategory-categoryList-wrap"]}>
      <div
        className={classes["productsCategory-categoryList"]}
        onClick={handleSubtitle}
      >
        {title} <HiArrowCircleDown />
      </div>

      {isShown && (
        <div className={classes["productsCategory-categoryList-items"]}>
          {category3.map((it) => (
            <ProductCategoryListDetail
              key={it.category3}
              title={it.category3}
              type={type}
              subtitle={subtitle}
              setProducts={setProducts}
            />
          ))}
        </div>
      )}
    </ul>
  );
};

export default ProductCategoryList;
