import React from "react";
import { Link } from "react-router-dom";
import auth_api from "../../api/UserAPI";
import { useContext } from 'react';
import AuthContext from '../../store';
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import Media from 'react-media'


import logo from '../../static/logotext.png'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: 'black',
    fontFamily: 'AppleR',
    fontSize: '13px',
    textDecoration: "inherit",
    marginRight: '17%',
    '&:hover':{
      color: "black",
    }, 
  },
  titlePc: {
    flexGrow: 1,
    color: 'black',
    fontFamily: 'AppleR',
    fontSize: '16px',
    textDecoration: "inherit",
    marginRight: '13%',
    '&:hover':{
      color: "black",
    }, 
  },
  logoMob:{
    // width: '33%',
    width: '165px',
    marginTop: '2%',
    marginBottom: '2%',
  },
  logoPc:{
    // width: '10%',
    width: '165px',
    height: '17px',
    marginTop: '1%',
    marginBottom: '0.5%',
  },
  headerBar:{
    backgroundColor: 'black',
    width: '227px',
    height: '1px',
    marginLeft: '20%',
  },
  headerBarPc:{
    backgroundColor: 'black',
    // width: '250px',
    width: '33%',
    display: 'inline-flex',
    height: '1px',
    // marginLeft: '33%',
    color: '#707070'
  },
  mob:{
    position: 'relative',
    minWidth: '320px',
    maxWidth: '480px',
    width: '100%',
    margin: 'auto',
    overflow: 'hidden',
  },
}));

const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}

export default function Appbar() {
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
    <div className={classes.root}>
      <AppBar style={{ background: 'white',}}>
        <Media queries={MEDIA_QUERIES}>
          {matches => {
            console.log("matches: ", matches);
            return(
              <>
              {matches.pc &&
                <div style={{textAlign: 'center'}}>
                <a className={classes.logoPar} href='/'>
                  <img src={logo} className={classes.logoPc} /> 
                </a>
                <Grid style={{marginTop: '-1%', marginBottom: '-0.5%'}}>
                  <div className={classes.headerBarPc} style={{backgroundColor: 'white',}}></div>
                  <div className={classes.headerBarPc}></div>
                  <div className={classes.headerBarPc} style={{backgroundColor: 'white',}}></div>
                </Grid>
                
                <Grid style={{marginLeft: '1%', }}>
                <Typography
                    variant="h6"
                    className={classes.titlePc}
                    component={Link}
                    to="/shop"
                >
                    shop
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.titlePc}
                    component={Link}
                    to="/seller"
                >
                    seller
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.titlePc}
                    style={{marginRight: '0'}}
                    component={Link}
                    to="/contact"
                >
                    contact
                </Typography>
                </Grid>
              </div>
              }
              {matches.mob &&
              <div className={classes.mob}>
                <a className={classes.logoPar} href='/'>
                  <img src={logo} className={classes.logoMob} /> 
                </a>
                {/* <div className={classes.headerBar}></div> */}
                <Grid style={{marginTop: '-4%', marginBottom: '-1.5%'}}>
                  {/* <div className={classes.headerBarPc} style={{backgroundColor: 'white',}}></div>
                  <div className={classes.headerBarPc}></div>
                  <div className={classes.headerBarPc} style={{backgroundColor: 'white',}}></div> */}
                  <Grid className={classes.headerBarPc} style={{backgroundColor: 'white', width: '25%'}}></Grid>
                  <Grid className={classes.headerBarPc} style={{width: '50%'}}></Grid>
                  <Grid className={classes.headerBarPc} style={{backgroundColor: 'white', width: '25%'}}></Grid>
                </Grid>
                <Grid style={{marginLeft: '0%',}}>
                <Typography
                    variant="h6"
                    className={classes.title}
                    component={Link}
                    to="/shop"
                    onClick={() => window.scrollTo(0,0)}
                >
                    shop
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.title}
                    component={Link}
                    to="/seller"
                    onClick={() => window.scrollTo(0,0)}
                >
                    seller
                </Typography>
                <Typography
                    variant="h6"
                    className={classes.title}
                    style={{marginRight: '0'}}
                    component={Link}
                    to="/contact"
                    onClick={() => window.scrollTo(0,0)}
                >
                    contact
                </Typography>
                </Grid>
              </div>
              }
              </>
            )
          }}
        </Media>
        
        
        

          {/* {state.logged ? (
            <div style={{marginRight: '3%'}}>
                <Button onClick = {logout} className={classes.title}>Logout</Button>
                <Button component={Link} to="/cart" className={classes.title}>Cart</Button>
                <Button component={Link} to="/mypage" className={classes.title}>MyPage</Button>

            </div>
            ):(
                <div style={{marginRight: '3%'}}>
                    <Button component={Link} to="/signup" className={classes.title}>SignUp</Button>
                    <Button component={Link} to="/login" className={classes.title}>Login</Button>
                </div>
            )} */}
      </AppBar>
    </div>
  );
}
