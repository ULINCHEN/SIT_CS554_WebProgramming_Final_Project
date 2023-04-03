import pets from '../data/pets.js'
import {dbConnection, closeConnection} from '../config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

const insertPet1 = await pets.createPetToTest("Chihuahua", 1, "female")
const insertPet2 = await pets.createPetToTest("Chihuahua", 2, "female")
const insertPet3 = await pets.createPetToTest("Chihuahua", 3, "female")
const insertPet4 = await pets.createPetToTest("Chihuahua", 4, "female")
const insertPet5 = await pets.createPetToTest("Chihuahua", 5, "female")

const pet1LikePet2 = await pets.likePet(insertPet1._id, insertPet2._id)
const pet1DisLikePet3 = await pets.disLikePet(insertPet1._id, insertPet3._id)

const res = await pets.getAllPetsByPreferences(insertPet1._id, undefined, 5, "female")
console.log(res)

console.log('Done seeding database');
await closeConnection();
