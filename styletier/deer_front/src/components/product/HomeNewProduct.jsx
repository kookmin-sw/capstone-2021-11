import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Link } from "react-router-dom";
import { Container, Divider, Typography, Grid, Button } from '@material-ui/core';
import bestBg from '../../static/bestTextbg.jpg'

import Media from 'react-media'

const MEDIA_QUERIES = {
  mob: '(max-width: 480px)',
  pc: '(min-width: 480px)'
}

const useStyles = makeStyles({
      bestMainpic:{
        width: '100%',
        marginLeft: '15%',
      },
      bestBtn:{
        width: '100%',
      },
      bestBg:{
        width: '70%',
        borderRadius: '5%',
        zIndex:-1,
        marginTop: '22.1%',
        marginLeft: '40%',
      },
      bestBg_pc:{
        width: '70%',
        borderRadius: '5%',
        zIndex:-1,
        marginTop: '23.3%',
        marginLeft: '40%',
      },
      backgroundImg:{
        width: '100%',
        position: 'absolute',
        zIndex:-1,
      },
      bestText:{
        marginRight: '-12%',
        marginTop: '35%',
        fontSize: '1em',
        lineHeight: '1.3em',
        fontFamily: 'AppleSB',
        textAlign: 'right',
      },
      bestText2:{
        // fontSize: '1em',
        marginTop: '3%',
        // fontSize: '90%',
        fontSize: 15,
        textAlign:'right',
        width:'100%',
        fontFamily: 'AppleUL',
        opacity: 0.7,
        zIndex: 5,
        position: 'relative',
        marginLeft: '12%',
      },
      mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        zIndex: 1,
      },
      textGrid:{
        width:'50%',
      },
      Grid:{
        margin: '0em 0em 0em 1em ',
        width: '80%',
        position: 'relative',
        
      },
  });
  export default function HomeBestProduct(props) {
    
    const classes = useStyles();
    let content = props.new.content;

    return (
      <div className={classes.mob}>
      <br/>
      <Media queries={MEDIA_QUERIES}>
        {matches => {
          return(
            <>
            {matches.pc &&
            <div>
            <Grid container className={classes.Grid}>
              <Grid style={{width:'50%',}}>
                <div className={classes.backgroundImg}><img className={classes.bestBg_pc} src={bestBg} /></div>
                <Button component={Link} to={`/shop/${props.new.id}`} className={classes.bestBtn} onClick={ () =>window.scrollTo(0,0)}>
                  <img className={classes.bestMainpic} src={props.img} onClick={() => window.scrollTo(0,0)} />
                </Button>
              </Grid>
              <Grid className={classes.textGrid} >
                <Typography className={classes.bestText2} style={{fontSize: 18, }}>
                  {(content || '').split('\r\n')[0]}
                  <br/>
                  {(content || '').split('\r\n')[1]}
                  <br/>
                  {(content || '').split('\r\n')[2]}
                </Typography>
                <Typography className={classes.bestText} style={{fontSize: 18, marginTop: '60%',}}>
                  {props.new.name}<br/>
                  {props.new.category}
                </Typography>
              </Grid>
            </Grid>
            </div>}

            {matches.mob &&
            <div>
            <Grid container className={classes.Grid}>
              <Grid style={{width:'50%',}}>
                <div className={classes.backgroundImg}><img className={classes.bestBg} src={bestBg} /></div>
                <Button component={Link} to={`/shop/${props.new.id}`} className={classes.bestBtn} onClick={ () =>window.scrollTo(0,0)}>
                  <img className={classes.bestMainpic} src={props.img} onClick={() => window.scrollTo(0,0)} />
                </Button>
              </Grid>
              {/* <div className={classes.backgroundImg}><img className={classes.bestBg} src={bestBg} /></div> */}
              <Grid className={classes.textGrid} >
                <Typography className={classes.bestText2}>
                  {(content || '').split('\r\n')[0]}
                  <br/>
                  {(content || '').split('\r\n')[1]}
                  <br/>
                  {(content || '').split('\r\n')[2]}
                </Typography>
                <Typography className={classes.bestText}>
                  {props.new.name}<br/>
                  {props.new.category}
                </Typography>
              </Grid>
            </Grid>
            </div>}
            </>
          )
          }}
      </Media>

      
      </div>
    )
}

