import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import validation from '../validation/signup';
import {
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
    Checkbox, FormControlLabel, CardMedia,

} from "@material-ui/core";
import axios from "axios";
import {ProfileContext} from "./context/PetContext";
import noImage from '../img/download.jpeg';
import { Link, useNavigate } from "react-router-dom";

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


function EditProfile() {
    const formStyle = useStyles();
    const navigate = useNavigate();

    const {petProfile, setPetProfile} = useContext(ProfileContext);

    const petStr = sessionStorage.getItem("petInfo");
    const petInfo = JSON.parse(petStr);

    const dateString = petInfo.DOB;
    const year = dateString.substring(4);
    const day = dateString.substring(2, 4);
    const month = dateString.substring(0, 2);

    const dateObj = new Date(`${year}-${month}-${day}`);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;

    // console.log(formattedDate);

    const [email, setEmail] = useState(petInfo.email);
    const [nickname, setNickname] = useState(petInfo.nickname);
    const [age, setAge] = useState(petInfo.age);
    const [sex, setSex] = useState(petInfo.sex);
    const [breed, setBreed] = useState(petInfo.breed);
    const [hobbies, setHobbies] = useState(petInfo.hobbies);
    const [personality, setPersonality] = useState(petInfo.personality);
    const [location, setLocation] = useState(petInfo.location);
    const [DOB, setDOB] = useState(formattedDate);
    const [image, setImage] = useState(petInfo.imageURL);
    const [showImg, setShowImg] = useState(petInfo.imageURL);

    const historyData = {...petProfile};

  const allHobbies = [
    "swimming",
    "running",
    "walking",
    "sleeping",
    "eating",
    "surfing",
    "lounging",
    "jumping",
    "posing",
    "socializing",
  ];

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

    const handleImageChange = (event) => {
        // console.log(event.target.value);
        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();

        reader.onloadend = function () {
            setShowImg(reader.result);
        }

        if (file) {
            reader.readAsDataURL(file);
        } else {
            setShowImg(null);
        }
        console.log(event.target.files);
        setImage(event.target.files[0]);
        console.log(image);
    }

    function handleDeleteButtonClick() {
        setHobbies([]);
    }

    const updatePet = async(newPet) => {
        const petId = sessionStorage.getItem("petId");
        try{
            const res = await axios.patch(`http://localhost:3000/profile/${petId}`, newPet, { withCredentials: true });
            // console.log(res);
            return res.data;
        }catch (e) {
            throw e;
        }

    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const newPet = new FormData();

            if (historyData.email !== email) {
                newPet.append('email', validation.checkEmail(email));
            }
            if (historyData.nickname !== nickname) {
                newPet.append('nickname', validation.checkNickname(nickname));
            }
            if (historyData.age !== age){
                newPet.append('age', validation.checkAge(age));
            }
            if (historyData.sex !== sex) {
                newPet.append('sex', validation.checkSex(sex));
            }
            if (historyData.breed !== breed) {
                newPet.append('breed', validation.checkBreed(breed));
            }
            if (historyData.personality !== personality) {
                newPet.append('personality', validation.checkPersonality(personality));
            }
            if (historyData.DOB !== DOB) {
                newPet.append('DOB',  validation.checkDOB(DOB));
            }
            if (!validation.compareHobbies(historyData.hobbies, hobbies)) {
                newPet.append('hobbies', hobbies);
            }
            if (image !== historyData.imageURL) {
                newPet.append('imageURL', image);
            }

            const data = await updatePet(newPet);
            setPetProfile(data);
            sessionStorage.setItem("petInfo", JSON.stringify(data));
            alert('You have updated your profile!');
        } catch (e) {
            const msg = e.response && e.response.data && e.response.data.Error ? e.response.data.Error : e;
            alert(msg);
        }
        navigate("/profile");
    }



    return (
        <form className={formStyle.form} onSubmit={handleSubmit}>
            <CardMedia
                component="img"
                image={showImg ? showImg : noImage}
                alt="user image"
            />

            <br/>
            <div>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                />
            </div>
            <br/>

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
                    <MenuItem value="other">Others</MenuItem>
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
                        <Button variant="outlined" color="secondary" onClick={handleDeleteButtonClick}>
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

            <Button className={formStyle.alButton} component={Link} to="/profile">
                Cancel
            </Button>

        </form>
    );

}


export default EditProfile;