import express from "express";

const router = express.Router();
import data from "../data/index.js";
import validation from "../validation/pets.js";

const landingData = data.landing;
import multer from 'multer';
import {v4 as uuid} from 'uuid';

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});
let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


router.route("/signup").post(async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    let nickname = req.body.nickname;
    let breed = req.body.breed;
    let age = req.body.age;
    let sex = req.body.sex;
    let DOB = req.body.DOB;
    let hobbies = req.body.hobbies;
    let personality = req.body.personality;
    let preference = req.body.preference;
    let location = req.body.location;

    try {
        username = validation.checkUsername(username);
        email = validation.checkEmail(email);
        password = validation.checkPassword(password);
        nickname = validation.checkNickname(nickname);
        breed = validation.checkBreed(breed);
        age = validation.checkAge(age);
        sex = validation.checkSex(sex);
        DOB = validation.checkDOB(DOB);
        hobbies = validation.checkHobbies(hobbies);
        personality = validation.checkPersonality(personality);
        preference = validation.checkPreferences(preference);
        location = validation.checkLocation(location);
    } catch (e) {
        return res.status(400).json({Error: e});
    }

    try {
        const newPet = await landingData.createPet(
            username,
            email,
            password,
            nickname,
            breed,
            age,
            sex,
            DOB,
            hobbies,
            personality,
            preference,
            location
        );

        res.status(200).json(newPet);
    } catch (e) {
        return res.status(500).json({Error: e});
    }
});

router.route("/login").post(async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        username = validation.checkUsername(username);
        password = validation.checkPassword(password);
    } catch (e) {
        return res.status(400).json({Error: e});
    }

    try {
        const pet = await landingData.checkUser(username, password);

        req.session.pet = {
            petId: pet._id.toString(),
            username: pet.username,
        };

        res.status(200).json(pet);
    } catch (e) {
        return res.status(400).json({Error: e});
    }
});

//暂定update的修改按钮在profile里
router.patch("/profile/:id", upload.single('imageURL'), async (req, res) => {
    if (!req.session.pet) {
        return res
            .status(400)
            .json({Error: "You can't update if you're not logged in"});
    }
    const petId = req.params.id;
    if (petId !== req.session.pet.petId) {
        return res
            .status(400)
            .json({Error: "The pet you update is not your pet!!!"});
    }

    let updatePetResult = undefined;
    let updateFields = {};
    if (req.body.email !== undefined) {
        updateFields.email = req.body.email;
    }
    if (req.body.nickname !== undefined) {
        updateFields.nickname = req.body.nickname;
    }
    if (req.body.breed !== undefined) {
        updateFields.breed = req.body.breed;
    }
    if (req.body.age !== undefined) {
        updateFields.age = req.body.age;
    }
    if (req.body.sex !== undefined) {
        updateFields.sex = req.body.sex;
    }
    if (req.body.DOB !== undefined) {
        updateFields.DOB = req.body.DOB;
    }
    if (req.body.hobbies !== undefined) {
        updateFields.hobbies = req.body.hobbies.split(',');
    }
    if (req.body.personality !== undefined) {
        updateFields.personality = req.body.personality;
    }
    if (req.body.preference !== undefined) {
        updateFields.preference = req.body.preference;
    }

    if (req.body.location !== undefined) {
        updateFields.location = req.body.location;
    }

    const url = req.protocol + '://' + req.get('host');
    console.log('the req file: ', req.file);
    updateFields.imageURL = url + '/public/' + req.file.filename;

    try {
        updatePetResult = await landingData.updatePets(petId, updateFields);
    } catch (e) {
        res.status(400).json({Error: e});
        return;
    }
    if (updatePetResult !== undefined) {
        res.status(200).json(updatePetResult);
    } else {
        res.status(500).json({Error: "Internal Server Error"});
    }
    return;
});

router.route("/logout").get(async (req, res) => {
    if (req.session.pet) {
        req.session.destroy();
        res.status(200).json({Message: "You have been logged out"});
    } else {
        res.status(403).json({Error: "Please login first"});
    }
    return;
});

export default router;
