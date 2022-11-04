import React from "react";
import { useParams } from "react-router-dom";

const ProductQnA = () => {
  const { getIdx } = useParams();
  return <React.Fragment>ProductQnA{getIdx}</React.Fragment>;
};

export default ProductQnA;
