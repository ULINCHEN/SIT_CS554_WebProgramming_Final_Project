import landing from '../data/landing.js'
import {dbConnection, closeConnection} from '../config/mongoConnection.js';



const db = await dbConnection();
await db.dropDatabase();

const breeds = ["dog", "cat", "other"];
const sexs = ["male", "female", "neutered"];
const locations = ["New York", "New Jersey", "Colorado"];
const allHobbies = [
    "swimming",
    "running",
    "walking",
    "sleeping",
    "eating",
    "surfing",
    "lounging",
    "jumping",
    "posing",
    "socializing",
];


const cat1 = {
    username: "cat1",
    email: "cat1@gmail.com",
    password: "Cat1..",
    nickname: "Bella",
    breed: breeds[1],
    age: 2,
    sex: sexs[1],
    DOB: "06062020",
    location: locations[0],
    hobbies: [allHobbies[0], allHobbies[1]],
    personality: "Outgoing",
    preference: {
        breed: "cat",
        age: undefined,
        sex: "Male"
    }
}

try{
    await landing.createPet(
        cat1.username,
        cat1.email,
        cat1.password,
        cat1.nickname,
        cat1.breed,
        cat1.age,
        cat1.sex,
        cat1.DOB,
        cat1.hobbies,
        cat1.personality,
        cat1.preference,
        cat1.location
    )
}catch (e) {
    throw e;
}

const dog1 = {
    username: "dog1",
    email: "dog1@gmail.com",
    password: "Dog1..",
    nickname: "Luna",
    breed: breeds[0],
    age: 2,
    sex: sexs[1],
    DOB: "06062020",
    location: locations[2],
    hobbies: [allHobbies[5], allHobbies[6]],
    personality: "Confident",
    preference: {
        breed: "dog",
        age: undefined,
        sex: undefined
    }
}

try{
    await landing.createPet(
        dog1.username,
        dog1.email,
        dog1.password,
        dog1.nickname,
        dog1.breed,
        dog1.age,
        dog1.sex,
        dog1.DOB,
        dog1.hobbies,
        dog1.personality,
        dog1.preference,
        dog1.location
    )
}catch (e) {
    throw e;
}



const cat2 = {
    username: "cat2",
    email: "cat2@gmail.com",
    password: "Cat2..",
    nickname: "Mittens",
    breed: breeds[1],
    age: 1,
    sex: sexs[0],
    DOB: "06062021",
    location: locations[1],
    hobbies: [allHobbies[2], allHobbies[3]],
    personality: "Shy",
    preference: {
        breed: "cat",
        age: undefined,
        sex: undefined
    }
}

try{
    await landing.createPet(
        cat2.username,
        cat2.email,
        cat2.password,
        cat2.nickname,
        cat2.breed,
        cat2.age,
        cat2.sex,
        cat2.DOB,
        cat2.hobbies,
        cat2.personality,
        cat2.preference,
        cat2.location
    )
}catch (e) {
    throw e;
}

const dog2 = {
    username: "dog2",
    email: "dog2@gmail.com",
    password: "Dog2..",
    nickname: "Felix",
    breed: breeds[0],
    age: 2,
    sex: sexs[0],
    DOB: "06062020",
    location: locations[0],
    hobbies: [allHobbies[1], allHobbies[3]],
    personality: "Outgoing",
    preference: {
        breed: undefined,
        age: 2,
        sex: undefined
    }
}

try{
    await landing.createPet(
        dog2.username,
        dog2.email,
        dog2.password,
        dog2.nickname,
        dog2.breed,
        dog2.age,
        dog2.sex,
        dog2.DOB,
        dog2.hobbies,
        dog2.personality,
        dog2.preference,
        dog2.location
    )
}catch (e) {
    throw e;
}


const cat3 = {
    username: "cat3",
    email: "cat3@gmail.com",
    password: "Cat3..",
    nickname: "Coco",
    breed: breeds[1],
    age: 3,
    sex: sexs[1],
    DOB: "06062019",
    location: locations[0],
    hobbies: [allHobbies[4], allHobbies[5]],
    personality: "Friendly",
    preference: {
        breed: undefined,
        age: undefined,
        sex: undefined
    }
}

try{
    await landing.createPet(
        cat3.username,
        cat3.email,
        cat3.password,
        cat3.nickname,
        cat3.breed,
        cat3.age,
        cat3.sex,
        cat3.DOB,
        cat3.hobbies,
        cat3.personality,
        cat3.preference,
        cat3.location
    )
}catch (e) {
    throw e;
}



const dog3 = {
    username: "dog3",
    email: "dog3@gmail.com",
    password: "Dog3..",
    nickname: "Olive",
    breed: breeds[0],
    age: 1,
    sex: sexs[1],
    DOB: "06062021",
    location: locations[1],
    hobbies: [allHobbies[3], allHobbies[7]],
    personality: "Independent",
    preference: {
        breed: undefined,
        age: undefined,
        sex: undefined
    }
}

try{
    await landing.createPet(
        dog3.username,
        dog3.email,
        dog3.password,
        dog3.nickname,
        dog3.breed,
        dog3.age,
        dog3.sex,
        dog3.DOB,
        dog3.hobbies,
        dog3.personality,
        dog3.preference,
        dog3.location
    )
}catch (e) {
    throw e;
}


// for(let i = 1; i < 11; i++) {
//     const username = "User" + i
//     const email = username + "@gmail.com"
//     const password = "Zzh123!"
//     const nickname = username + "_nickname"
//     const breed = breeds[Math.floor(Math.random() * 3)]
//     const age = Math.floor(Math.random() * 10) + 1
//     console.log(age)
//     const sex = sexs[Math.floor(Math.random() * 3)]
//     const DOB = "05052008"
//     const hobbies = ["walking", "swimming"]
//     const personality = "shy"
//     const preference = undefined
//     const location = locations[Math.floor(Math.random() * 3)]
//     await landing.createPet(
//         username,
//         email,
//         password,
//         nickname,
//         breed,
//         age,
//         sex,
//         DOB,
//         hobbies,
//         personality,
//         preference,
//         location
//     )
// }


console.log('Done seeding database');
await closeConnection();
