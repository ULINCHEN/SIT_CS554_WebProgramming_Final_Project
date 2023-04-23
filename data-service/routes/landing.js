import express from "express";
const router = express.Router();
import data from "../data/index.js";
import validation from "../validation/pets.js";
const landingData = data.landing;

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
    return res.status(400).json({ Error: e });
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
    return res.status(500).json({ Error: e });
  }
});

router.route("/login").post(async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  try {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }

  try {
    const pet = await landingData.checkUser(username, password);

    req.session.pet = {
      petId: pet._id.toString(),
      username: pet.username,
    };
    
    res.status(200).json(pet);
  } catch (e) {
    return res.status(400).json({ Error: e });
  }
});

//暂定update的修改按钮在profile里
router.route("/profile/:id").patch(async (req, res) => {
  const petId = req.params.id;
  let updatePetResult = undefined;
  let updateFields = {};
  if (req.body.email != undefined) {
    updateFields.email = req.body.email;
  }
  if (req.body.nickname != undefined) {
    updateFields.nickname = req.body.nickname;
  }
  if (req.body.breed != undefined) {
    updateFields.breed = req.body.breed;
  }
  if (req.body.age != undefined) {
    updateFields.age = req.body.age;
  }
  if (req.body.sex != undefined) {
    updateFields.sex = req.body.sex;
  }
  if (req.body.DOB != undefined) {
    updateFields.DOB = req.body.DOB;
  }
  if (req.body.hobbies != undefined) {
    updateFields.hobbies = req.body.hobbies;
  }
  if (req.body.personality != undefined) {
    updateFields.personality = req.body.personality;
  }
  if (req.body.preference != undefined) {
    updateFields.preference = req.body.preference;
  }

  if (req.body.location != undefined) {
    updateFields.location = req.body.location;
  }

  try {
    updatePetResult = await landingData.updatePets(petId, updateFields);
  } catch (e) {
    res.status(400).json({ error: e });
    return;
  }
  if (updatePetResult != undefined) {
    res.status(200).json(updatePetResult);
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
  return;
});

router.route("/logout").get(async (req, res) => {
  if (req.session.pet) {
    req.session.destroy();
    res.status(200).json({ Message: "You have been logged out" });
  } else {
    res.status(403).json({Error: 'Please login first'});
  }
  return;
});

export default router;
