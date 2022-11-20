import React from "react";
import { Link } from "react-router-dom";
import Card from "../../UI/Card";

import classes from "./Banner.module.css";

const Banner = ({ products }) => {
  return (
    <div className={classes.banner}>
      {products.map((data) => {
        return (
          <Link to={`/products/${Number.parseInt(data.productId)}`}>
            <Card className={`${classes.product} ${data.className}`}>
              {data.children}
              <Card className={classes["product-img"]}>
                <img src={data.image} alt="" />
              </Card>
              <div className={classes["product-content"]}>
                <h3 className={classes["product-content-title"]}>
                  {data.title.substring(0, 13)}
                </h3>
                <div className={classes["product-content-priceInfo"]}>
                  <span className={classes["product-content-discount"]}>
                    {data.pDiscount}%
                  </span>
                  <div className={classes["product-content-priceWrap"]}>
                    <span className={classes["product-content-price"]}>
                      {/* 할인된 가격 */}
                      {data.price -
                        Math.ceil(data.price * (data.pDiscount / 100))}
                      원
                    </span>
                    <span className={classes["product-content-costPrice"]}>
                      {data.price}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default Banner;
