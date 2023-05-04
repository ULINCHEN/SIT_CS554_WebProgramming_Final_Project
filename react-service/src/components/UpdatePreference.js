import React, {useContext, useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import validation from '../validation/signup';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,

} from "@material-ui/core";
import axios from "axios";
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


function UpdatePreference() {
    const formStyle = useStyles();


    const petStr = sessionStorage.getItem("petInfo");
    const petInfo = JSON.parse(petStr);
    const [preference, setPreference] = useState(petInfo.preference);
    const {petProfile, setPetProfile} = useContext(ProfileContext);

    let historyData = {...petProfile};
    historyData = historyData.preference;

    const handlePreferAgeChange = (event) => {
        setPreference({
            ...preference,
            age: event.target.value
        })
    }

    const handlePreferSexChange = (event) => {
        setPreference({
            ...preference,
            sex: event.target.value
        })
    }

    const handlePreferBreedChange = (event) => {
        setPreference({
            ...preference,
            breed: event.target.value
        })
    }

    const updatePet = async(newPeference) => {
        const petId = sessionStorage.getItem("petId");
        try{
            const res = await axios.patch(`http://localhost:3000/profile/${petId}`, newPeference, { withCredentials: true });
            // console.log(res);
            return res.data;
        }catch (e) {
            throw e;
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const newPet = {
                preference: {}
            };
            if (preference.sex !== historyData.sex) {
                newPet.preference.sex = validation.checkSex(preference.sex);
            }else {
                newPet.preference.sex = historyData.sex;
            }
            if (preference.breed !== historyData.breed) {
                newPet.preference.breed = validation.checkBreed(preference.breed);
            }else {
                newPet.preference.breed = historyData.breed;
            }
            if (preference.age !== historyData.age) {
                newPet.preference.age = validation.checkAge(preference.age);
            }else {
                newPet.preference.age = historyData.age;
            }

            const data = await updatePet(newPet);
            const dataStr = JSON.stringify(data);
            sessionStorage.setItem("petInfo", dataStr);
            setPetProfile(data);
            alert('You have updated your preference!');
        }catch (e) {
            const msg =  e.response && e.response.data && e.response.data.error ? e.response.data.error : e;
            alert(msg);
        }
    }



    return (
        <form className={formStyle.form} onSubmit={handleSubmit}>
            <FormControl className={formStyle.formControl}>
                <InputLabel id="preference-breed-label">Preference Breed</InputLabel>
                <Select
                    className={formStyle.select}
                    labelId="preference-breed-label"
                    id="preferenceBreed"
                    value={preference.breed ? preference.breed : ''}
                    onChange={handlePreferBreedChange}
                >

                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="other">Others</MenuItem>
                    <MenuItem value="">I Don't Care</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={formStyle.formControl}>
                <InputLabel id="preference-sex-label">Preference Sex</InputLabel>
                <Select
                    className={formStyle.select}
                    labelId="preference-sex-label"
                    id="preferenceSex"
                    value={preference.sex ? preference.sex : ''}
                    onChange={handlePreferSexChange}
                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="neutered">Neutered</MenuItem>
                    <MenuItem value="">I Don't Care</MenuItem>
                </Select>
            </FormControl>

            <TextField
                className={formStyle.textField}
                label="Preference Age"
                variant="outlined"
                color="secondary"
                type="number"
                inputProps={{ min: 0 }}
                value={preference.age ? preference.age : ''}
                onChange={handlePreferAgeChange}
            />

            <br/>
            <br/>

            <Button className={formStyle.button} type='submit'>
                Update
            </Button>

            <Button className={formStyle.alButton}>
                Cancel
            </Button>
        </form>
    )

}


export default UpdatePreference;