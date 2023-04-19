const exportedMethods = {
    checkUsername(username) {
        if (!username) {
            throw new Error('Username is not provided!')
        }
        if (typeof username !== 'string') {
            throw new Error('Username should be a string!')
        }
        username = username.trim();
        if (username === '') {
            throw new Error('Username cannot be empty string or spaces only!')
        }
        if (username.length < 4) {
            throw new Error('Username must contain at least 4 characters!')
        }
        const spaceRegex = /\s/;
        if (spaceRegex.test(username)) {
            throw new Error('Username must not contain space!')
        }
        username = username.toLowerCase();
        const alphanumericRegex = /^\w+$/;
        if (!alphanumericRegex.test(username)) {
            throw new Error('Username must contain letters and numbers only!')
        }
        return username;

    },

    checkPassword(password, confirmPassword) {
        if (!password) {
            throw new Error('Password is not provided!');
        }
        if (typeof password !== "string") {
            throw new Error('Password should be a string!')
        }
        password = password.trim();
        if (password === '') {
            throw new Error('Password cannot be empty string or space only!')
        }
        if (password.length < 6) {
            throw new Error('Password must contain at least 6 characters!')
        }
        const spaceRegex = /\s/;
        if (spaceRegex.test(password)) {
            throw new Error('Password must not contain space!')
        }
        const requireRegex = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)/;
        if (!requireRegex.test(password)) {
            throw new Error('Password must contain at least 1 uppercase character, at least 1 lowercase character, at least 1 number, at least 1 special character!')
        }
        if(password !== confirmPassword) {
            throw new Error('Password does not match the confirmPassword!')
        }
        return password;
    },

    checkEmail(email) {
        if (!email) {
            throw new Error('Email is not provided!');
        }
        if (typeof email !== "string") {
            throw new Error('Email should be a string!')
        }
        email = email.trim();
        if (email === '') {
            throw new Error('Email cannot be empty string or space only!')
        }
        email = email.toLowerCase();

        const spaceRegex = /\s/;
        if (spaceRegex.test(email)) {
            throw new Error('Email must not contain space!')
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email!')
        }
        return email;
    },

    checkNickname(nickname) {
        if (!nickname) {
            throw new Error('Nickname is not provided!')
        }
        if (typeof nickname !== 'string') {
            throw new Error('Nickname should be a string!')
        }
        nickname = nickname.trim();
        if (nickname === '') {
            throw new Error('Nickname cannot be empty string or spaces only!')
        }
        if (nickname.length < 4) {
            throw new Error('Nickname must contain at least 4 characters!')
        }
        const spaceRegex = /\s/;
        if (spaceRegex.test(nickname)) {
            throw new Error('Nickname must not contain space!')
        }
        nickname = nickname.toLowerCase();
        const alphanumericRegex = /^\w+$/;
        if (!alphanumericRegex.test(nickname)) {
            throw new Error('Nickname must contain letters and numbers only!')
        }
        return nickname;
    },

    checkAge(age) {
        if (!age) {
            throw "age is not provided!";
        }
        if (!(!isNaN(age) && !isNaN(parseFloat(age)))) {
            throw `${age} is not an integer`;
        }
        age = Number(age)
        if (age < 0 || age > 30) {
            throw "age range is invalid, should be 0 to 30";
        }
        return age;
    }, 

    checkDOB(str) {
        console.log(str)
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
        if (str.length !== 10) {
          throw "Your DOB should follow the format:YYYY-MM-DD";
        }
        const DOB = str.split("-")
        let year = DOB[0];
        let month = DOB[1];
        let day = DOB[2];
        
        if (month < 1 || month > 12) {
          throw "month is irrational";
        }
        if (day < 1 || day > 31) {
          throw "date is irrational";
        }
        if (year < 1993 || year > 2023) {
          throw "year is irrational";
        }
        return month+day+year;
      },

    checkSex(sex) {
        if(typeof(sex) !== 'string') {
            throw new Error('sex must be a string')
        }
        sex = sex.trim().toLowerCase()
        if(sex !== 'male' && sex !== 'female' && sex !== 'neutered') {
            throw new Error('sex must be male, female or neutered')
        }
        return sex
    },

    checkBreed(breed) {
        if(typeof(breed) !== 'string') {
            throw new Error('breed must be a string')
        }
        breed = breed.trim()
        if (breed.match(/^[a-zA-Z\s]*$/)) {
            return breed
        } else {
            throw new Error('breed should be alphabetic characters')
        }
    }, 

    checkHobbies(hobbies) {
        return hobbies
    },

    checkPersonality(personality) {
        return personality
    },

    checkLocation(location) {
        if(location === '') {
            return undefined
        }
        return location
    }, 

    checkPreferenceBreed(preferenceBreed) {
        if(preferenceBreed === '') {
            return undefined
        }
        return preferenceBreed
    },

    checkPreferenceSex(preferenceSex) {
        if(preferenceSex === '') {
            return undefined
        }
        return preferenceSex
    },
     
    checkPreferenceAge(preferenceAge) {
        if(preferenceAge === '') {
            return undefined
        }
        preferenceAge = Number(preferenceAge)
        if(!Number.isInteger(preferenceAge)) {
            throw new Error('Preference age must be an integer')
        }
        if(preferenceAge < 0 || preferenceAge > 30) {
            throw new Error('Preference age range is invalid, should be 0 to 30')
        }
        
        return preferenceAge
    },

    compareHobbies(original, newHobbies) {
        if (original.length !== newHobbies) {
            return false;
        }
        for (const element of original) {
            if (!newHobbies.includes(element)) {
                return false;
            }
        }
        return true;
    }

    
}

export default exportedMethods;