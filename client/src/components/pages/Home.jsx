import React from "react";
import Banner from "../Banner";
import Products from "../Products";
import Product from "../Product";

const Home = () => {
  return (
    <div style={{ height: "800px" }}>
      <Banner />
      <Products title="인기 상품" />
    </div>
  );
};

export default Home;
