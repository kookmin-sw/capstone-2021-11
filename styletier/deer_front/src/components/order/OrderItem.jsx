
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
    name:{
        fontFamily: 'AppleSB',
        fontSize: '100%',
        display: 'inline-block',
    },
    cardRoot: {
        display: 'flex',
    },
    cover: {
        width: '100%',
    },
    cardContent: {
        width: 500,
        textAlign: 'left',
        marginLeft: '10%',
        marginRight: '5%',
        // boxShadow: '2px, 3px, 6px',
    },
    pos: {
        fontFamily: 'AppleSB',
        fontSize: '11px',
        marginTop: '5%',
    },
    cardAction: {
    }
});
 
export default function OrderItem(props) {

    const classes = useStyles();

    
    return (
        <div>
            <Card className={classes.cardRoot}>
                <CardMedia
                    className={classes.cover}
                    image={props.img}
                />
                <CardContent className={classes.cardContent}>
                    <Typography variant="h5" component="h2" className={classes.name}>
                        {props.item.product_name}
                    </Typography>
                    <Typography className={classes.name} style={{float: 'right', marginTop: '1.8%', fontSize: '13px'}}>
                    ₩ {props.item.product_price}
                    </Typography>
                    <Typography className={classes.pos}>
                    size : {props.item.size}
                    <br/>
                    color : {props.item.color}
                    <br/> 
                    quantity : {props.item.quantity}
                    <br/>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}


