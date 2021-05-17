import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Typography, Button, Card, CardContent, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import photo_api from "../../api/PhotoAPI"
import user_api from "../../api/UserAPI";

import btnPlus from "../../static/btnPlus.png"
import btnMinus from '../../static/btnMinus.png'

const useStyles = makeStyles((theme) => ({
    pic:{
        width: 305,
        // width:100,
        marginLeft: '1.5%',
    },
    pic2:{
        width: 305,        
        // float:"right"
    },
    imgRight:{
        float:"right",
        marginRight: '1.0%',
    },
    nameLeft:{
        // position: 'relative',
        color:'#00487e', 
        fontFamily:'AmalfiCoast',
        fontSize: 50,
        // top:"30%",
        marginLeft: '1.5em',
        // right: 40,
        zIndex: 1
    },
    nameSetting: {
        position: 'absolute',
        fontFamily:'AmalfiCoast',
        color:'white', 
        fontSize: '1.3em',
        textTransform: 'none',
        marginTop: '80%',
        left: '60%'

    },
    btnImg: {
        width:'100%',
        // marginTop: '5px',
    },
    rootLeft:{
      backgroundColor: 'rgba( 0, 59, 99, 0.9)', // #003b63
      width: '80px',
      height:'70px',
      borderRadius:'0px',
      position: 'absolute',
      left:40
    },
    showMsg:{
        backgroundColor: '#014D81',
        width: '19em',
        marginLeft: '3%',
        borderRadius: '10px',
    },
    showMsg2:{
        backgroundColor: '#014D81',
        width: '19em',
        marginRight: '3%',
        borderRadius: '10px',
        float: 'right',
    },
    btnGrid: {
        width: '10%',
    },
    showMsgTextGrid:{
        width: '90%',
        textAlign: 'right',
    },
    showMsgText:{
        color: 'white',
        marginRight: '3%',
        fontFamily: 'AppleUL',
        fontSize: '2em',
        marginTop: '3%',
    },
    hiddenMsg:{
        // position: 'absolute',
        backgroundColor:'#4A4A4A',
        marginLeft:'3%',
        maxWidth:'19em',
        borderRadius:'0px',
        marginRight:81,
        borderRadius: '15px',
    },
    hiddenMsg2:{
        // position: 'absolute',
        backgroundColor:'#4A4A4A',
        // marginLeft:'3%',
        width:'19em',
        borderRadius:'0px',
        marginRight: '3%',
        float: 'right',
        borderRadius: '15px',
    },
    hiddenRootLeft: {
      backgroundColor:'#252525',
      marginLeft:'75px',
      maxWidth:'90%',
      borderRadius:'0px',
      marginRight:81
    },
    info: {
        color:"white",
        marginLeft: '1em',
        fontFamily: 'AppleSB',
    },
    explan: {
        color:"white",
        // textAlign:'center',
        fontFamily: 'AppleSB',
        marginLeft: '6%'
    },
    rootRight:{
        backgroundColor: 'rgba( 0, 59, 99, 0.9)', // #003b63
        width: '80px',
        height:'70px',
        borderRadius:'0px',
        position: 'absolute',
        left: 65
    },
    hiddenRootRight: {
        backgroundColor:'#252525',
        marginLeft: 100,
        marginRight: 25,
        maxWidth:'90%',
        borderRadius:'0px',
    },
    nameRight:{
        // position: 'relative',
        color:'#00487e', 
        fontFamily:'AmalfiCoast',
        fontSize: 50,
        // top:300,
        // left:10,
        marginLeft: '1.5em',
        zIndex: 1
    }
  }));

export default function SellerView(props) {
    const classes = useStyles();
    const [deerphoto, setDeerPhoto] = useState([]);
    const [user, setUsers] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        getDeerPhotoList();
        getUserdataList();
      },[]);

    const getDeerPhotoList = async () => {
      await photo_api.getDeerPhoto()
        .then((result) => {
          console.log(result.data);
          setDeerPhoto(result.data);
        })
        .catch((err) => console.log(err));
      };
    
    const getUserdataList = async () => {
        await user_api.getUserdata()
        .then((result) => {
            console.log(result.data);
            setUsers(result.data);
          })
          .catch((err) => console.log(err));
    };

    if(props.index % 2 === 0) {
        return (
            <Grid container spacing={3}>
                <Grid item xs = {12}>
                    <div className={classes.showMsg}>
                        <Grid container spacing={0}>
                            <Grid className={classes.btnGrid}>
                            <Button className={classes.btn} 
                                onClick={() => setShow(!show)}>
                                {
                                    show
                                    ? <img className={classes.btnImg} src={btnPlus} />
                                    : <img className={classes.btnImg} src={btnMinus} />  
                                }
                            </Button>
                            </Grid>
                            <Grid className={classes.showMsgTextGrid}>
                            <Typography className={classes.showMsgText}>
                                    {props.sellerInfo.username}
                            </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        show ? null :
                            <Card className={classes.hiddenMsg}>
                                <CardContent>
                                    <Typography className={classes.info}>
                                        {user.map((us) => (
                                            <div key={us.id}>
                                                <div>
                                                    {
                                                        props.sellerInfo.user_id === us.id
                                                        ? 'H: ' + us.height + ' W: ' + us.weight + ' @' + us.name
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </Typography>
                                    <br/>
                                    <Typography className={classes.explan}>
                                        {props.sellerInfo.intro_text2}
                                    </Typography>
                                </CardContent>
                            </Card>
                    }
                    <Button
                    component={Link} 
                    to={`/seller/${props.sellerInfo.id}`}
                    >   
                        {deerphoto.map((deer) => (
                            <div key={deer.id}>
                                <div>
                                    {
                                        props.sellerInfo.id === deer.user_id
                                        ? <img className={classes.pic} src={deer.img} />
                                        : null
                                    }
                                </div>
                            </div>
                        ))}
                        <Typography variant="h2" className={classes.nameSetting}>
                        {user.map((us) => (
                            <div key={us.id}>
                                <div>
                                    {
                                        props.sellerInfo.user_id === us.id
                                        ? us.name
                                        : null
                                    }
                                </div>
                            </div>
                        ))}   
                    </Typography>
                    </Button>
                    <br/><br/><br/><br/><br/><br/>

                </Grid>
            </Grid>
        );
    } else {
        return (
            <Grid container spacing={3} justify="flex-end">
                <Grid item xs = {12}>
                <div className={classes.showMsg2}>
                        <Grid container spacing={0}>

                            <Grid className={classes.btnGrid}>
                            <Button className={classes.btn} 
                                onClick={() => setShow(!show)}>
                                {
                                    show
                                    ? <img className={classes.btnImg} src={btnPlus} />
                                    : <img className={classes.btnImg} src={btnMinus} />  
                                }
                            </Button>
                            </Grid>
                            <Grid className={classes.showMsgTextGrid}>
                            <Typography className={classes.showMsgText}>
                                    {props.sellerInfo.username}
                            </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    {
                        show ? null :
                            <Card className={classes.hiddenMsg2}>
                                <CardContent>
                                    <Typography className={classes.info}>
                                        {user.map((us) => (
                                            <div key={us.id}>
                                                <div>
                                                    {
                                                        props.sellerInfo.user_id === us.id
                                                        ? 'H: ' + us.height + ' W: ' + us.weight + ' @' + us.name
                                                        : null
                                                    }
                                                </div>
                                            </div>
                                        ))}
                                    </Typography>
                                    <br/>
                                    <Typography className={classes.explan}>
                                        {props.sellerInfo.intro_text2}
                                    </Typography>
                                </CardContent>
                            </Card>
                    }
                    <Button className={classes.imgRight}
                        component={Link} 
                        to={`/seller/${props.sellerInfo.id}`}
                        onClick={() => window.scrollTo(0,0)}
                        >
                        {deerphoto.map((deer) => (
                            <div key={deer.id}>
                                <div>
                                    {
                                        props.sellerInfo.id === deer.user_id
                                        ? <img className={classes.pic2} src={deer.img} />
                                        : null
                                    }
                                </div>
                            </div>
                        ))}
                        <Typography variant="h2" className={classes.nameSetting}>
                        {user.map((us) => (
                            <div key={us.id}>
                                <div>
                                    {
                                        props.sellerInfo.user_id === us.id
                                        ? us.name
                                        : null
                                    }
                                </div>
                            </div>
                        ))} 
                    </Typography>
                    </Button>
                    <br/><br/><br/><br/><br/><br/>
                </Grid>
            </Grid>
        );
    }
    
}
