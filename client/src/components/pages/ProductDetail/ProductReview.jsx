import React from "react";
import { useParams } from "react-router-dom";

const ProductReview = () => {
  const { getIdx } = useParams();
  return <React.Fragment>ProductReview{getIdx}</React.Fragment>;
};

export default ProductReview;
