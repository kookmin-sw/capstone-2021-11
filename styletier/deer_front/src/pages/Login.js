import React, { useState, useEffect, useContext } from 'react';
import auth_api from "../api/UserAPI";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../store';

import {
    Container,
    Paper,
    Button,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";

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
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
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


function Login () {
    const classes = useStyles();

    const [values, setValues] = useState({ email: "", password: "" })

    const [state, actions] = useContext(AuthContext);

    useEffect(() => {
        console.log('렌더링이 완료되었습니다!');
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value })
    }
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        await auth_api
            .authLogin({
                email: values.email,
                password: values.password,
            })
            .then((result) => {
                console.log(result);
                alert('환영합니다.')
                console.log("token : ", result.data.token);
                console.log("user id : ",result.data.user.id)
                window.sessionStorage.setItem("token", result.data.token);
                window.sessionStorage.setItem("user_id",result.data.user.id)
                actions.setLoginState(true);
            })
        .catch((err) => {
            console.log(err);
            alert('비밀번호 또는 이메일이 잘못되었습니다.');
        });
    }

  return (
    <div className={classes.mob}> 
        {state.logged ? <Redirect to="/" /> : <></>}
        <Container>
            <Paper className={classes.paper} elevation={0}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <br/>
                <form onSubmit={handleSubmit}>
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
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        component={Link}
                        to={`signup/`}
                    >
                        Join us
                    </Button>
                </form>
                
            </Paper>
        </Container>
    </div>
  );
}

export default Login;