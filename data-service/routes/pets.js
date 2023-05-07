import express from "express";
import data from '../data/index.js';
import validation from '../validation/pets.js';

const router = express.Router();
const petsData = data.pets;

import redis from 'redis';
const redisClient = redis.createClient({ legacyMode: true });

// // This config redisClient is for docker only
// const redisClient = redis.createClient({
//     legacyMode: true,
//     socket: {
//         port: 6379,
//         host: 'redis'
//      }
// }); 

redisClient.connect().then(() => {});


/////////////////// get all pets by preference ///////////////////
router
    .route('/')
    .get(async (req, res) => {
        const petId = req.session.pet.petId;
        console.log(req.query)
        let breed = req.query.breed;
        let age = req.query.age;
        let sex = req.query.sex;

        try{
            breed = validation.checkBreed(breed);
            age = validation.checkAge(age);
            sex = validation.checkSex(sex);
        }catch (e) {
            return res.status(400).json({Error: e});
        }

        try {
            const preferredPets = await petsData.getAllPetsByPreferences(petId, breed, age, sex);

            return res.status(200).json(preferredPets);
        }catch (e) {
            return res.status(500).json({Error: e});
        }
    })


/////////////////// get pet by id ///////////////////
router
    .route('/:id')
    .get(async (req, res) => {
        let id = req.params.id;

        try {
            id = validation.checkId(id);
        }catch (e) {
            return res.status(400).json({Error: 'Invalid user Id!'});
        }

        try {
            const pet = await petsData.getPetById(id);
            /********************* save to redis cache before return ********************/
            console.log('Showing pet from database...');
            const petStr = JSON.stringify(pet);
            const setRes = await redisClient.v4.set(id, petStr);
            console.log(setRes);

            return res.status(200).json(pet);
        }catch (e) {
            return res.status(404).json({Error: `Pet with id: ${id} does not found!`});
        }

    })


/////////////////// like pets ////////////////////////
router
    .route('/like')
    .post(async (req, res) => {
        const myPetId = req.session.pet.petId;
        let otherPetId = req.body.petId;

        try{
            otherPetId = validation.checkId(otherPetId);
        }catch (e) {
            return res.status(400).json({Error: e});
        }

        try{
            let myPet = await petsData.likePet(myPetId, otherPetId);
            myPet = myPet.pet
            /********************* update to redis cache before return ********************/
            if (await redisClient.v4.exists(myPetId)) {
                console.log('Updating pet in redis...');
                const petStr = JSON.stringify(myPet);
                const setRes = await redisClient.v4.set(myPetId, petStr);
                console.log(setRes);
            }

            res.status(200).json(myPet);
        }catch (e) {
            return res.status(500).json({Error: e});
        }
    })


/////////////////// dislike pets ///////////////////
router
    .route('/dislike')
    .post(async (req, res) => {
        const myPetId = req.session.pet.petId;
        let otherPetId = req.body.petId;

        try{
            otherPetId = validation.checkId(otherPetId);
        }catch (e) {
            return res.status(400).json({Error: e});
        }

        try{
            const myPet = await petsData.disLikePet(myPetId, otherPetId);

            res.status(200).json(myPet);
        }catch (e) {
            return res.status(500).json({Error: e});
        }

    })


export default router;