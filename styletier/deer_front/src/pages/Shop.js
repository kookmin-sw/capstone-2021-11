import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState, useEffect } from "react";
import product_api from "../api/ProductAPI";
import photo_api from "../api/PhotoAPI";

//slider
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";

import Posts from "../components/product/Posts";

const useStyles = makeStyles((theme) => ({
  dongin: {
    width: "100%",
  },
  texttrans: {
    position: "absolute",
    color: "rgb(230, 236, 241)",
    transform: "rotate(270deg)",
    fontSize: "9em",
    padding: "-10px",
    marginTop: "-460px",
    marginLeft: "-245px",
    zIndex: -1,
  },
  deerCaro: {
    position: "relative",
  },
  mob: {
    position: "relative",
    minWidth: "320px",
    maxWidth: "480px",
    width: "100%",
    margin: "auto",
    backgroundColor: "black",
  },
}));

function Shop(props) {
  const classes = useStyles();

  const carouselTop = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "linear",
    className: "shop",
    dots: true,
    appendDots: (dots) => {
      return (
        <div style={{ width: "90px", bottom: "35px", right: "10px" }}>
          <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />
        </div>
      );
    },
  };

  return (
    <div className={classes.mob}>
      <div style={{ width: "100%" }}>
        <Grid item xs>
          <div className={classes.deerCaro}>
            <Slider {...carouselTop}>
              <div>
                <img
                  className={classes.dongin}
                  src={
                    "https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/shop_main_photos/KakaoTalk_20210513_154034972.jpg"
                  }
                />
              </div>
              <div>
                <img
                  className={classes.dongin}
                  src={
                    "https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/shop_main_photos/KakaoTalk_20210513_154034972_01.jpg"
                  }
                />
              </div>
              <div>
                <img
                  className={classes.dongin}
                  src={
                    "https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/shop_main_photos/KakaoTalk_20210513_154034972_02.jpg"
                  }
                />
              </div>
              <div>
                <img
                  className={classes.dongin}
                  src={
                    "https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/shop_main_photos/KakaoTalk_20210513_154034972_03.jpg"
                  }
                />
              </div>
              <div>
                <img
                  className={classes.dongin}
                  src={
                    "https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/shop_main_photos/KakaoTalk_20210513_154034972_04.jpg"
                  }
                />
              </div>
            </Slider>
          </div>
        </Grid>
        <div style={{ width: "100%", height: "100%" }}>
          <Grid container spacing={1} style={{ width: "100%", margin: 0 }}>
            <div></div>
            <Posts />
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Shop;
