import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import classes from "./ProductQnA.module.css";

const ProductQnA = ({ productInquire }) => {
  const { getIdx } = useParams();
  const [inquireData, setInquireData] = useState([]);

  useEffect(() => {
    setInquireData(productInquire);
  }, [productInquire]);

  console.log(inquireData);

  return (
    <div className={classes.productQnA}>
      <h4 className={classes["productQnA-title"]}>
        상품 문의
        <span className={classes["productQnA-amount"]}>
          {inquireData.length}
        </span>
        건
      </h4>
      {inquireData.map((it, idx) => (
        <div key={idx} className={classes["productQnA-item"]}>
          <p className={classes["productQnA-item-writeInfo"]}>
            {`${it.uId} | ${it.bWriteDate}`}
          </p>
          <p className={classes["productQnA-item-title"]}>
            <BsFillQuestionCircleFill
              className={classes["productQnA-item-title__icon"]}
            />
            <span>{it.bTitle}</span>
          </p>
          <p className={classes["productQnA-item-content"]}>{it.bContent}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductQnA;
