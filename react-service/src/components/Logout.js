import React , {useContext}from "react";
import axios from 'axios';
import {Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import {ProfileContext} from "./context/PetContext";

function Logout() {

    const navigate = useNavigate();
    const {petProfile, setPetProfile} = useContext(ProfileContext);

    

    function logout() {
        if (window.confirm('Are you going to log out?')) {
            // localStorage.removeItem("username");
            // localStorage.removeItem("petId");
            logoutUser()
            navigate('/');
        }
    }

    /* This function perform the actual logout in backend service side*/
    async function logoutUser() {
        
        try {
            const response = await axios.get('http://localhost:3000/logout',{ withCredentials: true });
            console.log('User logout:', response.data);
            localStorage.clear();
            console.log(petProfile)
            setPetProfile(undefined)
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error logout user:', error.response.data);
                throw error.response.data.Error;
            }
            console.log(error)
            throw new Error('I\'m sorry, you cannot logout now.')
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                type="submit"
                size="medium"
                onClick={() => {
                    logout();
                }}
            >
                Log out
            </Button>

        </div>
    )
}


export default Logout;