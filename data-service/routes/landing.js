import express from "express";
const router = express.Router();
import data from '../data/index.js';
import validation from '../validation/pets.js'
const landingData = data.landing;


router
    .route('/signup')
    .post( async (req, res) => {
        let username = req.body.username;
        let email = req.body.email;
        let password = req.body.password;

        try {
            username = validation.checkUsername(username);
            email = validation.checkEmail(email);
            password = validation.checkPassword(password);
        }catch (e) {
            return res.status(400).json({Error: e});
        }

        try {
            const newPet = await landingData.createPet(username, email, password);

            res.status(200).json(newPet);
        }catch (e) {
            return res.status(500).json({Error: e});
        }
    })

router
    .route('/login')
    .post(async (req, res) => {
        let username = req.body.username;
        let password = req.body.password;

        try{
            username = validation.checkUsername(username);
            password = validation.checkPassword(password);
        }catch (e) {
            return res.status(400).json({Error: e});
        }

        try{
            const pet = await landingData.checkUser(username, password);

            req.session.pet = {
                petId: pet._id.toString(),
                username: pet.username
            }

            res.status(200).json(pet);

        }catch (e) {
            return res.status(400).json({Error: e});
        }
    })


router
    .route('/logout')
    .post(async (req, res) => {
        res.session.destroy();
        res.status(200).json({Message: 'You have been logged out'});
    })

export default router;