import React from "react";
import {Button} from "@material-ui/core";
import {useNavigate} from "react-router-dom";

function Logout() {

    const navigate = useNavigate();

    function logout() {
        if (window.confirm('Are you going to log out?')) {
            localStorage.removeItem("username");
            localStorage.removeItem("petId");
            navigate('/');
        }
    }

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