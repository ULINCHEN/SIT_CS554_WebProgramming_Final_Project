const express = require('express');
const router = express.Router();
const data = require('../data');
const petsData = data.pets;
const validation = require('../validation/pets.js');



router
    .route('/pets')
    .get(async(req, res) => {

    })

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

            return res.status(200).json(pet);
        }catch (e) {
            return res.status(404).json({Error: `Pet with id: ${id} does not found!`});
        }

    })