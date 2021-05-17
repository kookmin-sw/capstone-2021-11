import product_api from "../api/ProductAPI";
import payment_api from "../api/PaymentAPI";
import React, { useState, useEffect, Fragment } from 'react';
import { Link } from "react-router-dom";

import { Container, Typography, Grid, Paper, Button, TableHead } from '@material-ui/core';
import { TableContainer, Table, TableBody, TableRow, TableCell} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import logo from '../static/homeLogo.png'
import paperBg from '../static/paper.jpg'
import cart from '../static/cart.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"
import MagicSliderDots from 'react-magic-slider-dots';
import 'react-magic-slider-dots/dist/magic-dots.css';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: 'rgba( 255, 255, 255, 0.5 )',
    },
    button : {
        color: 'white',
        marginTop: '30px',
        width: '35%',
        padding: '1em',
        fontSize: '1em',
        fontFamily:'AppleUL',
        fontWeight: 100,
        justifyContent:'unset',
        textTransform: 'none',
        borderRadius: 0,
        // backgroundColor:'#014D81',
    },
    buttonBaro : {
        color: 'white',
        marginTop: '30px',
        width: '35%',
        padding: '1em',
        fontSize: '1em',
        fontFamily:'AppleUL',
        fontWeight: 100,
        justifyContent:'unset',
        borderRadius: 0,
        marginRight: '5%',
        // backgroundColor:'#014D81',
    },
    buttonBaroText:{
        fontFamily: 'AppleUL',
        marginLeft: '17%',
    },  
    paymentButton : {
        padding: '1em',
        marginTop: '30px',
        width: '50%',
        fontSize: 'large',
        fontFamily:'AppleUL',
        borderRadius: 0,
    },
    buttonWrap: {
        textAlign: 'right',
        marginRight: '3%',
    },
    buttonIcon : {
        width: '30%',
    },
    logo: {
        verticalAlign:'middle',
        marginLeft:'3%',
        width: '10%',
        marginRight: '5%',
    },
    table: {
        borderCollapse:'unset',
        borderSpacing:'5px 13px',
        width:'85%',
        margin:'auto',
        marginTop: '8%',
        borderRadius: '26px',
    },
    productName: {
        color:'white',
        padding:'5px 0',
        marginLeft:'3%',
        marginBottom: '5%',
        textAlign:'center',
        position:'relative',
        fontWeight: 100,
        fontSize: '23px',
        fontFamily:'AppleUL',
    },
    blackBox:{
        background: 'black',
        width: '55%',
        height: '45px',
        position: 'relative',
        margin:'auto',
        position:'relative',
        bottom:'29px',
    },
    leftCell: {
        backgroundColor:'black',
        color:'white',
        textAlign:'center',
        borderBottomWidth:'0px',
        width:'40%',
        fontFamily:'AppleUL',
        borderRadius: '13px',
    },
    rightCell: {
        borderBottomColor:'grey',
        borderBottomWidth:'1.5px',
        fontFamily:'AppleUL',
    },
    quan:{
        width: '30%',
    },
    price: {
        color:'black',
        fontSize:'1em',
        float:'right',
        marginRight: '10%',
        marginBottom: '5%',
        marginTop: '7%',
        fontFamily:'AppleUL',
        fontWeight: 100,
    },
    carouselImg: {
        position: "relative",
        width: '80%',
        marginLeft: '10%',
        marginTop: '10%',
        marginBottom: '8%',
    },
    carouselImgDeer: {
        position: "relative",
        width: '100%',
    },
    carDeerBtn:{
        width: '100%',
        minWidth: '160px',
        maxWidth: '240px',
    },
    carDeerImg:{
        width: '100%',
    },
    lineDiv:{
        
        width: '100%',
        height: '3em',
        marginTop: '3em',
        marginBottom: '3%',
    },
    detailBox:{
        backgroundColor: 'white',
        marginLeft: '3%',
        width: '94%',
        marginBottom: '5%',
        borderRadius: '13px',
    },
    deerListText:{
        fontFamily: 'AppleSB',
    },
    detailBtn: {
        fontFamily: 'AppleSB',
        fontSize: '1em',
        color: 'white',
        backgroundColor: '#014D81',
        borderRadius: '3em',
        width: '40%',
        marginLeft: '30%',
        marginTop: '5%',
        marginBottom: '20%',
    },
    detailPic:{
        marginTop: '13%',
    },
    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
        // 작업 확인용 배경 (추후 삭제)
        // backgroundImage:`url(${paperBg})`,
        // backgroundRepeat:'no-repeat', 
        // backgroundSize: 'cover', 
      },
    headerText: {
        width: '90%',
        marginLeft: '5%',
        fontSize: 9,
        fontFamily: 'AppleUL',
        lineHeight: 1.5,
        marginBottom: '5%',
      },
      headerTextBold: {
        marginTop: '5%',
        width: '90%',
        marginLeft: '5%',
        fontSize: 12,
        fontFamily: 'AppleSB',
        lineHeight: 1.5,
      },
  }));

function Product (props) {
    ; // 상단으로 화면 scroll 올려주기
// 통신 받은거
  const [product, setProduct] = useState({});
  const [photos, setPhotos] = useState([]);
  const [mainPhotos,setMainPhotos] = useState([]);
  const [deers, setDeers] = useState([]);
  const [productSize,setProducSize] =useState([]);
  const [productColor,setProducColor] =useState([]);
  const [values,setValues] =useState({color:"",size:"",quantity:0,total_amount:0})
  const [buttonColor, setButtonColor] = useState('#014D81');

  // LoadMore
//   const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(1);
  const showMoreItems = () => {
    setVisible((preValue) => preValue + 3);
  };

  const classes = useStyles();
 
  useEffect(() => {
    console.log(sessionStorage.getItem('user_id'))
    getProductInfo(props.match.params.id)
  }, []);

  const carouselTop ={
    dots: true,
    arrows:false,
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    pauseOnHover: false,
    autoplay: true,
    autoplaySpeed: 2750,
    className:"prod",
    appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
    }
    };
  

  const carouselMiddle ={
    dots: true,
    className: "prod_deer",
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    // slidesToScroll: 1
    appendDots: dots => {
        return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
    }
  }

   const getProductInfo = async (id) => {
    await product_api
      .getProduct(id)
      .then((result) => {
        console.log(result.data);
        setProduct(result.data);
        setPhotos(result.data.photo);
        setDeers(result.data.deer_products)
        setProducColor(result.data.color)
        setProducSize(result.data.size)
        let main = []
        result.data.photo.map((photo) => {
            if(photo.is_main){
                main.push(photo)
            }
        })
        setMainPhotos(main)
        console.log(result.data.deer_products)
      })
      .catch((err) => console.log(err));
    };

    const payment = async () => {
        if(sessionStorage.getItem("user_id")) {
            //console.log("fd", sessionStorage.getItem("user_id"));
        if( values.size !== "" && values.color !== "" && values.quantity > 0 && values.total_amount > 0){
            await payment_api.createCartItem({
                size: values.size,
                color: values.color,
                quantity: values.quantity,
                total_amount: values.total_amount,
                user_id: sessionStorage.getItem("user_id"),
                product_id: props.match.params.id
            }).then(res =>{
                let arr = [res.data.id]
                payment_api.createOrder({"user_id":sessionStorage.getItem("user_id"),"cart_id":arr,'total_amount':values.total_amount})
                .then(res =>{
                props.history.push(`/payment/${res.data.id}`);
                }).catch(e=>console.log(e))                
            }).catch(e=>console.log(e))
        }
        else{
            alert("누락된 정보가 있습니다!")
        }
        
        
        } else {
            alert("로그인을 해주세요!")
            props.history.push("/login");
        }
    }

    const addToCart = async () => {
        // add to cart api
        
        if(sessionStorage.getItem("user_id")) {
            //console.log("fd", sessionStorage.getItem("user_id"));

            if( values.size !== "" && values.color !== "" && values.quantity > 0 && values.total_amount > 0){
                await payment_api.createCartItem({
                    size: values.size,
                    color: values.color,
                    quantity: values.quantity,
                    total_amount: values.total_amount,
                    user_id: sessionStorage.getItem("user_id"),
                    product_id: props.match.params.id
                }) 
                props.history.push("/cart");
            }
            else{
                alert("누락된 정보가 있습니다!")
            }
        } else {
            alert("로그인을 해주세요!")
            props.history.push("/login");
        }
    }

    const handleChange= (e)=> {
        const {name, value} = e.target
        setValues({ ...values, [name]: value })
        if(name === "quantity"){
            let total = value*product.price
            setValues({ ...values,[name]: value,total_amount: total })
        }
        console.log(values)
    }
  
  return (
    <div className={classes.mob} >
        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '15%'}}>
        <Slider {...carouselTop}>
            {mainPhotos.map((photo) => (
                <div>
                    <img src={photo.img} className={classes.carouselImg} key={photo.id} />
                </div>
            ))}
        </Slider>
        </div>
        
        <br/><br/>
        <div className={classes.productName}>
            {product.name}
        </div>

        <div className={classes.detailBox}>
            <TableContainer>
                <Table className={classes.table} aria-label="customized table" >
                    <TableBody>
                        <TableRow>
                            <TableCell className={classes.leftCell} >Color</TableCell>
                            <TableCell align="right" className={classes.rightCell}>
                            <select  name = "color" value = {values.color} onChange = {handleChange} >
                            <option></option>
                            {
                                productColor.map((pro)=>{
                                    return(<option value ={pro.color}>{pro.color}</option>)
                            })
                            } 
                            </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.leftCell} >Size</TableCell>
                            <TableCell align="right" className={classes.rightCell}>
                            <select name = "size" value = {values.size} onChange={handleChange}>
                            <option></option>
                            {
                                productSize.map((pro)=>{
                                    return(<option value= {pro.size}>{pro.size}</option>)
                            })}
                            </select>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.leftCell}>Quantity</TableCell>
                            <TableCell align="right" className={classes.rightCell}>
                                수량: &nbsp;<input type="number" min="1" name = "quantity" placeholder="1" value = {values.quantity} 
                                onChange = {handleChange} className={classes.quan}></input>
                            </TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
                <div className={classes.price} name='total_amount'>
                    Total : {values.total_amount} won
                </div>
            </TableContainer>
        </div>
        <div className={classes.buttonWrap}>
            <Button variant="contained" className={classes.buttonBaro} style={{backgroundColor:`${buttonColor}`}}

                onClick={payment}
            >
            <Typography className={classes.buttonBaroText}>바로 구매하기</Typography>
            </Button>
            <Button variant="contained" className={classes.button} style={{backgroundColor:`${buttonColor}`}}
                onClick={addToCart}
            >
            <img src={cart} fontSize="large" className={classes.buttonIcon}/> 
            Add to Cart
            </Button>
        </div>
        <div>
            <div className={classes.lineDiv}> </div>
            <Typography className={classes.deerListText}>
                <img src={logo} className={classes.logo} />
                해당 상품을 판매중인 사슴들이 있습니다.
            </Typography>
            <br/>
            <Slider {...carouselMiddle}>
                {deers.map((elem) => (
                    <div className={classes.carouselImgDeer} key={elem.id}>
                        <Button component={Link} 
                        to={`/shop/indiv/${elem.id}`} className={classes.carDeerBtn}>
                            <img src={elem.deer_photo[0].img} className={classes.carDeerImg} />
                        </Button>
                    </div>
                ))} 
            </Slider>
            
            {/* 상품 설명 */}
        
            <div className={classes.detailPic} style={{textAlign:'center'}}>
                  {photos.slice(0, visible).map((photo) => (
                    <div key={photo.id}>
                    <img src={photo.img} style={{width: '100%', marginBottom: '3%'}} />
                    </div>
                ))}
            </div>
            <Button className={classes.detailBtn}
                onClick = {showMoreItems} >
                상세 사진 더보기
            </Button>
            <div className={classes.headerTextBold}><br/>배송기간</div>
            <div className={classes.headerText}>
            &nbsp; 결제확인 후 1~3일 정도 소요됩니다. (예약상품, 해외배송 상품은 배송기간이 다를 수 있습니다.)
            </div>            
            <div className={classes.headerTextBold}>교환/환불 시 주의 사항</div>
            <div className={classes.headerText}>
            &nbsp; 상품 수령 후 7일 이내 교환/환불을 요청해야 합니다.
            <br/>&nbsp; 반품 주소지는 서울특별시 성북구 정릉로 77 창업보육센터 111호입니다.
            </div>
            <div className={classes.headerTextBold}>교환/환불이 불가능한 경우</div>
            <div className={classes.headerText}>
            &nbsp; -사용 흔적이 있거나 훼손, 오염된 경우
            <br/>&nbsp; -상품의 택(Tag)을 분실, 훼손한 경우
            <br/>&nbsp; -사은품을 사용, 분실한 경우
            <br/>&nbsp; -제품개봉 후 가치가 현저히 감소한 경우 추가
            </div>
            
        </div>
        

    </div>
  );
}

export default Product;