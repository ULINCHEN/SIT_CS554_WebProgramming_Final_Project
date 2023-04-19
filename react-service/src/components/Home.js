import React from "react";
import { useLocation, useNavigate } from 'react-router-dom'
const Home = () => {
    console.log('You are in Home Com');
   const location = useLocation();
   const navigate = useNavigate();
   if(!user) {
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
            <h1>{`Welcome user ${user.nickname}!`}</h1>
        </div>
    );
   }
    
};


export default Home;