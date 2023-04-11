import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
        maxWidth: "400px",
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "5px",
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    },
    textField: {
        margin: theme.spacing(1),
        width: "100%",
    },
    select: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
        width: "100%",
        backgroundColor: "#673ab7",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#512da8",
        },
    },
    formControl: {
        margin: theme.spacing(1),
        width: "100%",

    },
    altButton: {
        backgroundColor: "transparent",
        color: "#673ab7",
        textTransform: "none",
        "&:hover": {
            backgroundColor: "transparent",
            textDecoration: "underline",
        },
    },
}));

const Login = ({ toggleForm }) => {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({
            username,
            password
        });
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                className={classes.textField}
                label="Username"
                variant="outlined"
                color="secondary"
                value={username}
                onChange={handleUsernameChange}
                required
            />
            <TextField
                className={classes.textField}
                label="Password"
                variant="outlined"
                color="secondary"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <Button className={classes.button} variant="contained" color="primary" type="submit">
                Login
            </Button>
            <Button className={classes.altButton} onClick={toggleForm}>
                Create Account
            </Button>
        </form>
    );
};

export default Login;