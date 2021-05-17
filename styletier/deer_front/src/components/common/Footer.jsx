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
                        당신의 패션 길잡이. 스타일티어<br/>
                        We guide your fashion. ahead
                    </div>
                </Grid>
            </Grid>
                <div className={classes.info}>
                    문의전화: 070-8828-1001<br/><br/>
                    MON-FRI: 09:00~18:00 / LUNCH 12:00~13:00<br/>
                    (SAT, SUN, HOLIDAY OFF)<br/><br/>
                    BANK INFO<br/>
                    예금주: 오상기(스콥)<br/>
                    IBK 기업은행: 211-094546-01-017<br/><br/>
                    싱호: 스콥<br/>
                    대표자명: 오상기<br/>
                    사업자등록번호: 409 - 65 - 00356<br/>
                    주소: 서울시 성북구 정릉로 77 , 국민대학교 창업보육센터 111호<br/><br/>
                    <a href="http://styletier.com/Agreement">이용약관</a>&ensp;|&ensp;개인정보 처리방침<br/>
                </div>
        </div>
    </div>

    );
  }
