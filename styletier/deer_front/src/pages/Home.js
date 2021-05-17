import product_api from "../api/ProductAPI";
import photo_api from "../api/PhotoAPI"

import React, { useState, useEffect } from 'react';
import HomeBestProduct from "../components/product/HomeBestProduct";
import HomeNewProduct from "../components/product/HomeNewProduct";
import SliderBest from "../components/product/SliderBest";
import SliderNew from "../components/product/SliderNew";
import { Container, Divider, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MainToSeller from "../components/seller/MainToSeller";
import { Link } from "react-router-dom";
// import '../index.css';
import "./MainToSeller.css"

import logo from '../static/logowhite.png'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';
import Media from 'react-media'

const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}

const video = 'https://deer-s3-bucket.s3.ap-northeast-2.amazonaws.com/media/home_video_3.mp4';

// carousel setting
const settings = {
  className: "center",
  centerMode: true,
  slidesToShow: 3,
  infinite: true,
  speed: 500,
  dots: true,
  arrows: false, 
  pauseOnHover: true,
  // autoplay: true, // 자동으로 넘어감
  // // autoplaySpeed: 2750,
};

const useStyles = makeStyles((theme) => ({
  video:{
    width: '100%', 
    // height: '35em', 
    overflow: 'hidden', 
    margin: '0px auto', 
    position: 'relative',
    textAlign: 'center',
    // marginTop: '15%',
  },
  logo:{
    position: 'absolute',
    zIndex: 10,
    width: '25%',
    marginLeft: '-12%',
    marginTop: '53%',
    opacity: '0.8'
  },
  deerText:{
    fontFamily:'AppleUL',
    fontWeight: 300,
    letterSpacing: '-1px',
    fontSize: '1.6em',
  },
  deerText_sub:{
    fontFamily:'AppleUL',
    fontWeight: 300,
    letterSpacing: '-1px',
    fontSize: '0.8em',
    marginTop: '0.5%'
  },
  decoDiv:{
    backgroundColor: 'white',
    height: '0.2em',
    width: '15%',
    marginTop: '2.5em',
    marginBottom: '2em',
    marginLeft: '45%',
  },
  deerCaro:{
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    textAlign: 'center',
  },
  bestCarBox:{
    position: 'absolute',
    height: '37px',
    backgroundColor: '#5A5A5A',
    width: '90%',
    maxwidth: '375px',
    borderRadius: '0px 20px 20px 0px',
    //기존(추후 사용을 위해 주석처리) marginTop: '18%',
    marginTop: '18.2%',
    marginLeft: '1.5%'
  },
  bestCarBox2:{
    position: 'absolute',
    height: '37px',
    backgroundColor: '#5A5A5A',
    width: '94%',
    maxwidth: '375px',
    borderRadius: '0px 20px 20px 0px',
    //기존(추후 사용을 위해 주석처리) marginTop: '18%',
    marginTop: '15.3%',
    // marginLeft: '1.5%'
  },
  bestPic:{
    width: '90%',
  },
  viewAllBtn:{
    backgroundColor: 'white !important', // stop hover
    fontFamily: 'AppleUL',
    fontWeight: 600,
    borderRadius: '30px',
    position: 'absolute',
    zIndex: 100,
    marginLeft: '74.5%',
    marginTop: '19%',
    fontSize: '0.9em',
    textTransform: 'none',
    lineHeight: 1.2,
    minWidth: 40,
    width: '16%',
  },
  viewAllBtn2:{
    backgroundColor: 'white !important', // stop hover
    fontFamily: 'AppleSB',
    letterSpacing: -1,
    borderRadius: '30px',
    position: 'absolute',
    zIndex: 100,
    marginLeft: '76.5%',
    marginTop: '16.5%',
    fontSize: '0.8em',
    textTransform: 'none',
    lineHeight: 1.2,
    minWidth: 54,
    width: '16%',
  },
  mob:{
    position: 'relative',
    minWidth: '320px',
    maxWidth: '480px',
    width: '100%',
    margin: 'auto',
  },
}));

function Home () {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [deerphoto, setDeerPhoto] = useState([]);

  const [best, setBest] = useState({});
  const [bestImage, setBestImage] = useState("");
  const [bestImages, setBestImages] = useState([]);

  const [newObject,setNew] = useState({});
  const [newImage, setNewImage] = useState("");
  const [newImages, setNewImages] = useState([]);

 
  useEffect(() => {
    console.log("user_id",sessionStorage.getItem('user_id'))
    getNewProductList();
    getBestProductList();
    getProductList();
    getDeerPhotoList();

  },[]);

   const getProductList = async () => {
    await product_api
      .getAllProduct()
      .then((result) => {
        console.log(result.data);
        setProducts(result.data);
      })
      .catch((err) => console.log(err));
    };
      
    const getDeerPhotoList = async () => {
      await photo_api
        .getDeerPhoto()
        .then((result) => {
          console.log(result.data);
          setDeerPhoto(result.data);
        })
        .catch((err) => console.log(err));
      };
    const getNewProductList = async () => {
        await product_api
        .getNewProduct()
        .then((result)=>{
          console.log("New Product",result.data)
          setNew(result.data[0])
          setNewImage(result.data[0].photo[0].img)
          let new_list = [];
          result.data.map((data) => {
              new_list.push(data.photo[0].img)
          })
          setNewImages(new_list)
        })
        .catch((err) => console.log(err))
    }
    const getBestProductList = async () =>{
      await product_api
      .getBestProduct()
      .then((result)=>{
        console.log("Best Product",result.data)
        setBest(result.data[0])
        setBestImage(result.data[0].photo[0].img)
        let new_list = [];
        result.data.map((data) => {
            new_list.push(data.photo[0].img)
        })
        setBestImages(new_list)
      })
    }

  return (
    <div className={classes.mob}>
        <div className={classes.video}>
          <img src={logo} className={classes.logo} />
          <div>
              <video muted autoPlay loop style={{width:'100%'}}>
                  <source src={video} type="video/mp4" style={{position: 'absolute', top: '50%', width: '100%'}}/>
              </video>
          </div>
        </div>
        <br/><br/><br/>
        
      
        <div>
        <Grid container spacing={3}>
          {/* Best Product 그리드 */}
          <Grid item xl={12} sm={12}>
            <Typography variant="h4" gutterBottom style={{marginLeft: '8.5%', fontFamily:'AppleSB', fontSize: '1.7em'}}>
              Best Product <br/>
            </Typography>
            <HomeBestProduct best = {best} img = {bestImage}/>
            <Media queries={MEDIA_QUERIES}>
            {matches => {
              return(
                <>
                {matches.pc &&
                <div>
                <div className={classes.bestCarBox}></div>
                <Button component={Link} to={`/shop`} className={classes.viewAllBtn} onClick={() => window.scrollTo(0,0)}>
                  view all
                </Button>
                <SliderBest />
                </div>}
                {matches.mob &&
                <div>
                <div className={classes.bestCarBox2}></div>
                <Button component={Link} to={`/shop`} className={classes.viewAllBtn2} onClick={() => window.scrollTo(0,0)}>
                  view all
                </Button>
                <SliderBest />
                </div>}
                </>
              )
              }}
            </Media>

          </Grid>
          <br/><br/><br/>
          <Divider/>

          <Grid item xl={12} sm={12}>
            <Typography variant="h4" gutterBottom style={{marginLeft: '6%',fontFamily:'AppleSB', fontSize: '1.7em', marginTop: '7%'}}>
              New Arrival <br/>
            </Typography>
            <hr style={{right:'-50%',marginTop: '-3%',width:"7%", border: 'solid 2px',position:'relative', borderRadius: '20px 10px 10px 20px'}}></hr>
            <hr style={{right:'-45%',marginTop: '4%',width:"17%", border: 'solid 2px',position:'relative', borderRadius: '20px 10px 10px 20px'}}></hr>
            <HomeNewProduct new = {newObject} img = {newImage}/>
            <Media queries={MEDIA_QUERIES}>
            {matches => {
              return(
                <>
                {matches.pc &&
                <div>
                <div className={classes.bestCarBox}></div>
                <Button component={Link} to={`/shop`} className={classes.viewAllBtn} onClick={() => window.scrollTo(0,0)}>
                  view all
                </Button>
                <SliderNew />
                </div>}
                {matches.mob &&
                <div>
                <div className={classes.bestCarBox2}></div>
                <Button component={Link} to={`/shop`} className={classes.viewAllBtn2} onClick={() => window.scrollTo(0,0)}>
                  view all
                </Button>
                <SliderNew />
                </div>}
                </>
              )
              }}
            </Media>
          {/* <div className={classes.bestCarBox}></div>
          <Button component={Link} to={`/shop`} className={classes.viewAllBtn} onClick={() => window.scrollTo(0,0)}>
              view all
          </Button>
          <SliderNew /> */}

          </Grid>
          <br/>
          <Divider/>
            


          {/* 당신의 사슴은? 그리드 */}
                <Grid item xs={12}>
                <br/><br/>
                <Typography variant="h4" align="center" className={classes.deerText}>
                    이 달의 셀러들
                </Typography>
                <Typography variant="h4" align="center" className={classes.deerText_sub}>
                    나혼자만 알기싫은
                </Typography>               
                <div className={classes.deerCaro}>
                  <Slider {...settings}>
                  {
                    deerphoto.map((prod,idx)=>(
                      <MainToSeller key = {idx} photo={prod}/>
                    ))
                  }
                  </Slider>
                </div>
                <br/><br/><br/><br/>
                </Grid>
            </Grid>
            
        </div>
    
    </div>
  );
}

export default Home;