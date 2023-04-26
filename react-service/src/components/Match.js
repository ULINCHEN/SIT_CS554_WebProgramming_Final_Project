import React, { useState } from 'react';
import axios from 'axios';

function Match({petProfile}) {
    const [entities, setEntities] = useState([]);
    const [currentEntityIndex, setCurrentEntityIndex] = useState(0);
    const [showStartButton, setShowStartButton] = useState(true);

    const getMatchPets = async (petProfile) => {
        console.log(petProfile)
        try {
            const response = await axios.get('http://localhost:3000/pets', {
                 withCredentials: true ,
                params: {
                    breed: petProfile.preference.breed,
                    age: petProfile.preference.age,
                    sex: petProfile.preference.sex
                }}
                
            );
            console.log('Matched Pets: ', response.data);
            return response;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log('Error return matched Pets:', error.response.data);
                throw error.response.data.Error;
            }
            console.log(error)
            throw new Error('I\'m sorry, cannot return matched pets now.')
        }
    };
    const handleStartMatch = async () => {
        setShowStartButton(false);
        const response = await getMatchPets(petProfile)
        setEntities(response.data);
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
        <div>
            {showStartButton && <button onClick={handleStartMatch}>Start Match</button>}
            {entities.length > 0 ? (
                <div>
                    <h2>Entity {currentEntityIndex + 1}</h2>
                    <p>{JSON.stringify(entities[currentEntityIndex])}</p>
                    <button onClick={handleNextEntity}>Next</button>
                </div>
            ) : (
                <p>No more entities</p>
            )}
        </div>
    );
}

export default Match;