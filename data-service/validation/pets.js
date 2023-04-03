const exportedMethods = {
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
    }

}
export default exportedMethods;