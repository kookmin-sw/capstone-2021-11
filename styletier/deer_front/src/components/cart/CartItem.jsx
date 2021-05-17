import React, { useState, useEffect }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import { Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import payment_api from "../../api/PaymentAPI";

import delBtn from '../../static/delBtn.png'
import check from '../../static/check.png'


const useStyles = makeStyles({
    root: {
        maxWidth: 300,
        margin: 20,
        float: 'left'
    },
    media: {
        height: 400,
    },
    cardsize: {
        height: 400,
        width: 400,
    },
    pos: {
        fontFamily: 'AppleR',
        fontSize: '15px',
        marginTop: '5%',
        marginLeft: '15%',
    },
    name:{
        fontFamily: 'AppleSB',
        fontSize: '100%',
        display: 'inline-block',
        float: 'left',
        marginTop: '2%',
    },
    cardRoot: {
        boxShadow: '5px 3px 6px rgba(0, 0, 0, 35%)',
        display: 'flex',
        borderRadius: '7px',
        marginBottom: '10%',
        marginTop: '5%',
        width: '100%',
    },
    cover: {
        width: '100%',
        padding: '5%',
        paddingTop: '12%',
        paddingBottom: '10%',
    },
    img:{
        // width: '90%',
        width: '92.34px',
        height: '134.58px',
    },
    cardContent: {
        width: 500,
        padding: '1%'
    },
    detail:{
        backgroundColor: '#0353C6',
        boxShadow: '5px 3px 6px rgba(0, 0, 0, 35%)',
        borderRadius: '7px',
        color: 'white',
        textAlign: 'left',
        padding: '5%',
        paddingBottom: '7%',
        marginRight: '7%',
        marginTop: '4%',
    },
    del:{
        // backgroundColor: '#E17575',
        float: 'right',
        color: 'white',
        fontFamily: 'AppleSB',
        width: '26px',
        borderRadius: '100%',
        '&:hover':{
            backgroundColor: 'rgba(255, 255, 255, 5%)',
        },
        display: 'inline-block',
        marginRight: '-10%',
    },
    chk:{
        marginRight: '-20%',
        float: 'right',
        marginTop: '-2%',
    },
    checkBtn:{
        float: 'right',
        boxShadow: '0px 3px 6px rgba(0, 0, 0, 35%)',
        width: '26px',
        height: '26px',
        borderRadius: '100%',
        backgroundColor: 'white',
        borderColor: 'white',
        border: '1px',
        '&:hover':{
            backgroundColor: "#F3F3F3",
        },
        display: 'inline-block',
    },
    btn:{
        marginLeft: '30%',
        marginBottom: '23%'
    },
    price:{
        marginRight:'10%',
        marginTop: '7%',
    },
    priceText: {
        fontFamily: 'AppleSB',
        float: 'right', 
        fontSize: '20px'
    },
    bar:{
        backgroundColor: 'white',
        position: 'absolute',
        width: '30px',
        height: '5px',
        marginLeft: '-10px',
        marginTop: '6%'
    },
    cardAction: {
    }
});

export default function CartItem(props) {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    const checkHandler = ({ target }) => {
        setChecked(!checked);
        props.checkedItemHandler(props.item.id, target.checked,props.item.quantity,props.item.price);
    };

    const removeItem = async (id) => {
        console.log(id);
        payment_api.deleteCartItem(id)
            .then(res => {
                console.log('success ::', res);
                window.location.reload();
            }).catch(e => console.log(e));
    }
    
    return (
        <div>
            <Card className={classes.cardRoot}>
                <CardMedia
                    className={classes.cover}
                    // image={props.img}
                >
                    <img src={props.img}  className={classes.img} />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <div className={classes.btn}>
                    <Button size="small" onClick={e => removeItem(props.item.id)}  className={classes.del}>
                        <img src={delBtn} />
                    </Button>
                    <div className={classes.chk} >
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedItem"
                            color="primary"
                            checked={checked}
                            onChange={checkHandler}
                        />
                        }
                    />
                    </div>
                    {/* <Button checked={checked} onChange={checkHandler}  className={classes.checkBtn}>

                        <img src={check} />
                    </Button> */}
                    </div>
                    <Typography variant="h5" component="h2" className={classes.name} >
                        {props.item.product_name}
                    </Typography>
                    <br/>
                    <div className={classes.bar}></div>
                    <div className={classes.detail}>
                        <Typography className={classes.pos}>
                        수량 : {props.item.quantity}
                        <br/>
                        크기 : {props.item.size}
                        <br/>
                        색상 : {props.item.color}
                        <br/> 
                        </Typography>
                    </div>
                    <div className={classes.price}>
                    <Typography className={classes.priceText}>
                        가격 ₩ {props.item.price}
                    </Typography>
                    </div>
                </CardContent>
                {/* <CardActions className={classes.cardAction}>
                    <Button size="small" onClick={e => removeItem(props.item.id)}>삭제</Button>
                </CardActions> */}
            </Card>
        </div>
    );
}


