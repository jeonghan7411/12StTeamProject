import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ProductCategoryListDetail.module.css";
const ProductCategoryListDetail = ({ title, type, subtitle, setProducts }) => {
  const [subtitle2, setSubtitle2] = useState("");
  const handleSubtitle2 = () => {
    setSubtitle2(title);
    fetchData2();
  };
  useEffect(() => {
    setSubtitle2(title);
  }, [subtitle2]);

  const fetchData2 = async () => {
    await axios
      .get(
        "http://www.localhost:5000/product/api/get/products/subcategory2?type3=" +
          subtitle2
      )
      .then((response) => {
        setProducts(response.data.result);
      });
  };

  return (
    <div className={classes["productsCategory-categoryList-items"]}>
      <li>
        <Link
          onClick={handleSubtitle2}
          to={`/categories?type=${type}&type2=${subtitle}&type3=${subtitle2}`}
        >
          {title}
        </Link>
      </li>
    </div>
  );
};

export default ProductCategoryListDetail;
