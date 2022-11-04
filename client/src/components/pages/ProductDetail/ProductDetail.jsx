import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { getIdx } = useParams();

  return (
    <React.Fragment>
      상품상세
      {getIdx}
    </React.Fragment>
  );
};

export default ProductDetail;
