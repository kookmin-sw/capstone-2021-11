//import payment_api from "../api/PaymentAPI";

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import payment_api from "../api/PaymentAPI";
import user_api from "../api/UserAPI";

import OrderItem from "../components/order/OrderItem";
import queryString from "query-string";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#eeeff1",
      padding: 30
    },
    typo: {
        color: 'black'
    },
  }));

function Approve (props) {
  const classes = useStyles();
  const [order,setOrder] = useState({});
  const [products,setProducts] = useState([]);
  const [quantity,setQuantity] = useState(0);
    useEffect(() => {
        payAccess()
        hasToken()
        authenticate()
    }, []);

  const payAccess = async() => {
        let tid = sessionStorage.getItem('tid')
        let pg = queryString.parse(props.location.search).pg_token
        let order_id = props.match.params.order_id
        let user_id = sessionStorage.getItem('user_id')
        console.log({'tid':tid,'pg_token':pg,'order_id':order_id,'user_id':user_id})
        await payment_api.getPayAccess({'tid':tid,'pg_token':pg,'order_id':order_id,'user_id':user_id})
        .then(res=>{
            console.log("approve",res.data)
            if(res.data.msg){
              alert("예외처리",res.data.msg)
              // props.history.push(`/cart/`);
            }else if(res.data.msg === "payment is already done"){
              alert("이미 결제된 상품입니다")
              props.history.push('/')
            }
            return(res.data)
        }).then((data)=>{
          payment_api.updateOrder({
          "status": "결제완료",
          "user_id":data.partner_user_id,
          "total_amount": data.amount.total,
        },data.partner_order_id)
        .then(res=>{
            console.log("업데이트 잘됌",res.data)
            setOrder(res.data)
            let prod = res.data.orderproduct
            setProducts(prod)
            prod.map((item)=>(
            setQuantity(quantity+item.quantity)
            ))
            prod.forEach( async element => {
              console.log("요소",element)
               await payment_api.downQuantity({
                  'product_id':element.product_id,
                  'color':element.color,
                  'size':element.size,
                  'quantity':element.quantity
               })
               .then(res=>{
                  console.log("수량 잘 깎음",res)
               }).catch(err=>console.log(err))
               await payment_api.deletePaymentCart({
                 'user_id':sessionStorage.getItem('user_id'),
                 'product_id':element.product_id
               })
               .then(res=>{
                 console.log("cart 삭제",res)
               }).catch(err=>console.log(err))
            });
          }).catch(err=>console.log(err))
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
        console.log(res.data)
        if(res.data.id != sessionStorage.getItem("user_id")){
            alert("인증되지 않은 회원입니다")
            props.history.push(`/`);
        }
    })
  }

  return (
    <div>
        <Container maxWidth="lg" className={classes.root}>
            <Typography className={classes.typo} variant="h4" gutterBottom>
                <ShoppingCartIcon fontSize="large"/> 결제가 완료되었습니다!
            </Typography>
            <Typography component="h1" variant="h5">
                    주문번호:{order.id}
                </Typography>
                {
                    products.map((item,idx)=>
                       (<OrderItem item = {item} key ={idx} img = {item.product_photo[0].img}/>)
                    )
                }
            <h3>총 금액:{order.total_amount}</h3>
        </Container>
    </div>
  );
}

export default Approve;