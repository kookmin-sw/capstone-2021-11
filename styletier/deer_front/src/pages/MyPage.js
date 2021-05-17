import React, { useState, useEffect} from 'react';
import auth_api from "../api/UserAPI";
import AuthContext from '../store';
import { Link } from "react-router-dom";
import { Container, Button, Typography } from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { makeStyles } from '@material-ui/core/styles';

//img
import profile from "../static/mypage_profile.png";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: "#black",
      padding: 30
    },
    typo: {
        color: 'white'
    },
    toptypo: {
        color: 'white',
        textAlign: 'center',
        marginTop: '8%'
    },
    profile: {
        width: '50%',
        marginLeft: '25%',
        marginTop: '15%'
    },
    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
    },
    roundedrect:{
        background: 'white',
        height: '700px',
        width: '90%',
        marginLeft: '5%',
        borderRadius: '45px',
        marginTop: '-160%',
        position: 'relative'
    },
    roundedrectgradient:{
        background: '#78797a',
        height: '670px',
        width: '90%',
        marginLeft: '5%',
        borderRadius: '45px',
        marginTop: '10%',
        transform: 'Rotate(-10deg)',
    }
  }));

function MyPage () { 
    const classes = useStyles();
    const [user,setUser] = useState({});

    useEffect(() => {
        getRestUser()
        getUser(sessionStorage.getItem('user_id'))
    }, []);

   const getRestUser = async()=>{
       await auth_api.getUsers()
       .then(res=>{
           console.log(res.data)
           setUser(res.data)
       }).catch(err=>console.log(err))
   }
   const getUser = async(id)=>{
    await auth_api.getUser(id)
    .then(res=>{
        console.log(res.data)
    }).catch(err=>console.log(err))

   }

  return (
    <div className={classes.mob}>
        <div className={classes.root}>
            <Typography className={classes.toptypo}  component="h1" variant="h5" gutterBottom>
                StyleTier My Page
            </Typography>
            <div className={classes.roundedrectgradient}> 
            </div> 
                <div className={classes.roundedrect}>
                    <img src={profile} className={classes.profile} />
                </div>
            <Container maxWidth="lg" className={classes.root}>
                <Typography className={classes.typo} variant="h4" gutterBottom>
                <AccountBoxIcon fontSize="large"/>MyPage
                </Typography>
                <Typography className={classes.typo}  component="h1" variant="h5" gutterBottom>
                {user.name}<br/>
                {user.phone_num}<br/>
                {user.email}<br/>
                {user.address}
                </Typography>
            <Button component={Link} to="/order">주문리스트</Button>
            <Typography className={classes.typo}  component="h1" variant="h5" gutterBottom>
                미입금:
            </Typography>
            <Typography className={classes.typo}  component="h1" variant="h5" gutterBottom>
                결제완료:
            </Typography>
            <Typography className={classes.typo}  component="h1" variant="h5" gutterBottom>
                배송중:
            </Typography>
            <Typography className={classes.typo}  component="h1" variant="h5" gutterBottom>
                미입금:
            </Typography>
            </Container>
        </div>
    </div>
  );
}

export default MyPage;