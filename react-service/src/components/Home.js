import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";
import { ProfileContext } from "./context/PetContext";
import Match from "./Match";

const Home = () => {
  const navigate = useNavigate();

  const { petProfile, setPetProfile } = useContext(ProfileContext); // petProfile from context
  const petProfileFromLocalStorage = JSON.parse(
    sessionStorage.getItem("petProfile")
  );
  useEffect(() => {
    // Redirects to auth page if user is already loggle out
    if (!petProfile && !petProfileFromLocalStorage) {
      navigate("/auth", { replace: true });
    }
    window.onstorage = (event) => {
      if (event.key === null) {
        window.location.reload();
      }
    };
  }, [petProfile, navigate, setPetProfile, petProfileFromLocalStorage]);

  useEffect(() => {
    if (!petProfile && petProfileFromLocalStorage) {
      console.log(
        "petProfile from context is undefined, user probably reflesh the page. Used petProfile from sessionStorage to set context petProfile "
      );
      setPetProfile(petProfileFromLocalStorage);
    }
  }, [petProfile, setPetProfile, petProfileFromLocalStorage]);

  if (!petProfile && !petProfileFromLocalStorage) {
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
      <div>
        <h1>{`Welcome ${
          petProfile ? petProfile.nickname : petProfileFromLocalStorage.nickname
        }!`}</h1>
        <div>
          <Logout />
        </div>
        <div>
          <Match />
        </div>
      </div>
    );
  }
};

export default Home;
