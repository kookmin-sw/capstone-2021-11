import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Container, Typography, Grid, Paper, Button, TableHead } from '@material-ui/core';

// import {withRouter} from 'react-router';


const useStyles = makeStyles({
  root: {
    // maxWidth: 300,
    // margin: 10,
    // float: 'left',
    width: '50%',
    color: 'white',
    marginBottom: '10%',
  },
  prodName:{
    fontFamily: 'AppleSB',
  },
  prodPic:{
    width: '100%',
  },
});

export default function ProductView(props) {

    const classes = useStyles();

    const compareImage = (photo) =>{
      if(photo && photo[1].img){
        return(photo[1].img)
      }
      else{
        return("https://opgg-com-image.akamaized.net/attach/images/20200120173714.1057245.gif")
      }
     }
    
    return (
      <Button
      component={Link} to={`/shop/${props.productInfo.id}`} className={classes.root} onClick={() => window.scrollTo(0,0)}>
        <div>
        <Typography className={classes.prodName}>
          <img src={props.productInfo.photo[0].img} className={classes.prodPic} />
          <br/>
          {props.productInfo.name} <br/>
          {props.productInfo.price}w
        </Typography>
        </div>
        
      </Button>
    );
}
