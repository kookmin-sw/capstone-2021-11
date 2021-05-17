import React, { useState, useEffect } from 'react';
import user_api from "../api/UserAPI";
import product_indi_api from "../api/ProductIndiAPI";
import photo_api from "../api/PhotoAPI";

import { Container, Typography, Button, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Reactplayer from 'react-player';

// img
import deerTail from '../static/deerTail.png'
import model from '../static/modelTransparency.png'
import facebook from '../static/facebook.png'
import insta from '../static/insta.png'
import youtube from '../static/youtube.png'

// carousel setting
const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    // pauseOnHover: true,
    autoplay: true, 
    // className:"",
    slidesToShow: 2, 
};
 
const useStyles = makeStyles((theme) => ({
    sellerName:{
        float: 'right',
        marginRight:'3%',
        fontSize: '2.5em',
        paddingBottom: '17%',
        fontFamily: 'AppleSB',
        backgroundColor: 'white',
    },
    deerMainImg:{
        width: '100%',
        zIndex: 2,
        position: 'relative',
        float: 'right',
        boxShadow: '3px 3px 6px rgba(1,77,129,1)'
    },
    mainBox:{
        width: '50%',
        height: '23em',
        float:'left',
        position: 'absolute',
    },
    mainBoxText:{
        width:'100%',
        color: 'black',
        textAlign: 'right',
        paddingTop: '10%',
        float: 'right',
        position: 'absolute',
        right: '5%',
        marginTop: '3%',
        fontWeight: '600',
        fontFamily: 'AppleUL',
        fontSize:'0.9em',
    },
    blackBox:{
        backgroundColor: 'black',
        float: 'left',
        width: '100%',
        height: '130%',
        // height: '15.2em',
        color: 'white',
        marginBottom: '10%',
    },
    blackBoxText:{
        float: 'right',
        paddingTop: '2em',
        marginRight: '5%',
        letterSpacing: '-1px',
        fontFamily: 'AppleUL',
        fontSize:'1.0em',
        zIndex: 3,
    },
    model:{
        width: '45%',
        position:'absolute',
        marginLeft: '57em',
    },
    logo:{
        width: '35%',
    },
    sns:{
        borderRadius: 0,
        padding: "0",
        float: 'left',
        marginLeft: '170%',
        marginTop: '20%',
        // padding: '-1em',
    },
    logoBtn:{
    },
    deerTail:{
        width: '3%',
        flex: 1,
    },
    prodText:{
        flex: 2,
        fontWeight: 'bold',
        fontSize: '14px',
        letterSpacing: '-0.5px',
        marginLeft: '0.3em',
        fontFamily: 'AppleUL',
    },
    prod:{
        display: 'flex',
        width: '100%',
        marginTop: '3em',
    },
    prodBox:{
        backgroundColor: 'black',
        // height: '18em',
        width: '100%',
        paddingBottom: '5%',
    },
    prodDiv:{
        marginTop: '0.5em',
    },
    pic: {
        width: '90%',
        // height: '100%',
        marginLeft: '1em',
        marginRight: '1em',
        // position: 'fixed',
    },
    youtube:{
        width: '10%',
        // marginLeft: '9em',
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
    },
    videoDiv:{
        width: '50%',
    },
    circle:{
        backgroundColor: '#014D81',
        width: '20px',
        height: '20px',
        borderRadius: '50px',
        float: 'left',
        marginTop: '10%',
        marginRight: '5px'
    },
    deerPd:{
        // height: '5em',
        width: '100%',
        marginLeft: '5%'
    },
    deerBtn:{
        marginTop: '10%',
        // width: '45%',
        marginRight: '5%',
    },
    youtubePlayer:{ // wrapper
        marginTop: '20%',
        marginBottom: '-15%',
        position: 'relative',
        paddingTop: '56.25%',
    },
    tmp:{
        color:'white',
        marginBottom: '50%'
    },
    sellerInfo:{
        // backgroundColor: 'black',
        width: '100%',
        height: '15em',
        position: 'relative',
        paddingTop: '13%'
    },
    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
        backgroundColor: 'white', 
        color: 'black',
        paddingBottom: '10em',
      },
    }));

function SellerIndi(props) {    
    const classes = useStyles();

    const [seller, setSeller] = useState({});
    const [deerInfo, setDeerInfo] = useState({
        // default Data
        deer_img: [],
        email: "",
        facebook_url: "",
        id: null,
        instagram_url: "",
        intro_text1: "안녕하세요! \n당신의 마음을 \n움직이는 사슴입니다.",
        intro_text2: "",
        user_id: null,
        username: "D Johns",
        youtube_url: ""
    });
    const [products, setProducts] = useState([]);
    const [sell, setSellerData] = useState([]);
    const [photo, setPhotoData] = useState([]);
    const [productPhoto,setProductPhoto] = useState([]);
    const [prodId, setProdId] = useState([]);
    const [deerPd, setDeerPdData] = useState([]);


    useEffect(() => {
        // getDeerInfo(props.match.params.name)
        // getProductsInfo(props.match.params.name)
        getProductsInfo(props.match.params.name)
        // console.log("뭐니?",props.match.params.name)
        getSellerList();
        getDeerPd();
        // getProductPhoto(props.match.params.name);
      }, []);

      const getProductsInfo = async (id) => {
        await product_indi_api.getProductIndiWithUser(id)
            .then(result => {
                console.log('products data ::', result.data)
                // const photos = []
                // const idData = []
                // result.data.map((dp) => (
                //     photos.push(dp.product_photo[0])
                // ))
                // result.data.map((dp) => (
                //     idData.push(dp.id)
                // ))
                setProductPhoto(result.data);
                // setProdId(idData);
                // console.log(idData)
            }
        )
      }


      const getSellerList = async () => {
        await user_api.getDeers()
        .then((result) => {
            console.log(result.data);
            setSellerData(result.data);
          })
        .catch((err) => console.log(err));
      }
            
      const getDeerPd = async () => {
        await product_indi_api.getAllProductIndi()
        .then((result) => {
            // console.log(result.data);
            setDeerPdData(result.data);
          })
        .catch((err) => console.log(err));
      }
    
      const getDeerInfo = async (id) => {
        await user_api.getUser(id)
        .then( async (result) => {
            console.log('result', result.data);
            setSeller(result.data)
            if(result.data.deeruser !== null)
                setDeerInfo(result.data.deeruser)
          })
          .catch((err) => {
              console.log('error ::', err)
        });
      }
    
      let id = document.location.href.split("seller/");
      const text1 = sell.map(s => s.intro_text1);
      const text2 = sell.map(s => s.intro_text2);
      const face = sell.map(s => s.facebook_url);
      const ins = sell.map(s => s.instagram_url);
      const tube = sell.map(s => s.youtube_url);
      const ch = sell.map(s => s.youtubeCh_url);
      const name = sell.map(s => s.username);      
      const deerImg = sell.map(s => s.deer_img[0].img);
        
      
      const deerUid = deerPd.map(d => d.user_id)
    //   const deerPdImg = deerPd.map(d => d.product_photo[0].img)
      const deerPdImg = productPhoto.map(d => d.img)
    //   const prodIDnum = prodId.map(d => d.id)
    const num = 0


    return (
        <div className={classes.mob}>
            <div className={classes.sellerInfo}>
                <Typography className={classes.sellerName}> 
                    {name[id[1]-1]} 
                    <div className={classes.circle}></div>
                </Typography>
                <Typography className={classes.mainBoxText}>
                    {(text1[id[1]-1] || '').split('\r\n')[0]}<br/>
                    {(text1[id[1]-1] || '').split('\r\n')[1]}<br/>
                    {(text1[id[1]-1] || '').split('\r\n')[2]}
                </Typography>
                <div className={classes.blackBox}>
                    <Typography className={classes.blackBoxText}>
                        {(text2[id[1]-1] || '').split('\r\n')[0]}<br/>
                        {(text2[id[1]-1] || '').split('\r\n')[1]}<br/>
                        {(text2[id[1]-1] || '').split('\r\n')[2]}<br/>
                        {(text2[id[1]-1] || '').split('\r\n')[3]}
                    </Typography>
                </div>

                
                <div className={classes.mainBox}>
                    {/* deer img Tag */}
                    <div>
                    <img className={classes.deerMainImg} src={deerImg[id[1]-1]} />
                    {/* <Typography className={classes.mainBoxText}>
                        {(text1[id[1]-1] || '').split('\r\n')[0]}<br/>
                        {(text1[id[1]-1] || '').split('\r\n')[1]}<br/>
                        {(text1[id[1]-1] || '').split('\r\n')[2]}
                    </Typography> */}
                    </div>

                    {/* sns button */}
                    <Grid container spacing={1} className={classes.logoBtn}>
                        <Grid style={{width: '20%'}}>
                            <Button className={classes.sns} href={face[id[1]-1]}>
                                <img src={facebook} className={classes.logo} />
                            </Button>
                        </Grid>
                        <Grid style={{width: '20%'}}>
                            <Button className={classes.sns} href={ins[id[1]-1]}>
                                <img src={insta} className={classes.logo} />  
                            </Button>
                        </Grid>
                        <Grid style={{width: '20%', marginTop: '1.5%'}}>
                            <Button className={classes.sns} href={ch[id[1]-1]}>
                                <img src={youtube} className={classes.logo} />  
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </div>
            
            <div className={classes.prod}>
                <Typography className={classes.prodText}> 판매중인 상품 </Typography>
            </div>
            <div className={classes.prodDiv}>
                <div className={classes.prodBox}>
                    <Slider {...settings}>
                        {productPhoto.map((dp) => (
                            <div>
                                {dp.user_id == id[1]
                                ?
                                <Button className={classes.deerBtn} component={Link} to={`/shop/indiv/${dp.id}`}>
                                <img src={dp.product_photo[0].img} className={classes.deerPd}/>
                            </Button>
                            :null
                            }

                            </div>
                        ))}
                        {/* {productPhoto.map((dp) => (
                            <div>
                                <Button className={classes.deerBtn} component={Link} to={`/shop/indiv/${dp.id}`}>
                                    <img src={dp.product_photo[1].img} className={classes.deerPd}/>
                                </Button>
                            </div>
                        ))} */}
{/* 
                        {deerUid[id[1]-1] == id[1]
                        && <div> {deerPd.map((dp) => (
                            <div>
                                    {
                                        dp.user_id == id[1]
                                        ? <Button className={classes.deerBtn} component={Link} to={`/shop/indiv/${dp.product_id}`}>
                                            <img src={dp.product_photo[0].img} className={classes.deerPd} />
                                        </Button>
                                        : null
                                    } 
                            </div>
                ))}
                </div>
                } */}
                    </Slider>

                </div>
            </div>
            
            <div className={classes.youtubePlayer} >
            <Reactplayer 
                    className='react-player'
                    url={tube[id[1]-1]} 
                    width="100%"
                    height='100%'
                    // controls
                    playing 
                    muted
                    loop 
                    />
            </div>
        </div>

    );
}

export default SellerIndi;