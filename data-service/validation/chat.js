import { ObjectId } from 'mongodb';

const checkString = (str, varName) => {
    if (!str) throw `You must provide a ${varName}`;
    if (typeof str !== 'string') throw `The ${varName} must be a string`;
    str = str.trim();
    if (str.length === 0)
        throw `The ${varName} cannot be an empty string or just spaces`;
    return str;
};

const checkUsername = (username) => {
    username = checkString(username, 'username');
    username = username.toLowerCase(); //fix
    if (!/^[0-9a-z]+$/.test(username)) throw 'No spaces in the username and only alphanumeric characters';
    if (username.length < 3) throw 'The username should be at least 3 characters long';
    return username;
};

const checkNickname = (nickname) => {
    nickname = checkString(nickname, 'nickname');
    if (nickname.length < 3 ) throw 'The nickname should be at least 3 characters long';
    return nickname;
}

const checkId = (id, varName) => {
    id = checkString(id, 'id');
    if (!ObjectId.isValid(id)) throw `${varName} is an invalid object ID`;
    return id;
};

const exportedMethods = {
    checkString,
    checkUsername,
    checkNickname,
    checkId
};

export default exportedMethods;