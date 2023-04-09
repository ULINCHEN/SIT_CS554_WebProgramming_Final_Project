import { pets } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
const bcrypt = require('bcryptjs');
import validation from '../validation/pets.js';
const petsData = require('pets.js');

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

module.exports = {
    checkUser
}
