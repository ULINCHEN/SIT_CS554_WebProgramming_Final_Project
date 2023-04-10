import { pets } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import validation from '../validation/pets.js';
import petsData from './pets.js';
const saltRounds = 10;

const createPet = async(username, email, password) => {
    username = validation.checkUsername(username);
    email = validation.checkEmail(email);
    password = validation.checkPassword(password);

    const petsCol = await pets();

    const petExists = await petsCol.findOne({username: username});
    if (petExists) {
        throw 'Wrong user name and password';
    }

    const hashed_pw = await bcrypt.hash(password, saltRounds);

    let newPet = {
        username: username,
        email: email,
        hashed_password: hashed_pw
    }

    const insertInfo = await petsCol.insertOne(newPet);

    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw 'Could not create a user';
    }

    const newPet_id = insertInfo.insertedId.toString();

    return await petsData.getPetById(newPet_id);
}

const checkUser = async(username, password) => {
    username = validation.checkUsername(username);
    password = validation.checkPassword(password);

    const petsCol = await pets();

    //query the db for username
    const oldUser = await petsCol.findOne({username: username});
    if (!oldUser) {
        throw 'Either the username or password is invalid!';
    }

    //compare the password
    const oldPw = oldUser.hashed_password;
    const compareResult = await bcrypt.compare(password, oldPw);
    if (!compareResult) {
        throw 'Either the username or password is invalid!';
    }
    return await petsData.getPetById(oldUser._id.toString());
}

export default {
    createPet,
    checkUser
}
