import React, {  useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Signup from "./SignUp";
import Login from "./LogIn";
import '../App.css';

const useStyles = makeStyles((theme) => ({
    heading: {
        textAlign: "center",
        marginBottom: "30px",
        color: "#673ab7",
        textTransform: "uppercase",
        letterSpacing: "2px",
    },
}));

const Auth = () => {
    const classes = useStyles();
    const [showLogin, setShowLogin] = useState(true);
    
    const toggleForm = () => {
        setShowLogin(!showLogin);
    };

    return (
        <div>
            <h1 className={classes.heading}>{showLogin ? "Login" : "Sign Up"}</h1>
            {showLogin ? (
                <Login toggleForm={toggleForm} />
            ) : (
                <Signup toggleForm={toggleForm} />
            )}
        </div>
    );
};


export default Auth;