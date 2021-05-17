import React from 'react';
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoAPI from '../../api/PhotoAPI';

const useStyles = makeStyles((theme) => ({
    pic:{
        // width:'20em',
        width:'100%',
        height: '100%',
        margin: '3em',
        // opacity: '0.5',
    },
  })); 

export default function MainToSeller(props) {
    const classes = useStyles();
    
    return (
        <div>
            <Button component={Link} to={`/seller/${props.photo.user_id}`} className={classes.btn} onClick={() => window.scrollTo(0,0)} >
                <img className={classes.pic} src={props.photo.img} />
            </Button>
        </div>    

    );
}