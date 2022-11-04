import React from "react";
import { useParams } from "react-router-dom";

const ProductShippingAnnounce = () => {
  const { getIdx } = useParams();
  return <React.Fragment>ProductShippingAnnounce{getIdx}</React.Fragment>;
};

export default ProductShippingAnnounce;
