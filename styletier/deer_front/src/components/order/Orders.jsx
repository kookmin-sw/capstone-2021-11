
import { makeStyles } from '@material-ui/core/styles';
import { Card,  CardContent, CardMedia } from '@material-ui/core';
import { Typography, Button, FormControlLabel, Checkbox } from '@material-ui/core';

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
  cardRoot: {
    display: 'flex',
    },
    cover: {
        width: 151,
    },
    cardContent: {
        width: 500
    },
    cardAction: {
    }
});

export default function OrderItem(props) {

    const classes = useStyles();

    const productsNames = (list) =>{
        let names = ''
        list.map((l)=>{
           names = names+l.product_name+','
        })
        return names
    }
    const existAddress = () =>{
        if(props.delivery === null){
            return(
                <div>
                    주소를 등록하셔야 합니다!
                </div>
            )
        }else{
            return(
            <div>
            주소 : {props.delivery.address_name}
            <br/> 
            {props.delivery.address_detail}
            <br/>
            {props.delivery.delivery_type}
            <br/>
            </div> 
            )
        }
    }
    
    return (
        <div>
            <Card className={classes.cardRoot}>
                <CardMedia
                    className={classes.cover}
                    image={props.img}
                    title="Live from space album cover"
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2">
                        주문 번호:{props.item.id}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    상품들: {productsNames(props.products)}
                    <br/>
                    총 금액 : {props.item.total_amount}
                    <br/> 
                    {existAddress()}              
                    </Typography>
                    <Typography variant="body2" component="p">
                    <br />  <strong>{props.item.status}</strong> 
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}


