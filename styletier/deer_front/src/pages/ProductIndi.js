import product_indi_api from "../api/ProductIndiAPI";
import product_api from "../api/ProductAPI";
import payment_api from "../api/PaymentAPI";
import user_api from "../api/UserAPI";
import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Paper, Button } from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import Slider from "react-slick";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";

import { Media, Player } from "react-media-player";
//const { PlayPause, MuteUnmute } = controls
import cart from "../static/cart.png";

// SNS icons
import facebookPng from "../static/snsFacebook.png";
import instaPng from "../static/snsInsta.png";
import youtubePng from "../static/snsYoutube.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: "22px",
  },
  button: {
    color: "white",
    marginTop: "30px",
    width: "35%",
    padding: "0.5em",
    borderRadius: "10px",
    fontSize: "1em",
    fontFamily: "AppleUL",
    fontWeight: 100,
    justifyContent: "space-around",
    textTransform: "none",
  },
  buttonBaro: {
    color: "white",
    marginTop: "30px",
    width: "35%",
    padding: "0.5em",
    borderRadius: "10px",
    fontSize: "1em",
    fontFamily: "AppleUL",
    fontWeight: 100,
    marginRight: "5%",
  },
  buttonWrap: {
    textAlign: "right",
    // marginRight: '3%',
  },
  buttonIcon: {
    // height:'50px',
    // paddingLeft:'30px',
    // paddingRight:'20px',
    width: "30%",
  },
  media: {
    height: 140,
  },
  table: {
    borderCollapse: "unset",
    borderSpacing: "5px 13px",
    width: "85%",
    margin: "auto",
    marginTop: "8%",
  },
  productName: {
    fontSize: 30,
    margin: "30px auto",
    marginTop: "40px",
    textAlign: "center",
    position: "relative",
    fontWeight: 100,
    fontFamily: "AppleUL",
  },
  leftCell: {
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderBottomWidth: "0px",
    width: "40%",
    fontFamily: "AppleUL",
  },
  rightCell: {
    borderBottomColor: "grey",
    borderBottomWidth: "1.5px",
    fontFamily: "AppleUL",
  },
  quan: {
    width: "30%",
  },
  price: {
    color: "black",
    fontSize: "1em",
    float: "right",
    marginRight: "10%",
    marginBottom: "5%",
    marginTop: "7%",
    fontFamily: "AppleUL",
    fontWeight: 100,
  },
  mob: {
    position: "relative",
    minWidth: "320px",
    maxWidth: "480px",
    width: "100%",
    margin: "auto",
    marginTop: "100px",
  },
  item: {
    width: "100%",
    height: "100%",
    padding: "10px",
  },
  detailBtn: {
    fontFamily: "AppleSB",
    fontSize: "1.2em",
    color: "white",
    backgroundColor: "#014D81",
    borderRadius: "3em",
    width: "40%",
    marginLeft: "30%",
    marginTop: "5%",
    marginBottom: "5%",
  },
  sellerPhoto: {
    minHeight: "300px",
    marginTop: '40px',
    boxShadow: "2px -29px 19px -15px #014D81",
  },
  sellerName: {
    paddingTop: "30px",
    display: "flex",
    justifyContent: "flex-end",
    fontFamily: 'AppleSB',
    marginRight: '5%',
  },
  weightHeight: {},
  sellerSNS: {},
}));

function ProductIndi(props) {
  const [productIndi, setProductIndi] = useState({});
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [deerImages, setDeerImages] = useState([]);
  const [deerProductImage, setDeerProductImage] = useState([]);
  const [productSize, setProducSize] = useState([]);
  const [productColor, setProducColor] = useState([]);
  const [values, setValues] = useState({
    color: "",
    size: "",
    quantity: 0,
    total_amount: 0,
  });
  const classes = useStyles();
  const [buttonColor, setButtonColor] = useState("#014D81");

  const [seller, setSeller] = useState({});

  // LoadMore
  const [visible, setVisible] = useState(1);
  const showMoreItems = () => {
    setVisible((preValue) => preValue + 3);
  };

  useEffect(() => {
    getProductIndiInfo(props.match.params.id);
  }, []);

  // carousel setting
  // const settings = {
  //   className: "center",
  //   dots: true,
  //   arrows: false,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   fade: true,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   appendDots: (dots) => {
  //     return <MagicSliderDots dots={dots} numDotsToShow={3} dotWidth={30} />;
  //   },
  // };
  const settings ={
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
  // 사슴과 상품 관계 데이터 가져오기
  const getProductIndiInfo = async (id) => {
    await product_indi_api
      .getProductIndi(id)
      .then((result) => {
        console.log("deerproduct", result.data);
        setProductIndi(result.data);
        setImages(result.data.product_photo);
        setDeerImages(result.data.deer_photo);
        setDeerProductImage(result.data.deerproduct_photo);

        user_api
          .getDeer(result.data.user_id)
          .then((res) => {
            const { data } = res;
            user_api.getUser(data.user_id).then((res) => {
              const { data } = res;
              console.log(data);
              setSeller(data);
            });
          })
          .catch((error) => console.log(error));
        // 상품 id를 가지고 상품 데이터 가져오기 호출
        // getProductInfo(result.data.product_id)
        return result.data.product_id;
      })
      .then((id) => {
        product_api
          .getProduct(id)
          .then((result) => {
            console.log("product", result.data);
            setProducColor(result.data.color);
            setProducSize(result.data.size);
            setProduct(result.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    if (name === "quantity") {
      let total = value * product.price;
      setValues({ ...values, [name]: value, total_amount: total });
    }
    console.log(values);
  };

  // Add to cart api
  const addToCart = async () => {
    if (sessionStorage.getItem("user_id")) {
      //console.log("fd", sessionStorage.getItem("user_id"));
      if( values.size !== "" && values.color !== "" && values.quantity > 0 && values.total_amount > 0){
        
        await payment_api
        .createCartItem({
          size: values.size,
          color: values.color,
          quantity: values.quantity,
          total_amount: values.total_amount,
          user_id: sessionStorage.getItem("user_id"),
          product_id: props.match.params.id,
        })
        .then((res) => {
          console.log("데이터", res.data);
        })
        .catch((err) => console.log("에러?", err.response));
      props.history.push("/cart");
      }else{
        alert("누락된 정보가 있습니다!")
      }
    } else {
      alert("로그인을 해주세요!");
      props.history.push("/login");
    }
  };

  const payment = async () => {
    if (sessionStorage.getItem("user_id")) {
      //console.log("fd", sessionStorage.getItem("user_id"));
      if( values.size !== "" && values.color !== "" && values.quantity > 0 && values.total_amount > 0){
        await payment_api
        .createCartItem({
          size: values.size,
          color: values.color,
          quantity: values.quantity,
          total_amount: values.total_amount,
          user_id: sessionStorage.getItem("user_id"),
          product_id: product.id,
        })
        .then((res) => {
          let arr = [res.data.id];
          payment_api
            .createOrder({
              user_id: sessionStorage.getItem("user_id"),
              cart_id: arr,
              total_amount: values.total_amount,
            })
            .then((res) => {
              props.history.push(`/payment/${res.data.id}`);
            })
            .catch((e) => console.log(e));
        })
        .catch((e) => console.log(e));
      }
      else{
        alert("누락된 정보가 있습니다!")
      }     
    } else {
      alert("로그인을 해주세요!");
      props.history.push("/login");
    }
  };

  return (
    <div className={classes.mob}>
      <Container maxWidth="lg" className={classes.root}>
        <div>
          {/* 상품 사진 */}

        <div style={{marginLeft: '10%', marginRight: '10%', marginTop: '13%'}}>
          <Slider {...settings}>
            {images.map((img) => {
              if (!img.is_main) {
                return (
                  <div className={classes.item}>
                    <img src={img.img} style={{ width: "100%" }} alt="" />
                  </div>
                );
              }
            })}
          </Slider>
          </div>

          {/* /상품 사진 */}
          <div className={classes.productName}>{product.name}</div>
          {/* Table */}
          <Paper className={classes.paper}>
            <TableContainer>
              <Table className={classes.table} aria-label="customized table">
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.leftCell}>Color</TableCell>
                    <TableCell align="right" className={classes.rightCell}>
                      <select
                        name="color"
                        value={values.color}
                        onChange={handleChange}
                      >
                        <option></option>
                        {productColor.map((pro) => (
                          <option value={pro.color}>{pro.color}</option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.leftCell}>Size</TableCell>
                    <TableCell align="right" className={classes.rightCell}>
                      <select
                        name="size"
                        value={values.size}
                        onChange={handleChange}
                      >
                        <option></option>
                        {productSize.map((pro) => (
                          <option value={pro.size}>{pro.size}</option>
                        ))}
                      </select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.leftCell}>Quantity</TableCell>
                    <TableCell align="right" className={classes.rightCell}>
                      수량: &nbsp;
                      <input
                        type="number"
                        name="quantity"
                        min="1"
                        value={values.quantity}
                        onChange={handleChange}
                        className={classes.quan}
                      ></input>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className={classes.price} name="total_amount">
                Total : {values.total_amount} won
              </div>
            </TableContainer>
          </Paper>
          {/* /Table */}
          <div className={classes.buttonWrap}>
            <Button
              variant="contained"
              className={classes.buttonBaro}
              style={{ backgroundColor: `${buttonColor}` }}
              onClick={payment}
            >
              바로 구매하기
            </Button>

            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              style={{ backgroundColor: `${buttonColor}` }}
              onClick={addToCart}
            >
              <img src={cart} className={classes.buttonIcon} /> add to cart
            </Button>
          </div>
          <br />
          <br />
          {/* 셀러 포토 */}
          <div className={classes.sellerPhoto}>
            <p className={classes.sellerName} >판매 중인 셀러_{seller.name}</p>
            {deerImages.map((img) => (
              <div className={classes.item}>
                <img
                  src={img.img}
                  style={{
                    width: "100%",
                    boxShadow: "8px 8px 6px rgba(1, 77, 129, 0.41)",
                    paddingTop: "10px",
                  }}
                  alt=""
                ></img>
                <span className={classes.weightHeight}></span>
                <div className={classes.sellerSNS}>
                  {/* <a href={seller.deeruser.instagram_url} target="blank">
                    <img
                      className={classes.snsFacebook}
                      src={facebookPng}
                      alt=""
                    ></img>
                  </a>
                  <a href={seller.deeruser.youtubeCh_url} target="blank">
                    <img
                      className={classes.snsYoutube}
                      src={youtubePng}
                      alt=""
                    ></img>
                  </a>
                  <a href={seller.deeruser.facebook_url} target="blank">
                    <img
                      className={classes.snsInsta}
                      src={instaPng}
                      alt=""
                    ></img>
                  </a> */


                  // await 가 필요해 보임
                  }
                </div>
              </div>
            ))}
          </div>
          {/* /셀러 포토 */}
          <br />
          {/* 셀러 착용 샷 */}
          <div>
            <Typography
              variant="h5"
              gutterBottom
              style={{ fontFamily: "AppleSB" }}
            >
              셀러 착용 샷
            </Typography>
            <OwlCarousel className="owl-theme" items={2} margin={35}>
              {deerProductImage.map((img) => (
                <div className={classes.item}>
                  <img src={img.img} alt="The Last of us" />
                </div>
              ))}
            </OwlCarousel>
          </div>
          {/* /셀러 착용 샷 */}
        </div>
      </Container>
      <br />
      <br />

      {/* 유튜브 영상 */}

      <Paper className={classes.paper}>
        <Grid container justify="center" alignItems="center">
          <Media>
            <div className="media">
              <div className="media-player">
                <Player src={productIndi.youtube_url} />
              </div>
            </div>
          </Media>
        </Grid>
      </Paper>

      {/* /유튜브 영상 */}

      <br />
      <br />
      <div style={{ display: "grid", placeItems: "center" }}>
        {
          // images.slice(0, visible).map((img, idx) => (
          //   <img src={img.img} key={idx} style={{ width: "100%" }}></img>
          // ))
          deerProductImage.slice(0, visible).map((img) => (
            <img
              src={img.img}
              alt="The Last of us"
              style={{ marginBottom: "15px", width: "100%" }}
            />
          ))
        }
      </div>
      <Button className={classes.detailBtn} onClick={showMoreItems}>
        상세 설명 더보기
      </Button>
    </div>
  );
}

export default ProductIndi;
