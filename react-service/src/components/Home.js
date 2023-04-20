import React, {useContext} from "react";
import {useNavigate} from 'react-router-dom'
import Logout from "./Logout";
import {ProfileContext} from "./context/PetContext";

const Home = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("username");

    const {petProfile} = useContext(ProfileContext);
    console.log('here is global profile');
    console.log(petProfile);

    if (!user) {

        return (
            <div>
                <h1>Please login first.</h1>
                {setTimeout(() => {
                    // 👇 Redirects to Auth page
                    navigate('/auth');
                }, 1000)}
            </div>
        )
    } else {
        return (
            <div>
                <h1>{`Welcome user ${user}!`}</h1>

                <Logout/>
            </div>
        );
    }

};


export default Home;