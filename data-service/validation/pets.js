import {ObjectId} from "mongodb";

const exportedMethods = {
    checkUsername(username) {

        if (!username) {
            throw 'Username is not provided!'
        }
        if (typeof username !== 'string') {
            throw 'Username should be a string!'
        }
        username = username.trim();
        if (username === '') {
            throw 'Username cannot be empty string or spaces only!'
        }
        if (username.length < 4) {
            throw 'Username must contain at least 4 characters!'
        }
        const spaceRegex = /\s/;
        if (spaceRegex.test(username)) {
            throw 'Username must not contain space!'
        }
        username = username.toLowerCase();
        const alphanumericRegex = /^\w+$/;
        if (!alphanumericRegex.test(username)) {
            throw 'Username must contain letters and numbers only!'
        }
        return username;

    },

    checkPassword(password) {
        if (!password) {
            throw 'Password is not provided!';
        }
        if (typeof password !== "string") {
            throw 'Password should be a string!'
        }
        password = password.trim();
        if (password === '') {
            throw 'Password cannot be empty string or space only!'
        }
        if (password.length < 6) {
            throw 'Password must contain at least 6 characters!'
        }
        const spaceRegex = /\s/;
        if (spaceRegex.test(password)) {
            throw 'Password must not contain space!'
        }
        const requireRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/;
        if (!requireRegex.test(password)) {
            throw 'Password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, at least 1 special character!'
        }
        return password;
    },

    checkEmail(email) {
        if (!email) {
            throw 'Email is not provided!';
        }
        if (typeof email !== "string") {
            throw 'Email should be a string!'
        }
        email = email.trim();
        if (email === '') {
            throw 'Email cannot be empty string or space only!'
        }
        email = email.toLowerCase();

        const spaceRegex = /\s/;
        if (spaceRegex.test(email)) {
            throw 'Email must not contain space!'
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        if (!emailRegex.test(email)) {
            throw 'Invalid email!'
        }
        return email;
    },


    checkBreed(breed) {
        if(typeof(breed) !== 'string') {
            throw 'breed must be a string';
        }
        breed = breed.trim()
        if (breed.match(/^[a-zA-Z\s]*$/)) {
            return breed
        } else {
            throw 'breed should be alphabetic characters'
        }
    }, 

    checkAge(age) {
        if(!Number.isInteger(age)) {
            throw 'age must be an integer'
        }
        if(age < 0 || age > 30) {
            throw 'age range is invalid, should be 0 to 30'
        }
        return age
    }, 

    checkSex(sex) {
        if(typeof(sex) !== 'string') {
            throw 'sex must be a string';
        }
        sex = sex.trim().toLowerCase()
        if(sex !== 'male' && sex !== 'female' && sex !== 'neutered') {
            throw 'sex must be male, female or neutered'
        }
        return sex
    },

    checkId(id) {
        if (!id) {
            throw 'User ID is not provided!'
        }
        if (typeof id !== 'string') {
            throw 'User ID should be a sting!'
        }
        id = id.trim();
        if (id === '') {
            throw 'User ID cannot be empty string or space only!'
        }
        if (!ObjectId.isValid(id)) {
            throw 'Invalid object ID'
        }
        return id;
    }

}
export default exportedMethods;