import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Card, CardContent, CardMedia, Typography, Button, makeStyles, IconButton, Fade } from '@material-ui/core';
import { ProfileContext } from "./context/PetContext";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import dog1 from '../img/dog1.jpeg';
import dog2 from '../img/dog2.jpeg';
import cat1 from '../img/cat1.jpeg';
import cat2 from '../img/cat2.webp';
import pig1 from '../img/pig1.jpeg';
import sheep1 from '../img/sheep1.jpeg';
import '../App.css';


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 800,
        margin: "auto",
        marginTop: theme.spacing(4),
        backgroundColor: "#fff",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
        borderRadius: 20,
        paddingBottom: theme.spacing(2),
    },
    media: {
        height: 600,
        width: 600
    },
    title: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontFamily: 'Open Sans, sans-serif',
        fontSize: '1.2rem',
        margin: '10px 0',
        '& span': {
            color: '#767676',
            marginRight: 10,
        },
    },
    label: {
        fontWeight: "bold",
        marginRight: theme.spacing(1),
        color: "#212121",
    },
    likeButton: {
        background: "#4caf50",
        color: "#fff",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.2)",
        },
        position: "absolute",
        top: "50%",
        right: theme.spacing(10),
        transform: "translateX(-50%)",
    },
    dislikeButton: {
        background: "#f44336",
        color: "#fff",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.2)",
        },
        position: "absolute",
        top: "50%",
        left: theme.spacing(10),
        transform: "translateX(50%)",
    },
    matchButton: {
        background: "#e72400",
        color: "#fff",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
            transform: "scale(1.2)",
        }
    },

}));

const catImages = [cat1,  cat2]
const dogImages = [dog1, dog2]
const otherImages = [pig1, sheep1]

function getRandomImg(breed) {
    if(breed === 'dog') {
        return dogImages[Math.floor(Math.random() * 2)]
    } else if(breed === 'cat') {
        return catImages[Math.floor(Math.random() * 2)]
    } else {
        return otherImages[Math.floor(Math.random() * 2)]
    }
}

function Match() {
    const [entities, setEntities] = useState([]);
    const [currentEntityIndex, setCurrentEntityIndex] = useState(0);
    const [showStartButton, setShowStartButton] = useState(true);
    const { petProfile } = useContext(ProfileContext);
    const classes = useStyles();
    const [buttonCanClick, setButtonCanClick] = useState(true)
    const getMatchPets = async (petProfile) => {
        console.log(petProfile)
        try {
            const response = await axios.get('http://localhost:3000/pets', {
                withCredentials: true,
                params: {
                    breed: petProfile.preference.breed,
                    age: petProfile.preference.age,
                    sex: petProfile.preference.sex,
                },
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('I\'m sorry, cannot return matched pets now.');
        }
    };

    const likePet = async (otherPetId) => {
        console.log(`Liked otherPetId: ${otherPetId}`);
        try {
            const response = await axios.post(
                'http://localhost:3000/pets/like',
                { petId: otherPetId },
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error('I\'m sorry, cannot like the pet now.');
        } finally {
            setButtonCanClick(true)
        }
    };

    const dislikePet = async (otherPetId) => {
        console.log(`Disliked otherPetId: ${otherPetId}`);
        try {
            const response = await axios.post(
                'http://localhost:3000/pets/dislike',
                { petId: otherPetId },
                { withCredentials: true }
            );
            console.log('My Pets: ', response.data);
            return response;
        } catch (error) {
            console.log(error);
            throw new Error('I\'m sorry, cannot dislike the pet now.');
        } finally {
            setButtonCanClick(true)
        }
    };

    const handleStartMatch = async () => {
        setShowStartButton(false);
        const response = await getMatchPets(petProfile);
        console.log(response.data)
        setEntities(response.data);
    };

    const handleLike = async () => {
        const currentEntity = entities[currentEntityIndex];
        const result = await likePet(currentEntity._id);
        if (result.likeEachOther === true) {
            const otherUserNickName = entities[currentEntityIndex].nickname
            alert(`Congratulations, you and the ${otherUserNickName} have successfully liked each other.`)
            alert(`A charRoom with ${otherUserNickName} has been built, you can start chat with him/her.`)
        }
        handleNextEntity();
    };

    const handleDislike = async () => {
        const currentEntity = entities[currentEntityIndex];
        try {
            await dislikePet(currentEntity._id);
        } catch (e) {
            alert(e)
        }
        handleNextEntity();
    };

    const handleNextEntity = () => {
        if (currentEntityIndex < entities.length - 1) {
            setCurrentEntityIndex(currentEntityIndex + 1);
        } else {
            setEntities([]);
            setCurrentEntityIndex(0);
        }
    };

    return (
        <div className="container">
            <br/>
            {showStartButton && <Button className={classes.matchButton} variant="contained" color="primary" onClick={handleStartMatch}>Start Match</Button>}
            {entities.length > 0 ? (
                <div>
                    <Fade in={true} timeout={1000} key={entities[currentEntityIndex]._id}>
                        <Card className={classes.root}>
                            <CardMedia
                                className={classes.media}
                                image={entities[currentEntityIndex].imageURL || getRandomImg(entities[currentEntityIndex].breed)}
                                title={entities[currentEntityIndex].nickname}
                            />
                            <CardContent>
                                <Typography className={classes.title} gutterBottom>
                                    {entities[currentEntityIndex].nickname}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Age:</span>{" "}
                                    {entities[currentEntityIndex].age}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Sex:</span>{" "}
                                    {entities[currentEntityIndex].sex}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Breed:</span>{" "}
                                    {entities[currentEntityIndex].breed}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Personality:</span>{" "}
                                    {entities[currentEntityIndex].personality}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Hobbies:</span>{" "}
                                    {entities[currentEntityIndex].hobbies.join(", ")}
                                </Typography>
                                <Typography className={classes.info} component="div">
                                    <span className={classes.label}>Location:</span>{" "}
                                    {entities[currentEntityIndex].location}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Fade>
                    <IconButton
                        id="like-btn"
                        aria-label="like-button"
                        disabled={!buttonCanClick}
                        className={classes.likeButton}
                        onClick={() => {
                            setButtonCanClick(false)
                            handleLike();
                        }}
                    >
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton
                        id="dislike-btn"
                        aria-label="dislike-button"
                        disabled={!buttonCanClick}
                        className={classes.dislikeButton}
                        onClick={() => {
                            setButtonCanClick(false)
                            handleDislike();
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </div>
            ) : (
                <div>
                    <div>
                        {!showStartButton &&
                            <div>
                                <h2>Opps, no more pets... How about change the preference then match again?</h2>
                                <Button className={classes.matchButton} variant="contained" color="primary" onClick={handleStartMatch}>Match Again</Button>
                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}

export default Match;
