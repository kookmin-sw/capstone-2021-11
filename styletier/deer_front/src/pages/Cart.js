//import payment_api from "../api/PaymentAPI";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, FormControlLabel, Checkbox, Paper} from '@material-ui/core';
import { makeStyles, rgbToHex } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import payment_api from "../api/PaymentAPI";

import CartItem from "../components/cart/CartItem";

//image
import barcode from "../static/barcode.png";
import logo from "../static/logoblack.png";
import logoText from "../static/logotext.png";
import logo_white from "../static/logowhite.png";

import Media from 'react-media'
const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}

const useStyles = makeStyles((theme) => ({
    typo: {
      color: 'black',
      textAlign: 'center',
      marginTop: '-20%',
      fontSize: '120%'
  },
  progressCircle: {
    backgroundColor: '#0353c6',
    borderRadius: '50px',
    marginRight: '-50px'
  },
  progressCircle2: {
    backgroundColor: 'white',
    borderRadius: '50px',
    marginRight: '-50px'
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "500px",
    backgroundColor: "#232321",
    color: "black",
  },
  grid: {
      paddingBottom : theme.spacing(5),
  },
  paySortButton: {
      width: "250px",
      height: "90px",
      borderRadius:"30px",
      fontSize: "27px",
  },
  submit: {
      width: "800px",
      height: "70px",
      borderRadius:"15px",
      fontSize: "40px",
      marginTop: "150px"
  },
  progressBar: {
    width:"100%",
    bottom:'50px',
    display:"inline-flex", 
    zIndex:2, 
    position:'relative',
  },
  progressButton: {
      display: "none"
  },
  progressCircle: {
      backgroundColor: '#0353c6',
      borderRadius: '50px',
      // marginRight: '310px',
      border:'2px solid white', 
      width: '27px', 
      height: '27px', 
      // marginLeft: '-20px', 
      position:'relative', 
      bottom: 3.5,
  },

  zigzagtop: {
    background: 'linear-gradient(-45deg, #ffffff 16px, transparent 0), linear-gradient(45deg, #ffffff 16px, transparent 0)',
    // backgroundSize: '22px 32px',
    backgroundSize: '15px 28px',
    content: " ",
    display: 'block',
    height: '28px',
    // bottom: '64px',
    width: '100%',
    marginBottom: '-1%',
  },
  zigzagbot: {
    background: 'linear-gradient(-45deg, transparent 16px, #ffffff 0),linear-gradient(45deg, transparent 16px, #ffffff  0)',
    // background: 'linear-gradient(-45deg, #ffffff 16px, transparent 0), linear-gradient(45deg, #ffffff 16px, transparent 0)',
    backgroundSize: '15px 28px',
    content: " ",
    display: 'block',
    height: '28px',
    width: '100%',
    // bottom: '64px',
  },
  cart: {
      flexGrow: 1,
      backgroundColor: "#eeeff1",
      padding: 30,
      borderStyle: 'dotted none',
      background: 'linear-gradient(white 0%, transparent 0%), linear-gradient(135deg, #272220 33.33%, transparent 33.33%) 0 0%, #272220 linear-gradient(45deg, #272220 33.33%, white 33.33%) 0 0% -webkit-linear-gradient(white 0%, transparent 0%), -webkit-linear-gradient(135deg, #d9d9d9 33.33%, transparent 33.33%) 0 0%, #d9d9d9 -webkit-linear-gradient(45deg, #d9d9d9 33.33%, white 33.33%) 0 0% -o-linear-gradient(white 0%, transparent 0%), -o-linear-gradient(135deg, #272220 33.33%, transparent 33.33%) 0 0%, #272220 -o-linear-gradient(45deg, #272220 33.33%, white 33.33%) 0 0% -moz-linear-gradient(white 0%, transparent 0%), -moz-linear-gradient(135deg, #272220 33.33%, transparent 33.33%) 0 0%, #272220 -moz-linear-gradient(45deg, #272220 33.33%, white 33.33%) 0 0% -ms-linear-gradient(white 0%, transparent 0%), -ms-linear-gradient(135deg, #272220 33.33%, transparent 33.33%) 0 0%, #272220 -ms-linear-gradient(45deg, #272220 33.33%, white 33.33%) 0 0%',
      backgroundRepeat: 'repeat-x',
      backgroundSize: '0px 47%, 14px 41px, 14px 42px'
    },
  line: {
      align: 'center',
      border: 'solid 1px',
      width: '90%',
      color: '#707070',
      marginTop: '0%'
    },  
  line2: {
    align: 'center',
    border: 'solid 1px',
    width: '80%',
    color: '#707070',
    marginTop: '-3%'
  },
  ssasummuri: {
    color: 'black',
    textAlign: 'center',
    fontSize: '30px',
  },
  ssasummuriunder: {
    color: 'black',
    textAlign: 'center',
    fontSize: '10px',
    marginTop: '-10px',
    marginBottom: '-10px',
    fontFamily: 'AppleSB',
    letterSpacing: '-0.5px',
    color: '#5E5C5C',
  },
  receipt: {
    color: 'black',
    textAlign: 'center',
    fontSize: '25px',
    letterSpacing: '3px',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: '2%',
    fontFamily: 'AppleSB',
    letterSpacing: '-0.5px',
    color: '#3A3838',
    marginTop: '3%',
    marginBottom: '3%',
},
  receipt_botText:{
    fontFamily: 'AppleSB',
    textAlign: 'center',
    fontSize: '7px',
    marginTop: '-5%',
    
  },
  cashier: {
    color: 'black',
    textAlign: 'left',
    fontSize: '15px',
    paddingLeft: '10%',
    marginBottom: '3%',
  },
  // positionbutton: {
  //   float: 'right',
  //   marginRight: '4.15em'
  // },
  barcode: {
    display: 'block',
    margin: 'auto',
    width: '50%',
    marginBottom: '8%',
  },
  circle: {
    textAlign: 'center',
    width: '20px',
    height: '20px',
    backgroundColor: '#0353C6',
    borderRadius: '50px',
    display: 'inline-block',
    marginTop: '-0.3%',
    verticalAlign: 'middle',
    marginLeft: '30%'
  },
  progressText:{
    color: 'white',
    fontFamily: 'AppleUL',
    fontSize: '80%',
    width: '100%',
    bottom:'20px', 
    display:"inline-flex", 
    position:'relative',
    marginBottom: '1%',
  },
  itemCnt:{
    fontFamily: 'AppleSB',
    fontSize: '15px',
    float: 'left',
  },
  orderInfo:{
    display: 'inline-block',
    fontFamily: 'AppleSB',
    fontSize: '12px',
  },
  mob:{
      position: 'relative',
      minWidth: '320px',
      maxWidth: '480px',
      width: '100%',
      margin: 'auto',
      overflow: 'hidden',
      backgroundColor: "#232321",
  },
  paymentinfo: {
      backgroundColor: 'white'
  },
  logo:{
    width: '13%',
    opacity: '58%',
  },
  logoText:{
    width: '13%'
  },
  subimg :{
    width: '16%',
    marginRight: '5%',
  },
  subText: {
      fontFamily: 'AppleSB',
      color:'white',
      fontSize: '17px',
  },
  positionbutton: {
    width: "238px",
    // height: "70px",
    borderRadius:"15px",
    marginTop: "10%",
    backgroundColor: '#0353C6',
    '&:hover':{
        backgroundColor: "#0062EF",
    },
    marginBottom: '20%',
    marginLeft: '20%',
  },
  }));

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();

function Cart (props) {
  const classes = useStyles();
  const [items, setItems] = useState([]);

const [checkedItems, setCheckedItems] = useState(new Set());
const [amount,setAmount] = useState(0);

const checkedItemHandler = (id,isChecked,quantity,price) => {
    if (isChecked) {
      checkedItems.add(id);
      setCheckedItems(checkedItems);
      setAmount(amount + (quantity*price))
    } else if (!isChecked && checkedItems.has(id)) {
      checkedItems.delete(id);
      setCheckedItems(checkedItems);
      setAmount(amount - (quantity*price))
    }
    console.log(checkedItems);
    console.log(amount)
};

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    console.log('get cart items')
    if(sessionStorage.getItem("user_id")) {
        await payment_api.getUserCartItems(sessionStorage.getItem("user_id"))
            .then(res => {
                console.log('data : ', res.data);
                setItems(res.data);
            }).catch(e => console.log(e));
      } else {
          alert('세션이 존재하지 않습니다. 로그인 해주세요')
          props.history.push(`/login`);
      }
  }

  const onPayment = async () => {
    console.log(Array.from(checkedItems));
    let Items = Array.from(checkedItems)

    await payment_api.createOrder({"user_id":sessionStorage.getItem("user_id"),"cart_id":Items,'total_amount':amount})
    .then(res =>{
      props.history.push(`/payment/${res.data.id}`);
      window.scrollTo(0, 0);  
    }).catch(e=>console.log(e))
  }


  return (
    <div className={classes.mob}>
        <Container className={classes.root}>
          <div style={{margin: '35% 5% 0% 5%'}}>
            
            <Media queries={MEDIA_QUERIES}>
            {matches => {
              return(
                <>
                {matches.pc &&
                  <div style={{marginLeft: '5%'}}>
                  <Grid className={classes.progressText}>
                      <Grid style={{marginLeft: '-1%'}}>장바구니</Grid>
                      <Grid style={{marginLeft: '34%'}}>결제</Grid>
                      <Grid style={{marginLeft: '35%'}}>결제완료</Grid>
                  </Grid>
                  <hr style={{bottom:'15px',width:"330px", border: 'solid 3px', color:"white", zIndex:1, position:'relative', opacity: .63}}></hr>
                  <hr style={{right:'10px', bottom:'35.5px',width:"0px", border: 'solid 2px', color:"#0353c6", zIndex:1, position:'relative'}}></hr>
                  <Grid item xs={12} className={classes.progressBar} style={{bottom:64,}}>
                      <div className={classes.progressCircle} style={{}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%', backgroundColor: 'white',}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%', backgroundColor: 'white',}}></div>
                  </Grid>
                  </div>
                }
                {matches.mob &&
                  <div>
                    <Grid className={classes.progressText}>
                        <Grid style={{marginLeft: '-2%'}}>장바구니</Grid>
                        <Grid style={{marginLeft: '33%'}}>결제</Grid>
                        <Grid style={{marginLeft: '33%'}}>결제완료</Grid>
                    </Grid>
                    <hr style={{bottom:'15px',width:"300px", border: 'solid 3px', color:"#0353c6", zIndex:1, position:'relative', opacity: .63}}></hr>
                    <hr style={{right:'10px', bottom:'35.5px',width:"0px", border: 'solid 2px', color:"#0353c6", zIndex:1, position:'relative'}}></hr>
                    <Grid item xs={12} className={classes.progressBar} style={{bottom:64,}}>
                      <div className={classes.progressCircle} style={{}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%', backgroundColor: 'white',}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%', backgroundColor: 'white',}}></div>
                    </Grid>
                  </div>
                }
                </>
              )
            }}
            </Media>
            
          </div>
          <Paper className={classes.paper} elevation={0}>
              <div className={classes.zigzagtop}></div>
              <div className={classes.paymentinfo}>
                  <Media queries={MEDIA_QUERIES}>
                    {matches => {
                      return(
                        <>
                        {matches.pc &&
                        <div>
                          <div className={classes.ssasummuri}>
                            <img src={logo} className={classes.logo}/>
                            <div style={{marginTop: '-5%'}}></div>
                            <img src={logoText} className={classes.logoText}/>
                            <hr className={classes.line2}></hr>
                          </div>
                        <div style={{marginLeft: '8%', marginTop: '-2%'}}>
                          <div className={classes.circle}></div>
                          <div className={classes.receipt}>
                            RECEIPT
                          </div>
                          <div className={classes.receipt_botText} style={{marginLeft: '-5%'}}>
                            you are almost ready to pay
                          </div>
                          <br />
                          <div className={classes.cashier}>
                              <h3 style={{fontSize: '8px', display: 'inline-block', fontFamily: 'AppleSB'}}>cashier. #1</h3>
                              <h3 style={{fontSize: '8px', display: 'inline-block', marginLeft: '115px', fontFamily: 'AppleSB'}}>{'0'+month}/{day}/{year}</h3>
                              <h3 style={{fontSize: '8px', display: 'inline-block', marginLeft: '45px', fontFamily: 'AppleSB'}}>{hour}:{minute}</h3>   
                          </div>
                        </div>
                        </div>
                        }
                        {matches.mob &&
                        <div>
                        <div className={classes.ssasummuri}>
                            <img src={logo} className={classes.logo}/>
                            <div style={{marginTop: '-7.5%'}}></div>
                            <img src={logoText} className={classes.logoText}/>
                            <hr className={classes.line2}></hr>
                        </div>
                        <div >
                          <div className={classes.circle} style={{marginLeft: '33%', marginTop: '-2%'}}></div>
                          <div className={classes.receipt}>
                            RECEIPT
                          </div>
                          <div className={classes.receipt_botText} style={{marginLeft: '3%'}}>
                            you are almost ready to pay
                          </div>
                          <br />
                          <div className={classes.cashier}>
                              <h3 style={{fontSize: '8px', display: 'inline-block', fontFamily: 'AppleSB'}}>cashier. #1</h3>
                              <h3 style={{fontSize: '8px', display: 'inline-block', marginLeft: '115px', fontFamily: 'AppleSB'}}>{'0'+month}/{day}/{year}</h3>
                              <h3 style={{fontSize: '8px', display: 'inline-block', marginLeft: '45px', fontFamily: 'AppleSB'}}>{hour}:{minute}</h3>   
                          </div>
                      </div>
                      </div>
                        }
                        </>
                      )
                    }}
                    </Media>

                      <hr className={classes.line}></hr>

                      {/* <div style={{margin: 'auto', width: 300, textAlign: 'center', marginBottom: '5%', marginTop: '5%'}}>
                          {products.map((item,idx)=>(
                            <div>
                              <Typography className={classes.itemCnt}>item: {idx + 1}</Typography><br/>
                              <OrderItem item = {item} key ={idx} img = {item.product_photo[0].img}/>
                            </div>
                          ))}
                      </div> */}
                       <Media queries={MEDIA_QUERIES}>
                    {matches => {
                      return(
                        <>
                        {matches.pc &&
                        <div style={{margin: 'auto', width: 350, textAlign: 'center', marginBottom: '5%', marginTop: '5%'}}>
                        {items.map((item, idx) => (
                          <div>
                            <Typography className={classes.itemCnt}>item. {idx + 1}</Typography><br/>
                            <CartItem item={item} key={item.id} img={item.photo[0].img} checkedItemHandler={checkedItemHandler} style={{textAlign: 'center'}}/>
                          </div>
                        ))}
                        </div>
                        }
                        {matches.mob &&
                        <div style={{margin: 'auto', width: 300, textAlign: 'center', marginBottom: '5%', marginTop: '5%'}}>
                        {items.map((item, idx) => (
                          <div>
                            <Typography className={classes.itemCnt}>item. {idx + 1}</Typography>
                            <CartItem item={item} key={item.id} img={item.photo[0].img} checkedItemHandler={checkedItemHandler} style={{textAlign: 'center'}}/>
                          </div>
                        ))}
                        </div>
                        }
                        </>
                      )
                    }}
                    </Media>

                      <br />
                      <img src={barcode} className={classes.barcode} />
              </div>
            <div className={classes.zigzagbot}></div>
          </Paper>
          <Button className={classes.positionbutton} variant="contained" color="Primary" onClick={onPayment}>
          <img src={logo_white} className={classes.subimg}/>
          <Typography className={classes.subText}>바로 결제</Typography>
          </Button>

        </Container>
    </div>
  );
}


export default Cart;