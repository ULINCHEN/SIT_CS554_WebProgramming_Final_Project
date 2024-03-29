import { pets } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcryptjs";
import validation from "../validation/pets.js";
import petsData from "./pets.js";
const saltRounds = 10;

const createPet = async (
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
) => {
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

  const petsCol = await pets();

  const petExists = await petsCol.findOne({ username: username });
  if (petExists) {
    throw "Username Already Exist!";
  }

  const hashed_pw = await bcrypt.hash(password, saltRounds);

  let newPet = {
    username: username,
    email: email,
    hashed_password: hashed_pw,
    nickname: nickname,
    breed: breed,
    age: age,
    sex: sex,
    DOB: DOB,
    hobbies: hobbies,
    personality: personality,
    preference: preference,
    location: location,
    imageURL: null,
    liked: [],
    disliked: [],
    likedMe: [],
    chatRoom: [],
  };

  const insertInfo = await petsCol.insertOne(newPet);

  if (!insertInfo.acknowledged || !insertInfo.insertedId) {
    throw "Could not create a user";
  }

  const newPet_id = insertInfo.insertedId.toString();

  return await petsData.getPetById(newPet_id);
};

const checkUser = async (username, password) => {
  username = validation.checkUsername(username);
  password = validation.checkPassword(password);

  const petsCol = await pets();

  //query the db for username
  const oldUser = await petsCol.findOne({ username: username });
  if (!oldUser) {
    throw "Either the username or password is invalid!";
  }

  //compare the password
  const oldPw = oldUser.hashed_password;
  const compareResult = await bcrypt.compare(password, oldPw);
  if (!compareResult) {
    throw "Either the username or password is invalid!";
  }
  return await petsData.getPetById(oldUser._id.toString());
};

const getPetsById = async (id) => {
  const petsCol = await pets();
  let pet = await petsCol.findOne({ _id: ObjectId(id) });
  if (pet === null) throw "No recipe with that id";
  delete pet.hashed_password;
  return pet;
};

const updatePets = async (id, updateFields) => {
  const oldPet = await petsData.getPetById(id);
  console.log(oldPet);
  let newPet = {};
  let numOfFieldToUpdate = 0;
  if (updateFields.email != undefined && updateFields.email !== oldPet.email) {
    newPet.email = validation.checkEmail(updateFields.email);
    numOfFieldToUpdate++;
  } else {
    updateFields.email = oldPet.email;
  }
  if (
    updateFields.nickname != undefined &&
    updateFields.nickname !== oldPet.nickname
  ) {
    newPet.nickname = validation.checkNickname(updateFields.nickname);
    numOfFieldToUpdate++;
  } else {
    updateFields.nickname = oldPet.nickname;
  }
  if (updateFields.breed != undefined && updateFields.breed !== oldPet.breed) {
    newPet.breed = validation.checkBreed(updateFields.breed);
    numOfFieldToUpdate++;
  } else {
    updateFields.breed = oldPet.breed;
  }
  if (updateFields.sex != undefined && updateFields.sex !== oldPet.sex) {
    newPet.sex = validation.checkSex(updateFields.sex);
    numOfFieldToUpdate++;
  } else {
    updateFields.sex = oldPet.sex;
  }
  if (updateFields.age != undefined && updateFields.age !== oldPet.age) {
    newPet.age = validation.checkAge(updateFields.age);
    numOfFieldToUpdate++;
  } else {
    updateFields.age = oldPet.age;
  }
  if (updateFields.DOB != undefined && updateFields.DOB !== oldPet.DOB) {
    newPet.DOB = validation.checkDOB(updateFields.DOB);
    numOfFieldToUpdate++;
  } else {
    updateFields.DOB = oldPet.DOB;
  }
  if (
    updateFields.hobbies != undefined &&
    updateFields.hobbies !== oldPet.hobbies
  ) {
    newPet.hobbies = validation.checkHobbies(updateFields.hobbies);
    numOfFieldToUpdate++;
  } else {
    updateFields.hobbies = oldPet.hobbies;
  }
  if (
    updateFields.personality != undefined &&
    updateFields.personality !== oldPet.personality
  ) {
    newPet.personality = validation.checkPersonality(updateFields.personality);
    numOfFieldToUpdate++;
  } else {
    updateFields.personality = oldPet.personality;
  }
  if (
    updateFields.preference != undefined &&
    updateFields.preference !== oldPet.preference
  ) {
    newPet.preference = validation.checkPreferences(updateFields.preference);
    numOfFieldToUpdate++;
  } else {
    updateFields.preference = oldPet.preference;
  }

  if (
    updateFields.location != undefined &&
    updateFields.location !== oldPet.location
  ) {
    newPet.location = validation.checkLocation(updateFields.location);
    numOfFieldToUpdate++;
  } else {
    updateFields.location = oldPet.location;
  }

  if (
    updateFields.imageURL != undefined &&
    updateFields.imageURL !== oldPet.imageURL
  ) {
    newPet.imageURL = validation.checkimage(updateFields.imageURL);
    numOfFieldToUpdate++;
  } else {
    updateFields.imageURL = oldPet.imageURL;
  }

  if (numOfFieldToUpdate == 0) {
    throw "there is nothing need to update";
  }
  const petsCol = await pets();
  const updateInfo = await petsCol.updateOne(
    { _id: ObjectId(id) },
    { $set: newPet }
  );
  if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
    throw "Update failed";

  return await petsData.getPetById(id);
};

export default {
  createPet,
  checkUser,
  updatePets,
  getPetsById,
};
