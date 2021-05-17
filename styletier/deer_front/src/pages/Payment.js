import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, TextField, Modal} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import DaumPostcode from 'react-daum-postcode';

import payment_api from "../api/PaymentAPI";
import user_api from "../api/UserAPI";

import OrderItem from "../components/order/OrderItem";

import kakaoPay from "../static/kakaoPay.png";
import logo from "../static/logoblack.png";
import logoText from "../static/logotext.png";
import barcode from "../static/barcode.png";
import logo_white from "../static/logowhite.png";

import Media from 'react-media'
const MEDIA_QUERIES = {
    mob: '(max-width: 480px)',
    pc: '(min-width: 480px)'
  }
  

const useStyles = makeStyles((theme) => ({
    paySortButton: {
        fontSize: "0.9em",
        fontFamily: 'AppleSB',
        color: 'white',
        background: "#474747", 
        '&:hover':{
            backgroundColor: "#184FC4",
            color: "white",
        },
        // 카카오페이 주석으로 임시 주석된 코드
        // marginRight: "45px", 
        width:"30%", 
        height: 40, 
        borderRadius:"1.5em",
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
    },
    kakaoPayButton:{
        background: "#ffdf00", 
        '&:hover':{
            backgroundColor: "#ffdf00",
        },
        fontSize: '19px', 
        width:"30%", 
        height: 40, 
        color: "443731",
        borderRadius:"1.5em",
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)'
    },
    kakaoPayImg:{
        width: '50%',
    },
    btnGridOrderor:{
        marginLeft: '5%',
    },
    orderor:{
        marginLeft: '5%',
        marginTop: '3%',
    },
    orderorText:{
        fontFamily: 'AppleSB',
        fontSize: '1.0em',
        lineHeight: '150%',
    },
    btnOrderor:{
        background: "#858585", 
        color: 'white',
        '&:hover':{
            backgroundColor: "#475363",
            color: "white",
        },
        borderRadius: 10,
        fontFamily: 'AppleSB',
        fontSize: '0.8em',
        height: '100%',
        width: '50%',
        letterSpacing: '-1px'
    },
    modifyText:{
        fontFamily: 'AppleSB',
        fontSize: '1em',
        height: '50%',
        width: '50%',
    },
    helpTextNullError:{
        color: 'white',
        fontFamily: 'AppleSB',
        background: 'linear-gradient(to top, red 50%, transparent 50%)',
        width: '70%',
        marginBottom: '10%',
        marginLeft: '5%',
    },
    info:{
        fontFamily: 'AppleSB',
        width: '40%',
    },
    kakaoinfo:{
        fontFamily: 'AppleSB',
        width: '90%',
        fontSize: '75%',
    },
    tfOrderor:{ // textField Orderor
        marginBottom: '3%',
        width: '100%',
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "500px",
        backgroundColor: "#232321",
        color: "black",
    },
    submit: {
        width: "238px",
        borderRadius:"15px",
        marginTop: "10%",
        backgroundColor: '#0353C6',
        '&:hover':{
            backgroundColor: "#0062EF",
        },
        marginBottom: '20%',
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
        border:'2px solid white', 
        width: '27px', 
        height: '27px', 
        position:'relative', 
        bottom: 3.5,
    },

    zigzagtop: {
        background: 'linear-gradient(-45deg, #ffffff 16px, transparent 0), linear-gradient(45deg, #ffffff 16px, transparent 0)',
        backgroundSize: '15px 28px',
        content: " ",
        display: 'block',
        height: '28px',
        width: '100%',
        marginBottom: '-1%',
    },
    zigzagbot: {
        background: 'linear-gradient(-45deg, transparent 16px, #ffffff 0),linear-gradient(45deg, transparent 16px, #ffffff  0)',
        backgroundSize: '15px 28px',
        content: " ",
        display: 'block',
        height: '28px',
        width: '100%',
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
        textAlign: 'center',
        fontSize: '10px',
        marginTop: '-10px',
        marginBottom: '-10px',
        fontFamily: 'AppleSB',
        letterSpacing: '-0.5px',
        color: '#5E5C5C',
    },
    receipt: {
        textAlign: 'center',
        fontSize: '23px',
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '2%',
        fontFamily: 'AppleSB',
        letterSpacing: '-0.5px',
        color: '#3A3838',
        marginTop: '3%',
        marginBottom: '3%',
    },
    cashier: {
        color: 'black',
        textAlign: 'left',
        fontSize: '15px',
        paddingLeft: '10%',
        marginBottom: '3%',
    },
    positionbutton: {
        float: 'right',
        marginRight: '4.15em'
    },
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
        fontSize: '6px',
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
    form: {
        padding: '3% 5% 0% 5%',
    },
    receipt_botText:{
        fontFamily: 'AppleSB',
        textAlign: 'center',
        fontSize: '7px',
        marginTop: '-5%',
        
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
        backgroundColor: 'white',
    },
    logo:{
      width: '13%',
      opacity: '58%',
    },
    logoText:{
      width: '13%'
    },
  }));

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth()+1;
let day = today.getDate();
let hour = today.getHours();
let minute = today.getMinutes();

function Payment (props) {    
    const classes = useStyles();
    const [values, setValues] = useState({name: "",  email: "",quantity:"", phone_num:"", address:"", postal_code:"", zipCode:"", })
    const [order, setOrder] = useState({});
    const [products,setProducts] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [quantity,setQuantity] = useState(0);
    const [user,setUser] = useState({});
    const [pay,setPay] = useState("");
    const [show, setShow] = useState(true);
    const [print, setPrint] = useState(false);

    useEffect(() => {
        console.log(sessionStorage.getItem("token"))
        console.log(sessionStorage.getItem("user_id"))
        hasToken()
        authenticate()
        getOrderList(props.match.params.order_id)
    }, []);

    const getOrderList = async(id)=>{
        await payment_api.getOrder(id)
        .then(res =>{
            console.log(res.data);
            setOrder(res.data)
            let prod = res.data.orderproduct
            setProducts(prod)
            prod.map((item)=>(
            setQuantity(quantity+item.quantity)
            ))
        }).catch(err=>console.log(err))
    }
    const hasToken = () =>{
        if(sessionStorage.getItem("token")){
            console.log("성공")
        }else{
            alert("세션이 존재하지 않습니다. 로그인 해주세요'")
            props.history.push(`/login`);
        }
    }
    const authenticate = async()=>{
        await user_api.getUsers()
        .then(res=>{
            console.log('get_user', res.data)
            if(res.data.id != sessionStorage.getItem("user_id")){
                alert("인증되지 않은 회원입니다")
                props.history.push(`/`);
            }
            setUser(res.data)  
        })
        setValues({ ...values, name: user.name, phone_num: user.phone_num, email: user.email})
    }
    const itemNames =()=>{
        let names = ''
        products.map((item)=>{
            names =names +','+ item.product_name
        })
        console.log('이름들',names)
        return names;
    }

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    // onChange handle 

    const [ndata, setNameData] = useState(null);
    const [pdata, setPnData] = useState(null);
    const [edata, setEmailData] = useState(null);

    function getNameData(val) {
        setNameData(val.target.value)
        setPrint(false) // 이거 없어도 잘 돌아가긴 함..
        const { name, value } = val.target
        setValues({ ...values, [name]: value })
    }
    function getPhoneNumData(val) {
        setPnData(val.target.value)
        setPrint(false)
        const { name, value } = val.target
        setValues({ ...values, [name]: value })
    }
    function getEmailData(val) {
        setEmailData(val.target.value)
        setPrint(false)
        const { name, value } = val.target
        setValues({ ...values, [name]: value })
    }

    const nameNullError = Entered =>
        ndata == "" ? true : false
    
    const pnNullError = Entered =>
        pdata == "" ? true : false

    const emailNullError = Entered =>
        edata == "" ? true : false


    const handleSubmit = async (event) => {
        event.preventDefault();
        await payment_api.createAddress({
            "address_name": values.address,
            "zipcode": values.zipCode,
            "detail": values.addressDetail,
            "user_id": user.id
        }).then(result =>{
            console.log("주소",result.data)
            return(result.data.id)
        }).then(id=>{
             payment_api.createDelivery({
                "order_id": order.id,
                "address": id
           }).then(result=>{
               console.log("delivery",result.data)
           })            
        })
        if(pay ==='kakao-pay'){
        await payment_api.callKakaoPayment({
            'name': itemNames(),
            'user_id':user.id,
            'order_id':order.id,
            'quantity':quantity,
            'total_amount':order.total_amount
        }).then(result => {
            console.log(result);
            sessionStorage.setItem("tid",result.data.tid)
            console.log("tid",sessionStorage.getItem("tid"))
            window.open(result.data.next_redirect_pc_url, "KAKAO PAYMENT");
        });
        }else{
            props.history.push(`/cash/${order.id}`);
        }
    }

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = ''; 
        let zoneCodes = data.zonecode;

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        console.log('안녕',fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        setValues({ ...values, address: fullAddress, zipCode: zoneCodes})
        handleClose();
    }

    const handleKAKAO = (e) =>{
        let target = e.currentTarget
        setPay(e.currentTarget.value)
        target.style.background = '#b1cbf0'
        target.nextElementSibling.style.background = '#ffdf00'
        console.log("전체 주소",values)
    }
    const handleCash = (e) =>{
        let target = e.currentTarget	
        setPay(e.currentTarget.value)
        target.style.background = '#f2f1e6'
        // target.previousElementSibling.style.background = '#0353c6'
    }

    return (
    <div className={classes.mob}>
        <Container className={classes.root}>
        <div style={{margin: '15% 5% 0% 5%'}}>
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
                  <hr style={{bottom:'15px',width:"330px", border: 'solid 3px', zIndex:1, position:'relative', opacity: .63}}></hr>
                  <hr style={{right:'80px', bottom:'35px',width:"160px", border: 'solid 2px', marginTop: '-0.5%', color:"#0353c6", zIndex:1, position:'relative'}}></hr>
                  <Grid item xs={12} className={classes.progressBar} style={{bottom:64,}}>
                      <div className={classes.progressCircle} style={{}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%'}}></div>
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
                    <hr style={{bottom:'15px',width:"300px", border: 'solid 3px', zIndex:1, position:'relative', opacity: .63}}></hr>
                    <hr style={{right:'80px', bottom:'35px',width:"130px", border: 'solid 2px',  marginTop: '-0.5%',color:"#0353c6", zIndex:1, position:'relative'}}></hr>
                    <Grid item xs={12} className={classes.progressBar} style={{bottom:64,}}>
                      <div className={classes.progressCircle} style={{}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%'}}></div>
                      <div className={classes.progressCircle} style={{marginLeft: '37%', backgroundColor: 'white',}}></div>
                    </Grid>
                  </div>
                }
                </>
              )
            }}
            </Media>
            
          </div>

          <form onSubmit={handleSubmit} >

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
                            <img src={logo} className={classes.logo} alt=""/>
                            <div style={{marginTop: '-5%'}}></div>
                            <img src={logoText} className={classes.logoText} alt=""/>
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
                            <img src={logo} className={classes.logo} alt=""/>
                            <div style={{marginTop: '-7.5%'}}></div>
                            <img src={logoText} className={classes.logoText} alt=""/>
                            <hr className={classes.line2}></hr>
                        </div>
                        <div >
                          <div className={classes.circle} style={{marginLeft: '33%', marginTop: '-2%'}}></div>
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
                        </>
                      )
                    }}
                    </Media>

                <hr className={classes.line}></hr>
                <div style={{margin: 'auto', width: 300, textAlign: 'center', marginBottom: '5%', marginTop: '5%'}}>
                    {products.map((item,idx)=>(
                    <div>
                        <Typography className={classes.itemCnt}>item: {idx + 1}</Typography><br/>
                        <OrderItem item = {item} key ={idx} img = {item.product_photo[0].img}/>
                    </div>
                    ))}
                </div>

                <hr className={classes.line}></hr>
                      
                <div style={{margin:20, marginBottom:25, marginTop: 30}}>
                {console.log('test', order.total_amount)}
                {/* <div className={classes.orderInfo}>수량: </div> */}
                {/* <div className={classes.orderInfo} style={{marginLeft: '20%'}}>{order?order.orderproduct.length:null}개</div> <br/> */}
                {/* <div className={classes.orderInfo}>주소: </div> */}
                {/* <div className={classes.orderInfo} style={{marginLeft: '20%'}}>{order.deliveries.address_name}</div> <br/><br/> */}
                <div className={classes.orderInfo}>TOTAL AMOUNT</div> 
                <div className={classes.orderInfo} style={{float: 'right', fontSize: '15px'}}>₩ {order.total_amount}</div>
                <br/>
                <br/>
                </div>



                <hr className={classes.line}></hr>
                            <Grid container justify="center" spacing={2} className={classes.grid}>
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h6" className={classes.info} style={{marginLeft: "5%"}}>
                                        주문자 정보
                                    </Typography>
                                </Grid>
                                {
                                <Grid item xs={12} style={{marginLeft: '5%'}}>
                                <Grid item xs={12} className={classes.tfOrderor}>
                                    <TextField
                                        variant="outlined"
                                        label="name"
                                        name="name"
                                        onChange={getNameData}
                                        defaultValue={ndata == null ? user.name : ndata}
                                        required
                                        fullWidth
                                        autoFocus
                                        error={nameNullError("name")}
                                        helperText={nameNullError("name")?"이름을 입력해주세요.":null}
                                        style={{background: "white", width: '90%'}}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.tfOrderor}>
                                    <TextField
                                        variant="outlined"
                                        label="Phone Number"
                                        name="phone_num"
                                        defaultValue={pdata == null ? user.phone_num : pdata}
                                        onChange={getPhoneNumData}
                                        required
                                        fullWidth
                                        autoFocus
                                        error={pnNullError("phone_num")}
                                        helperText={pnNullError("phone_num")?"번호를 입력해주세요.":null}
                                        style={{background: "white", width:"90%"}}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} className={classes.tfOrderor}>
                                    <TextField
                                        variant="outlined"
                                        label="E-mail"
                                        name="email"
                                        defaultValue={edata == null ? user.email : edata}
                                        onChange={getEmailData}
                                        required
                                        fullWidth
                                        autoFocus
                                        error={emailNullError("email")}
                                        helperText={emailNullError("email")?"이메일을 입력해주세요.":null}
                                        style={{background: "white", width:"90%"}}
                                        size="small"
                                    />
                                </Grid>
                                </Grid>
                                }
                            
                                <Grid item xs={12} className={classes.btnGridOrderor}>
                                <Button className={classes.btnOrderor}
                                    onClick={() => setShow(!show)}
                                    disabled={
                                        show ? false
                                        : ndata =="" ||
                                        pdata =="" ||
                                        edata ==""  
                                        ? true : false
                                    }>
                                    {console.log('show',show)}
                                    {
                                        show ? "정보 수정하기" 
                                        : 
                                        <Typography className={classes.modifyText}
                                                onClick={() => setPrint(true)}>
                                            수정완료
                                        </Typography>
                                    }
                                </Button>
                                </Grid>
                                <Grid item xs={12}>
                                {
                                    show? null:
                                        ndata =="" ||
                                        pdata =="" ||
                                        edata ==""  
                                        ? <Typography className={classes.helpTextNullError}> * 모든 값을 입력해주세요.</Typography>
                                        : null
                                }
                                </Grid>



                                
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h6" className={classes.info} style={{marginLeft:"5%", marginTop: '2%'}}>
                                        배송지 주소
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        variant="outlined"
                                        label="우편번호"
                                        name="zipCode"
                                        value={values.zipCode}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        autoFocus
                                        disabled
                                        style={{background: "white", width:"105%", marginLeft:"20%"}}
                                        size="small"
                                        className={classes.formdetail}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <Button className={classes.btnOrderor}
                                        variant="contained"
                                        color="info"
                                        style={{width:"40%", marginLeft:"10%", height: '100%',}}
                                        onClick={handleOpen}
                                    >
                                        주소 검색
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="주소"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        autoFocus
                                        disabled
                                        style={{background: "white", width:"90%", marginLeft:"6%"}}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        label="상세 주소"
                                        name="addressDetail"
                                        value={values.addressDetail}
                                        onChange={handleChange}
                                        required
                                        fullWidth
                                        autoFocus
                                        style={{background: "white", width:"90%", marginLeft:"6%"}}
                                        size="small"
                                    />
                                </Grid>

                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="address-api"
                                    aria-describedby="address-api-modal"
                                >
                                    <DaumPostcode
                                        onComplete={handleComplete}
                                        { ...props }
                                    />
                                </Modal>
                                
                                <Grid item xs={12}>
                                    <Typography component="h1" variant="h6" className={classes.info} style={{marginLeft: "5%", marginTop: '2%',}}>
                                        결제 수단
                                    </Typography>
                                </Grid>
                                
                                {/* 카카오페이 주석으로 paySortButton 임시 수정*/}
                                <Button value="transfer" className={classes.paySortButton} onClick={handleCash}>
                                    무통장 입금
                                </Button>
                                
                                {/* kakaoPay 임시 주석 */}
                                {/* <Button value="kakao-pay" className={classes.kakaoPayButton} onClick = {handleKAKAO}>>
                                        <img src={kakaoPay} className={classes.kakaoPayImg} alt=""/>
                                </Button> */}
                                
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h6" className={classes.kakaoinfo} style={{marginLeft: "22%", marginTop: '10%', marginBottom: '-5%'}}>
                                    카카오페이는 사용에 대한 승인이 진행중이기때문에
                                    <br/>무통장입금으로 진행해주시기 바랍니다. 감사합니다.
                                </Typography>
                            </Grid>

                            <img style={{marginTop:'10%'}} src={barcode} className={classes.barcode} alt="" />
            </div>
              <div className={classes.zigzagbot}></div>
            
            <Button
                type="submit"
                variant="contained"
                className={classes.submit}
            >   
                <img src={logo_white} className={classes.subimg} alt=""/>
                <Typography className={classes.subText}>결제 완료</Typography>
            </Button>
            </Paper>
            </form>                    
            
        </Container>
    </div>
  );
}


export default Payment;