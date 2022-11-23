import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./SliderBanner.module.css";

const SliderBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className={classes.sliderBanner}>
      <Slider {...settings} className={classes["sliderBanner-banner"]}>
        <div className={classes["sliderBanner-banner__item"]}>1</div>
        <div className={classes["sliderBanner-banner__item"]}>2</div>
        <div className={classes["sliderBanner-banner__item"]}>3</div>
      </Slider>
    </div>
  );
};

export default SliderBanner;
