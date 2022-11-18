import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiArrowCircleDown } from "react-icons/hi";

import classes from "./ProductCategoryList.module.css";

const DUMMY_DATA = [1, 2, 3, 4, 5];

const ProductCategoryList = ({ title, type, setProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const type2 = searchParams.get("type2");
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);
  const [subtitle, setSubtitle] = useState("");
  const [category3, setCategory3] = useState([]);
  const [subtitle2, setSubtitle2] = useState("");

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
  const fetchData2 = async () => {
    await axios.get(
      "http://www.localhost:5000/product/api/get/products/subcategory2?type3=" +
        subtitle2
    );
    // .then((response) => {
    //   setProducts(response.data.products);
    // });
  };
  // console.log(type2);
  const handleSubtitle = () => {
    setIsShown((prev) => !prev);
    setSubtitle(title);
    navigate(`/categories?type=${type}&type2=${subtitle}`);
    fetchData();
  };

  const handleSubtitle2 = () => {
    console.log(subtitle2);
    fetchData2();
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
            <Link
              onClick={handleSubtitle2}
              to={`/categories?type=${type}&type2=${subtitle}&type3=${it.category3}`}
            >
              <li>{it.category3}</li>
            </Link>
          ))}
        </div>
      )}
    </ul>
  );
};

export default ProductCategoryList;
