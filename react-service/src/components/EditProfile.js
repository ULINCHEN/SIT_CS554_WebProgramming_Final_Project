import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import validation from '../validation/signup';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Input,
    FormControl,
    InputLabel,
    Checkbox, FormControlLabel,

} from "@material-ui/core";
import axios from "axios";

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


function EditProfile(props) {
    const formStyle = useStyles();

    const [email, setEmail] = useState(props.email);
    const [nickname, setNickname] = useState(props.nickname);
    const [age, setAge] = useState(props.age);
    const [sex, setSex] = useState(props.sex);
    const [breed, setBreed] = useState(props.breed);
    const [hobbies, setHobbies] = useState(props.hobbies);
    const [personality, setPersonality] = useState(props.personality);
    const [location, setLocation] = useState(props.location);
    const [DOB, setDOB] = useState(props.DOB);

    const historyData = {
        email: props.email,
        nickname: props.nickname,
        age: props.age,
        sex: props.sex,
        breed: props.brees,
        hobbies: props.hobbies,
        personality: props.personality,
        location: props.location,
        DOB: props.DOB
    }

    const allHobbies = ['Swimming', 'Running', 'Walking', 'Sleeping', 'Eating', 'Surfing', 'Lounging', 'Jumping', 'Posing', 'Socializing'];


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleAgeChange = (event) => {
        setAge(event.target.value);
    }

    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    }

    const handleDOBChange = (event) => {
        setDOB(event.target.value);
    }

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    }

    const handleSexChange = (event) => {
        setSex(event.target.value);
    }

    const handlePersonalityChange = (event) => {
        setPersonality(event.target.value);
    }

    function handleSelectAllCheckboxChange(event) {
        if (event.target.checked) {
            setHobbies(allHobbies);
        } else {
            setHobbies([]);
        }
    }

    const handleCheckboxChange = (event) => {
        const label = event.target.value;
        if (hobbies.includes(label)) {
            setHobbies(hobbies.filter(item => item !== label));
        } else {
            setHobbies([...hobbies, label]);
        }
    }

    function handleDeleteButtonClick() {
        setHobbies([]);
    }

    const updatePet = async(newPet) => {
        const petId = props.petId;
        try{
            const res = await axios.patch(`http://localhost:3000/profile/${petId}`, newPet);
            console.log(res);
            return res.data;
        }catch (e) {
            throw e;
        }

    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            const newPet = {};

            if (historyData.email !== email) {
                newPet.email = validation.checkEmail(email);
            }
            if (historyData.nickname !== nickname) {
                newPet.nickname = validation.checkNickname(nickname);
            }
            if (historyData.age !== age){
                newPet.age = validation.checkAge(age);
            }
            if (historyData.sex !== sex) {
                newPet.sex = validation.checkSex(sex);
            }
            if (historyData.breed !== breed) {
                newPet.breed = validation.checkBreed(breed)
            }
            if (historyData.personality !== personality) {
                newPet.personality = validation.checkPersonality(personality)
            }
            if (historyData.DOB !== DOB) {
                newPet.DOB = validation.checkDOB(DOB);
            }
            if (!validation.compareHobbies(historyData.hobbies, hobbies)) {
                newPet.hobbies = hobbies;
            }

            const data = await updatePet(newPet);
            alert('You have updated your profile!');

            // need to update user new data to profile page

        } catch (e) {
            alert(e);
        }
    }


    return (
        <form className={formStyle.form} onSubmit={handleSubmit}>
            <TextField
                className={formStyle.textField}
                label="Email"
                variant="outlined"
                color="secondary"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
            />
            <TextField
                className={formStyle.textField}
                label="Nickname"
                variant="outlined"
                color="secondary"
                value={nickname}
                onChange={handleNicknameChange}
                required
            />
            <TextField
                className={formStyle.textField}
                label="Location"
                variant="outlined"
                color="secondary"
                value={location}
                onChange={handleLocationChange}
            />
            <TextField
                className={formStyle.textField}
                label="Age"
                variant="outlined"
                color="secondary"
                type="number"
                inputProps={{min: 0}}
                value={age}
                onChange={handleAgeChange}
                required
            />
            <TextField
                className={formStyle.textField}
                label="Date Of Birth"
                type="date"
                InputLabelProps={{
                    shrink: true,
                }}
                value={DOB}
                onChange={handleDOBChange}
                required
            />
            <FormControl className={formStyle.formControl}>
                <InputLabel id="sex-label" required>Sex</InputLabel>
                <Select
                    className={formStyle.select}

                    labelId="sex-label"
                    id="updateSex"
                    value={sex}
                    onChange={handleSexChange}

                >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="neutered">Neutered</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={formStyle.formControl}>
                <InputLabel id="breed-label" required>Breed</InputLabel>
                <Select
                    className={formStyle.select}
                    labelId="breed-label"
                    id="updateBreed"
                    value={breed}
                    onChange={handleBreedChange}
                    required
                >
                    <MenuItem value="dog">Dog</MenuItem>
                    <MenuItem value="cat">Cat</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                </Select>
            </FormControl>

            {/*here is the hobbies checkbox*/}
            <FormControl className={formStyle.formControl}>
                <InputLabel id='update-hobbies'>Hobbies</InputLabel>
                <br/>
                <br/>

                <FormControlLabel control={
                    <Checkbox
                        checked={hobbies.length === 10}
                        indeterminate={hobbies.length > 0 && hobbies.length < 4}
                        onChange={handleSelectAllCheckboxChange}
                    />
                } label='Select All'/>

                {allHobbies.map((item, index) => (
                    <FormControlLabel key={index}
                                      control={
                                          <Checkbox
                                              checked={hobbies.includes(item)}
                                              onChange={handleCheckboxChange}
                                              name={`checkbox${index}`}
                                              value={item}
                                          />
                                      }
                                      label={item}
                    />
                ))}

                <FormControlLabel
                    control={
                        <Button variant="contained" color="secondary" onClick={handleDeleteButtonClick}>
                            Delete Checked Items</Button>
                    }
                    label=""
                />
            </FormControl>

            <FormControl className={formStyle.formControl}>
                <InputLabel id="personality-label">Personality</InputLabel>
                <Select
                    className={formStyle.select}
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

            <br/>
            <br/>

            <Button className={formStyle.button} type='submit'>
                Update
            </Button>

            <Button className={formStyle.alButton}>
                Cancel
            </Button>

        </form>
    );

}


export default EditProfile;