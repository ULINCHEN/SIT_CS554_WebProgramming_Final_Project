const express = require('express');
const router = express.Router();
const data = require('../data');
const validation = require('../validation/pets.js');
const data = require('../data');
const landingData = data.landing;

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
                petId: pet._id.toString()
            }

            res.status(200).json(pet);

        }catch (e) {
            return res.status(400).json({Error: e});
        }
    })
