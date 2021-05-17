import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import { Link } from "react-router-dom";
import { Container, Divider, Typography, Grid, Button } from '@material-ui/core';
import product_api from "../../api/ProductAPI";
import Media from 'react-media'

const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}


const useStyles = makeStyles({
    pic:{
      width:'100%',
      maxWidth: '480px',
      // height: '192px',
    },  
    slider:{
      maxWidth:'375px', 
      width:'65%', 
      marginLeft: '7%',
    },
    slider_pc:{
      maxWidth:'375px', 
      width:'65%', 
      marginLeft: '6.2%',
    },
    sliderDiv:{

    },
  });
  
  export default function ProductCarousel(props) {
  const [bestsss, setBestData] = useState([]);

    useEffect(() => {
      console.log('렌더링이 완료되었습니다!');
      getTestList();
    },[]);

    const BestProd = {
      // dots: true, 
      // infinite: true,
      infinite: true,
      speed: 500,
      arrows: false, // 화살표
      pauseOnHover: false,
      autoplay: true, // 자동으로 넘어감
      autoplaySpeed: 2750,
      className:"best",
      slidesToShow: 3,
      // slidesToShow:  bestsss.length>=3?3:bestsss.length,
      // dots: true,
      // appendDots: dots => {
      //   return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
      // }
    };
    const getTestList = async () => {
      await product_api
        .getBestProduct()
        .then((result) => {
          setBestData(result.data.slice(1));
        })
        .catch((err) => console.log(err));
      };
      
    const classes = useStyles();
    console.log(bestsss)
    const best_arr = bestsss
    // best_arr = best_arr.shift()
   

    return (
      <Media queries={MEDIA_QUERIES}>
        {matches => {
          return(
            <>
            {matches.pc &&
            <Slider {...BestProd} className={classes.slider_pc}>
            {bestsss.map((id)=>(
                <div className={classes.sliderDiv}>
                {/* {console.log(id.best_prod(filter(1)))} */}
                <Button key={id.id} component={Link}
                to={`/shop/${id.photo[0].product_id}`} onClick={() => window.scrollTo(0,0)}>
                  <img className={classes.pic} src={id.photo[0].img } onClick={ () =>window.scrollTo(0,0)} />
                </Button>
                </div>
              ))
            }
            </Slider>}

            {matches.mob &&
            <Slider {...BestProd} className={classes.slider}>
            {bestsss.map((id)=>(
                <div className={classes.sliderDiv}>
                {/* {console.log(id.best_prod(filter(1)))} */}
                <Button key={id.id} component={Link}
                to={`/shop/${id.photo[0].product_id}`} onClick={() => window.scrollTo(0,0)}>
                  <img className={classes.pic} src={id.photo[0].img } onClick={ () =>window.scrollTo(0,0)} />
                </Button>
                </div>
              ))
            }
            </Slider>}
            </>
          )
          }}
      </Media>
    )
}