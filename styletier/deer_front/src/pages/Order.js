//import payment_api from "../api/PaymentAPI";

import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import payment_api from "../api/PaymentAPI";
import user_api from "../api/UserAPI";

import Orders from "../components/order/Orders";

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

function Order (props) {
  const classes = useStyles();
  const [orders,setOrders] = useState([]);
  const [user,setUser] = useState("");
    useEffect(() => {
        hasToken()
        authenticate()
        getOrderList(sessionStorage.getItem('user_id'))
    }, []);
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
        setUser(res.data.name)
        if(res.data.id != sessionStorage.getItem("user_id")){
            alert("인증되지 않은 회원입니다")
            props.history.push(`/`);
        }
    })
  }
  const getOrderList = async(id)=>{
      await payment_api.getUserOrderList(id)
      .then(res=>{
          setOrders(res.data)
      }).catch(err=>console.log(err))
  }
  

  return (
    <div>
        <Container maxWidth="lg" className={classes.root}>
            <Typography className={classes.typo} variant="h4" gutterBottom>
                <ShoppingCartIcon fontSize="large"/> {user} 님의 주문내역
            </Typography>
            <Typography component="h1" variant="h5">
                    주문 목록
                </Typography>
                {
                    orders.map((item)=>
                       (<Orders item = {item} key ={item.id}
                        delivery = {item.deliveries} products = {item.orderproduct}
                        img = {item.orderproduct[0].product_photo[0].img}/>)
                    )
                }
        </Container>
    </div>
  );
}

export default Order;