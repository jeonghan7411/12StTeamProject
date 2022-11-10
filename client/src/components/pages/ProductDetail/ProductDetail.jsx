import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetail = () => {
  const { getIdx } = useParams();
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/get/productinfo/" + getIdx)
        .then((response) => {
          setCurrentData(response.data.result[0]);
          // console.log(response.data.result[0]);
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <img src={currentData.image} alt={currentData.title} />
    </React.Fragment>
  );
};

export default ProductDetail;
