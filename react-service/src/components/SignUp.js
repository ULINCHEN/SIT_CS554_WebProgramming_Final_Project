import axios from 'axios';
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import validation from '../validation/signup.js';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Input,
    FormControl,
    InputLabel,

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

const createUser = async (user) => {
    try {
        const response = await axios.post('http://localhost:3000/signup', user);
        console.log('User created:', response.data);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            console.log('Error creating user:', error.response.data);
            throw error.response.data.Error;
        }
        throw new Error("Cannot create user")
    }
};

function SignUp({ toggleForm }) {
    const classes = useStyles();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [age, setAge] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [personality, setPersonality] = useState("");
    const [location, setLocation] = useState("");
    const [DOB, setDOB] = useState('');
    const [preferenceBreed, setPreferenceBreed] = useState("");
    const [preferenceSex, setPreferenceSex] = useState("");
    const [preferenceAge, setPreferenceAge] = useState("");



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };
    const handleDOBChange = (event) => {
        const dob = new Date(event.target.value); 
        const currentDate = new Date();

        const diffInMs = currentDate.getTime() - dob.getTime();

        const age = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));

        setDOB(event.target.value);
        setAge(age);
    };
    const handleAgeChange = (event) => {
        setAge(event.target.value);
    };

    const handleSexChange = (event) => {
        setSex(event.target.value);
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };

    const handleHobbiesChange = (event) => {
        setHobbies(event.target.value);
    };

    const handlePersonalityChange = (event) => {
        setPersonality(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handlePreferenceBreedChange = (event) => {
        setPreferenceBreed(event.target.value);
    };

    const handlePreferenceSexChange = (event) => {
        setPreferenceSex(event.target.value);
    };
    const handlePreferenceAgeChange = (event) => {
        setPreferenceAge(event.target.value);
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        let newUser = undefined
        let preference = undefined

        try {
            preference = {
                breed: validation.checkPreferenceBreed(preferenceBreed),
                age: validation.checkPreferenceAge(preferenceAge),
                sex: validation.checkPreferenceSex(preferenceSex)
            }
            newUser = {
                username: validation.checkUsername(username),
                password: validation.checkPassword(password, confirmPassword),
                email: validation.checkEmail(email),
                nickname: validation.checkNickname(nickname),
                age: validation.checkAge(age),
                DOB: validation.checkDOB(DOB),
                sex: validation.checkSex(sex),
                breed: validation.checkBreed(breed),
                hobbies: validation.checkHobbies(hobbies),
                personality: validation.checkPersonality(personality),
                location: validation.checkLocation(location),
                preference: preference
            }
            // console.log(newUser)
            /* Here do axios call to store new user into database */
            await createUser(newUser)
            alert('You have successfully create an account!')
            toggleForm() // redirect to login page
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
            <TextField
                className={classes.textField}
                label="Confirm Password"
                variant="outlined"
                color="secondary"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
            />
            <TextField
                className={classes.textField}
                label="Email"
                variant="outlined"
                color="secondary"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <TextField
                className={classes.textField}
                label="Nickname"
                variant="outlined"
                color="secondary"
                value={nickname}
                onChange={handleNicknameChange}
                required
            />
            <TextField
                className={classes.textField}
                label="Location"
                variant="outlined"
                color="secondary"
                value={location}
                onChange={handleLocationChange}
            />
            {/* <TextField
                className={classes.textField}
                label="Age"
                variant="outlined"
                color="secondary"
                type="number"
                inputProps={{ min: 0 }}
                value={age}
                onChange={handleAgeChange}
                required
            /> */}
            <TextField
                className={classes.textField}
                label="Date Of Birth"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={DOB}
                onChange={handleDOBChange}
                required
            />
            <FormControl className={classes.formControl}>
                <InputLabel id="sex-label" required >Sex</InputLabel>
                <Select
                    className={classes.select}

                    labelId="sex-label"
                    id="sex"
                    value={sex}
                    onChange={handleSexChange}

                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="neutered">Neutered</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="breed-label" required>Breed</InputLabel>
                <Select
                    className={classes.select}
                    labelId="breed-label"
                    id="breed"
                    value={breed}
                    onChange={handleBreedChange}
                    required
                >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="hobbies-label">Hobbies</InputLabel>
                <Select
                    className={classes.select}
                    labelId="hobbies-label"
                    id="hobbies"
                    multiple
                    value={hobbies}
                    onChange={handleHobbiesChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                    required
                >
                    <MenuItem value="swimming">Swimming</MenuItem>
                    <MenuItem value="running">Running</MenuItem>
                    <MenuItem value="walking">Walking</MenuItem>
                    <MenuItem value="sleeping">Sleeping</MenuItem>
                    <MenuItem value="eating">Eating</MenuItem>
                    <MenuItem value="surfing">Surfing</MenuItem>
                    <MenuItem value="lounging">Lounging</MenuItem>
                    <MenuItem value="jumping">Jumping</MenuItem>
                    <MenuItem value="posing">Posing</MenuItem>
                    <MenuItem value="socializing">Socializing</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="personality-label">Personality</InputLabel>
                <Select
                    className={classes.select}
                    labelId="personality-label"
                    id="personality"
                    value={personality}
                    onChange={handlePersonalityChange}
                    required
                >
                    <MenuItem value="friendly">Friendly</MenuItem>
                    <MenuItem value="shy">Shy</MenuItem>
                    <MenuItem value="outgoing">Outgoing</MenuItem>
                    <MenuItem value="aggressive">Aggressive</MenuItem>
                    <MenuItem value="confident">Confident</MenuItem>
                    <MenuItem value="adaptable">Adaptable</MenuItem>
                    <MenuItem value="insecure">Insecure</MenuItem>
                    <MenuItem value="independent">Independent</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="preference-breed-label">Preference Breed</InputLabel>
                <Select
                    className={classes.select}
                    labelId="preference-breed-label"
                    id="preferenceBreed"
                    value={preferenceBreed}
                    onChange={handlePreferenceBreedChange}
                >

                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="other">Others</MenuItem>
                    <MenuItem value="">I Don't Care</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="preference-sex-label">Preference Sex</InputLabel>
                <Select
                    className={classes.select}
                    labelId="preference-sex-label"
                    id="preferenceSex"
                    value={preferenceSex}
                    onChange={handlePreferenceSexChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="neutered">Neutered</MenuItem>
                    <MenuItem value="">I Don't Care</MenuItem>
                </Select>
            </FormControl>

            <TextField
                className={classes.textField}
                label="Preference Age"
                variant="outlined"
                color="secondary"
                type="number"
                inputProps={{ min: 0 }}
                value={preferenceAge}
                onChange={handlePreferenceAgeChange}
            />

            <Button className={classes.button} variant="contained" color="primary" type="submit">
                Sign Up
            </Button>
            <Button className={classes.altButton} onClick={toggleForm}>
                Already Have An Account
            </Button>
        </form>
    );
}


export default SignUp;