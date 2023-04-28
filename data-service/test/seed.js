import landing from '../data/landing.js'
import {dbConnection, closeConnection} from '../config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

const breeds = ["dog", "cat", "other"]
const sexs = ["male", "female", "neutered"]
const locations = ["New York", "New Jersey", "Colorado"]

for(let i = 1; i < 51; i++) {
    const username = "DummyUser" + i
    const email = username + "@gmail.com"
    const password = "Zzhabc123!"
    const nickname = username + "_nickname"
    const breed = breeds[Math.floor(Math.random() * 3)]
    const age = Math.floor(Math.random() * 10) + 1
    console.log(age)
    const sex = sexs[Math.floor(Math.random() * 3)]
    const DOB = "05052008"
    const hobbies = ["walking", "swimming"]
    const personality = "shy"
    const preference = undefined
    const location = locations[Math.floor(Math.random() * 3)]
    await landing.createPet(
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
    )
}

console.log('Done seeding database');
await closeConnection();
