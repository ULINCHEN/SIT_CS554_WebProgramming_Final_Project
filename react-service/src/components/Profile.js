import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import axios from "axios";
import { ProfileContext } from "./context/PetContext";
import noImage from "../img/download.jpeg";

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

function Profile() {
  const navigate = useNavigate();
  const formStyle = useStyles();
  const { petProfile, setPetProfile } = useContext(ProfileContext);
  const petStr = sessionStorage.getItem("petInfo");
  const petInfo = JSON.parse(petStr);
  console.log(petInfo);
  console.log(petProfile);

  const historyData = { ...petProfile };

  useEffect(
    () => {
      // Redirect to auth page if user is not logged in
      if (!petProfile) {
        navigate("/auth", { replace: true });
      }
      window.onstorage = (event) => {
        if (event.key === null) {
          window.location.reload();
        }
      };
    },
    petProfile,
    navigate
  );

  if (!petProfile) {
    return (
      <div>
        <h1>Please login first.</h1>
        {/* { alert(`current user is: ${petProfile}`) } */}
        {setTimeout(() => {
          // 👇 Redirects to Auth page
          navigate("/auth");
        }, 1000)}
      </div>
    );
  } else {
    return (
      <Card className={formStyle.form}>
        <CardHeader
          title={historyData.nickname}
          subheader={historyData.breed}
        />
        <CardMedia
          component="img"
          image={historyData.imageURL ? historyData.imageURL : noImage}
        />

        {/* <TextField
          className={formStyle.textField}
          label="Nickname"
          variant="outlined"
          color="secondary"
          value={historyData.nickname}
          InputProps={{
            readOnly: true,
          }}
        /> */}

        <CardContent>
          <TextField
            className={formStyle.textField}
            label="Age"
            variant="outlined"
            color="secondary"
            type="number"
            inputProps={{ min: 0 }}
            value={historyData.age}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Sex"
            variant="outlined"
            color="secondary"
            value={historyData.sex}
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <TextField
          className={formStyle.textField}
          label="Breed"
          variant="outlined"
          color="secondary"
          value={historyData.breed}
          InputProps={{
            readOnly: true,
          }}
        /> */}
          <TextField
            className={formStyle.textField}
            label="Hobbies"
            variant="outlined"
            color="secondary"
            value={historyData.hobbies}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Email"
            variant="outlined"
            color="secondary"
            type="email"
            value={historyData.email}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Location"
            variant="outlined"
            color="secondary"
            value={historyData.location}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Personality"
            variant="outlined"
            color="secondary"
            value={historyData.personality}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Preference Breed"
            variant="outlined"
            color="secondary"
            value={historyData.preference.breed}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Preference Sex"
            variant="outlined"
            color="secondary"
            value={historyData.preference.sex}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className={formStyle.textField}
            label="Preference Age"
            variant="outlined"
            color="secondary"
            type="number"
            value={historyData.preference.age}
            InputProps={{
              readOnly: true,
            }}
          />
        </CardContent>

        <br />
        <Button className={formStyle.button} component={Link} to="/update">
          Update Profile
        </Button>
        <Button className={formStyle.button} component={Link} to="/preference">
          Update Preference
        </Button>
      </Card>
    );
  }
}

export default Profile;
