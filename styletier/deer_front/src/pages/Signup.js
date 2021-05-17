import React, { useState, useEffect, useContext  } from 'react';
import auth_api from "../api/UserAPI";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
    Paper,
    Button,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import AuthContext from '../store';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop : theme.spacing(8),
        padding: theme.spacing(5),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: theme.palette.text.secondary,
        minHeight: "500px"
    },
    //form: {
    //    width: "100%",
    //    marginTop: theme.spacing(3),
    //},
    submit: {
        maxWidth: "500px",
        margin: theme.spacing(3, 0, 2),
    },
    button: {
        maxWidth: "500px",
        margin: theme.spacing(0, 0, 3),
    },
    mob:{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '480px',
        width: '100%',
        margin: 'auto',
      },
}));


function Signup () {    
    const classes = useStyles();

    const [values, setValues] = useState({ email: "", password: "", repassword: "",name:"",phone_num:""})
    // ,address:"",postal_code:""})

    const [state, actions] = useContext(AuthContext);

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        await auth_api
            .authRegister({
                email: values.email,
                password1: values.password,
                password2: values.repassword,
                name: values.name,
                phone_num: values.phone_num,
                address: values.address,
                postal_code: values.postal_code,
            })
            .then((result) => {
                console.log(result);
                alert("회원가입 성공^^")
                window.sessionStorage.setItem("token", result.data.token);
                window.sessionStorage.setItem("user_id", result.data.user.id);
                actions.setLoginState(true);
            })
        .catch((err) => console.log(err,"안돼?"));
    }
  
    useEffect(() => {
        console.log('렌더링이 완료되었습니다!');
    }, []);

  return (
    <div className={classes.mob}>
        {state.logged ? <Redirect to="/" /> : <></>}
        <Container>
            <Paper className={classes.paper} elevation={0}>
                <Typography component="h1" variant="h5">
                    Signup
                </Typography>
                <br/>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="E-mail"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus   
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={values.password}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="repassword"
                                label="Confirm Password"
                                type="password"
                                value={values.repassword}
                                onChange={handleChange}
                                error={
                                    values.password === values.repassword
                                    ? false
                                    : true
                                }
                                helperText={
                                    values.password === values.repassword
                                    ? ""
                                    : "incorrect!"
                                }
                            />    
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus   
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="postal_code"
                                name="postal_code"
                                value={values.postal_code}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus   
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="address"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus   
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                label="phone_num"
                                name="phone_num"
                                value={values.phone_num}
                                onChange={handleChange}
                                required
                                fullWidth
                                autoFocus   
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                </form>
            </Paper>
        </Container>
    </div>
  );
}

export default Signup;