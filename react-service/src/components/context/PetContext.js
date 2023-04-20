import React, {useState} from 'react';

export const ProfileContext = React.createContext();

export function ProfileProvider(props) {
    const [petProfile, setPetProfile] = useState(undefined);

    return (
        <ProfileContext.Provider value={{petProfile, setPetProfile}}>
            {props.children}
        </ProfileContext.Provider>
    )
}