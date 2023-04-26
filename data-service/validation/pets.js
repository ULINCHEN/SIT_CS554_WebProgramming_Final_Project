import { ObjectId } from "mongodb";

const exportedMethods = {
  checkUsername(username) {
    if (!username) {
      throw "Username is not provided!";
    }
    if (typeof username !== "string") {
      throw "Username should be a string!";
    }
    username = username.trim();
    if (username === "") {
      throw "Username cannot be empty string or spaces only!";
    }
    if (username.length < 4) {
      throw "Username must contain at least 4 characters!";
    }
    const spaceRegex = /\s/;
    if (spaceRegex.test(username)) {
      throw "Username must not contain space!";
    }
    username = username.toLowerCase();
    const alphanumericRegex = /^\w+$/;
    if (!alphanumericRegex.test(username)) {
      throw "Username must contain letters and numbers only!";
    }
    return username;
  },

  checkPassword(password) {
    if (!password) {
      throw "Password is not provided!";
    }
    if (typeof password !== "string") {
      throw "Password should be a string!";
    }
    password = password.trim();
    if (password === "") {
      throw "Password cannot be empty string or space only!";
    }
    if (password.length < 6) {
      throw "Password must contain at least 6 characters!";
    }
    const spaceRegex = /\s/;
    if (spaceRegex.test(password)) {
      throw "Password must not contain space!";
    }
    const requireRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/;
    if (!requireRegex.test(password)) {
      throw "Password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, at least 1 special character!";
    }
    return password;
  },

  checkEmail(email) {
    if (!email) {
      throw "Email is not provided!";
    }
    if (typeof email !== "string") {
      throw "Email should be a string!";
    }
    email = email.trim();
    if (email === "") {
      throw "Email cannot be empty string or space only!";
    }
    email = email.toLowerCase();

    const spaceRegex = /\s/;
    if (spaceRegex.test(email)) {
      throw "Email must not contain space!";
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    if (!emailRegex.test(email)) {
      throw "Invalid email!";
    }
    return email;
  },

  checkNickname(nickname) {
    if (!nickname) {
      throw "Nickname is not provided!";
    }
    if (typeof nickname !== "string") {
      throw "Nickname should be a string!";
    }
    nickname = nickname.trim();
    if (nickname === "") {
      throw "nickname cannot be empty string or space only!";
    }
    return nickname;
  },

  checkBreed(breed) {
    if (!breed) {
      return undefined
    }
    if (typeof breed !== "string") {
      throw "breed must be a string";
    }
    breed = breed.trim();
    if (breed.match(/^[a-zA-Z\s]*$/)) {
      return breed;
    } else {
      throw "breed should be alphabetic characters";
    }
  },

  checkAge(age) {
    if (!age) {
      return undefined
    }
    if (!(!isNaN(age) && !isNaN(parseFloat(age)))) {
      throw `${age} is not an integer`;
    }
    age = Number(age);
    if (age < 0 || age > 30) {
      throw "age range is invalid, should be 0 to 30";
    }
    return age;
  },

  checkSex(sex) {
    if (!sex) {
      return undefined;
    }
    if (typeof sex !== "string") {
      throw "sex must be a string";
    }
    sex = sex.trim().toLowerCase();
    if (sex !== "male" && sex !== "female" && sex !== "neutered") {
      throw "sex must be male, female or neutered";
    }
    return sex;
  },

  checkId(id) {
    if (!id) {
      throw "User ID is not provided!";
    }
    if (typeof id !== "string") {
      throw "User ID should be a sting!";
    }
    id = id.trim();
    if (id === "") {
      throw "User ID cannot be empty string or space only!";
    }
    if (!ObjectId.isValid(id)) {
      throw "Invalid object ID";
    }
    return id;
  },

  checkDOB(str) {
    if (!str) {
      throw "Date of birth is not provided!";
    }
    if (typeof str !== "string") {
      throw "DOB should be string";
    }
    str = str.trim();
    if (str === "") {
      throw "DOB cannot be empty string or space only!";
    }
    if (str.length !== 8) {
      throw "Your DOB should follow the format:MMDDYYYY";
    }

    let month = Number(str.slice(0, 2));
    let day = Number(str.slice(2, 4));
    let year = Number(str.slice(4, 8));
    if (month < 1 || month > 12) {
      throw "month is irrational";
    }
    if (day < 1 || day > 31) {
      throw "date is irrational";
    }
    if (year < 1993 || year > 2023) {
      throw "year is irrational";
    }
    return str;
  },

  checkHobbies(hobbies) {
    if (!hobbies) {
      throw "Hobbies is not provided!";
    }
    if (!Array.isArray(hobbies)) {
      throw "Hobbies should be an array";
    }
    return hobbies;
  },

  checkPersonality(str) {
    if (!str) {
      throw "Personality is not provided!";
    }
    if (typeof str !== "string") {
      throw "Personality should be string";
    }
    str = str.trim();
    if (str === "") {
      throw "Personality cannot be empty string or space only!";
    }

    return str;
  },

  checkPreferences(obj) {
    let preference = {
      breed: undefined,
      age: undefined,
      sex: undefined,
    };
    if (!obj || typeof obj !== "object") {
      return preference;
    }

    if (obj.breed) {
      try {
        this.checkBreed(obj.breed);
      } catch (e) {
        throw `Preference ${e.message}`;
      }
      preference.breed = obj.breed;
    }

    if (obj.sex) {
      try {
        this.checkSex(obj.sex);
      } catch (e) {
        throw `Preference ${e.message}`;
      }
      preference.sex = obj.sex;
    }

    if (obj.age) {
      try {
        this.checkAge(obj.age);
      } catch (e) {
        throw `Preference ${e.message}`;
      }
      preference.age = obj.age;
    }
    return preference;
  },
  checkLocation(location) {
    if (!location) {
      throw "Providing the location helps you a lot!";
    }
    if (typeof location !== "string") {
      throw "location should be string";
    }
    return location;
  },
};
export default exportedMethods;
