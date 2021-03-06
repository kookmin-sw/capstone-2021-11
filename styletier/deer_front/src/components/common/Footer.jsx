import React from 'react';
import { Link } from "react-router-dom";
import auth_api from "../../api/UserAPI";
import { useContext, useState, useEffect } from 'react';
import AuthContext from '../../store';
import logoimage from '../../static/logologo.png';
import logotext from '../../static/logotext.png';

import {
    makeStyles,
    AppBar,
    Button,
    Grid
} from "@material-ui/core";


const useStyles = makeStyles(theme => ({

    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
        overflow: 'hidden',
        paddingTop: '3%',
      },
    root: {
        backgroundColor: 'white',
        color: props => props.color,
        height: '330px',
        paddingTop: '3%',
      },
    footer: {
        display: 'flex',
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
        justifyContent:'flex-end',
        marginLeft: '5%',
    },
    info: {
        color: '#787878',
        fontSize:10,
        marginTop: '25px',
        marginLeft: 20,
        fontFamily: 'AppleR'
    },
    logo: {
        width: '10%',
        padding: '5px',
    },
  })); 



  export default function Footer() {
    const astyle = {
        color:'black',
        textDecoration:'none'
    }

    const classes = useStyles();

    const [state, actions] = useContext(AuthContext);

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
        <div className={classes.root}>
            <Grid container spacing={1} style={{marginLeft: '5%'}}>
                <Grid style={{width: '80%'}}>
                    <a href="http://styletier.com/"><img src={logotext} style={{height:10}} /></a>
                </Grid>
                <Grid container spacing={1} style={{width: '20%', fontFamily: 'AppleR'}}>
                    <div style={{color: 'black', fontSize:10, marginLeft: '3%', marginTop: '3%'}}>
                        about us<br/><a href="http://styletier.com/contact" style={astyle}>contact us</a>
                    </div>
                </Grid>
                <Grid style={{width: '70%', fontFamily: 'AppleR'}}>
                    <div className="text" style={{color: 'black', fontSize:8, marginLeft:0, float: 'left'}}>
                        ????????? ?????? ?????????. ???????????????<br/>
                        We guide your fashion. ahead
                    </div>
                </Grid>
            </Grid>
                <div className={classes.info}>
                    ????????????: 070-8828-1001<br/><br/>
                    MON-FRI: 09:00~18:00 / LUNCH 12:00~13:00<br/>
                    (SAT, SUN, HOLIDAY OFF)<br/><br/>
                    BANK INFO<br/>
                    ?????????: ?????????(??????)<br/>
                    IBK ????????????: 211-094546-01-017<br/><br/>
                    ??????: ??????<br/>
                    ????????????: ?????????<br/>
                    ?????????????????????: 409 - 65 - 00356<br/>
                    ??????: ????????? ????????? ????????? 77 , ??????????????? ?????????????????? 111???<br/><br/>
                    <a href="http://styletier.com/Agreement">????????????</a>&ensp;|&ensp;???????????? ????????????<br/>
                </div>
        </div>
    </div>

    );
  }
