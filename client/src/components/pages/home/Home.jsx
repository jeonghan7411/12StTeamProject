import React from "react";
import Banner from "./Banner";
import Cartegory from "./Cartegory";

import HomeProducts from "./HomeProducts";


const Home = () => {
  return (
    <div>
      <Banner />

      <Cartegory />

      <HomeProducts title="12st 베스트 상품" />

      <HomeProducts title="12st 추천 상품" />

      <HomeProducts title="12st 할인 상품" />

      <HomeProducts title="12st MD 추천 상품" />

      <HomeProducts title="인기 상품" />
    </div>
  );
};

export default Home;
