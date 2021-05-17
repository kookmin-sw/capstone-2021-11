import React from 'react';
import { Link } from "react-router-dom";
import auth_api from "../../api/UserAPI";
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store';
import logoimage from '../../static/logologo.png';
import login from '../../static/log-in.png';
import cart from '../../static/shopping-cart.png';
import mypage from '../../static/person.png';
import logotext from '../../static/logotext.png';

import {
    makeStyles,
    AppBar,
    Button,
    Grid,
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({

    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
        // textAlign: 'center',
      },
    root: {
        backgroundColor: 'white',
        color: props => props.color,
        height: '260px',
      },
    footer: {
        display: 'flex',
        // top: 'auto',
        // bottom: 0,
        background: 'white',
        // position: 'relative', // fixed 조정
      },
    left: {
        display:'flex',
        flexGrow:0
    },
    middle: {
        flexGrow:8,
        textAlign:'center',
        margin:'auto',
    },
    right: {
        display:'flex',
        flexGrow:1,
        justifyContent:'flex-end'
    },
    info: {
        color: '#787878',
        fontSize:10,
        marginTop: '25px',
        marginLeft: 20
    },
    logo: {
        width: '83%',
        marginTop: '20%',
        marginLeft: '8%',
        padding: '10px'
    },
    footLogo: {
        width: '100%',
        padding: '5px',
    },
    footBtn:{
        width: '80px',
        height: '80px',
        backgroundColor: 'white',
        borderRadius: '100%',
        float: 'right',
        marginRight: '3%',
        zIndex: 3,
        position: 'relative'
        // margin: '0 2% 5% 0%',
    },
    background:{
        backgroundColor: '#014D81',
        borderRadius: '26px',
        float: 'right',
        width: '80%',
        textAlign: 'center',
        position: 'absolute',
        zIndex: 1,
        marginTop: '3%',
        marginLeft: '10%',
        height: '51px',
    },
    background2:{
        backgroundColor: '#014D81',
        borderRadius: '26px',
        float: 'right',
        width: '30%',
        textAlign: 'center',
        position: 'absolute',
        zIndex: 1,
        marginTop: '5%',
        marginLeft: '55%',
    },
    icon:{
        width: '28.28px',
        marginLeft: '50%',
        marginRight: '100%',
        marginTop: '10%',
    },
  })); 



  export default function FooterBtn() {
    const classes = useStyles();

    const [state, actions] = useContext(AuthContext);
    const [show, setShow] = useState(true);

    const logout = async () => {
        await auth_api
        .authLogout()
        .then((result) => {
            console.log(result);
            window.sessionStorage.clear();
            actions.setLoginState(false);
        })
        }

    return (
    <div className={classes.mob}>
        <Grid container spacing={1}>
        <Grid style={{width: '100%'}}>
            <Grid className={classes.footBtn} onClick={() => setShow(!show)}>
                <img src={logoimage} className={classes.logo}/>
            </Grid>
            {show?null:
            state.logged ? (
                <Grid className={classes.background}>
                    <Button href="/mypage">
                        <img src={mypage} className={classes.icon} />
                    </Button>
                    <Button href="/cart">
                        <img src={cart} className={classes.icon}/>
                    </Button>
                    <Button onClick = {logout}>
                        <img src={login} className={classes.icon}/>
                    </Button>
                </Grid>
                ):(
                    <Grid className={classes.background}>
                        <Button href="/login">
                        <img src={mypage}/>
                        </Button>
                        <Button href="/login">
                            <img src={cart}/>
                        </Button>
                        <Button href="/login">
                            <img src={login}/>
                        </Button>
                    </Grid>
                )}
        </Grid>
        </Grid>
    </div>

    );
  }
