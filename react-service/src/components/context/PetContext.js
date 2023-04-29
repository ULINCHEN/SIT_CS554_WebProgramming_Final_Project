import React, {useEffect, useState} from 'react';

export const ProfileContext = React.createContext();

export function ProfileProvider(props) {
    const [petProfile, setPetProfile] = useState(null);

    useEffect(() => {
        const petInfo = localStorage.getItem("petInfo");
        if (petInfo) {
            const pet = JSON.parse(petInfo);
            setPetProfile(pet);
            console.log('setting pet profile...')
        }
    }, [])

    return (
        <ProfileContext.Provider value={{petProfile, setPetProfile}}>
            {props.children}
        </ProfileContext.Provider>
    )
}