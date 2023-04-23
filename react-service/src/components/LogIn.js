import axios from 'axios';
import React, {useContext, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {makeStyles} from "@material-ui/core/styles";
import {
    TextField,
    Button,
} from "@material-ui/core";
import {ProfileContext} from "./context/PetContext";


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

const Login = ({toggleForm}) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //set pet profile global state
    const {petProfile, setPetProfile} = useContext(ProfileContext);


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const loginUser = async (user) => {
        try {
            const response = await axios.post('http://localhost:3000/login', user, { withCredentials: true });
            console.log('User login:', response.data);
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error login user:', error.response.data);
                throw error.response.data.Error;
            }
            console.log(error)
            throw new Error('I\'m sorry, you cannot login now.')
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let user = {
            username: username,
            password: password
        }
        try {
            user = await loginUser(user)

            /****** set pet profile globally ****/
            setPetProfile(user);

            // set local storage for username and petId
            localStorage.setItem("username", user.username);
            localStorage.setItem("petId", user._id);


            alert('You have successfully login!')
            setTimeout(() => {
                // 👇 Redirects to Home page, note the `replace: true`
                navigate('/', {state: {user: user}});
            }, 1000);
        } catch (e) {
            alert(e)
        }
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