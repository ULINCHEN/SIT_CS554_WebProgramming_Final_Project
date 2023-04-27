import { pets } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import validation from '../validation/pets.js';

const exportedMethods = {
    
    async createPetToTest(breed, age, sex,) {
        let newPet = {
            breed: breed,
            age: age,
            sex: sex,
            liked: [],
            disliked: [],
            likedMe: []
        }
        const petCollection = await pets()
        const insertInfo = await petCollection.insertOne(newPet)
        if (!insertInfo.acknowledged || !insertInfo.insertedId) {
            throw 'Could not add pet';
        }
        return await this.getPetById(insertInfo.insertedId.toString())
    },

    async getPetById(petId) {
        if (petId === undefined) throw 'must provide petId'
        const petCollection = await pets()
        let pet = await petCollection.findOne({ _id: ObjectId(petId) })
        if (pet === null) throw 'No pet with that id';
        delete pet.hashed_password;
        return pet
    },

    async likePet(myPetId, otherPetId) {
        const myPet = await this.getPetById(myPetId)
        myPet.liked.push(otherPetId.toString())
        const petCollection = await pets()
        const updateInfo = await petCollection.updateOne(
            { _id: ObjectId(myPetId) },
            { $set: myPet }
        )
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';
        return await this.getPetById(myPetId);
    },

    async disLikePet(myPetId, otherPetId) {
        const myPet = await this.getPetById(myPetId)
        myPet.disliked.push(otherPetId.toString())
        const petCollection = await pets()
        const updateInfo = await petCollection.updateOne(
            { _id: ObjectId(myPetId) },
            { $set: myPet }
        )
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
            throw 'Update failed';
        return await this.getPetById(myPetId);
    },

    async getAllPetsByPreferences(petId, breed, age, sex) {
        /* 
            This function will find all pets and filter by breed, age and sex if provided,
            also filter the pets that has been already liked or disliked, as well as filter 
            the caller's petId 
        */
        const petCollection = await pets()
        const { liked, disliked } = await this.getPetById(petId)
        let likedAndDisLiked = liked.concat(disliked)
        likedAndDisLiked.push(petId.toString())
        let allPets = await petCollection.find({}).toArray()
        if (breed !== undefined) {
            breed = validation.checkBreed(breed)
            allPets = allPets.filter(pet => pet.breed === breed)
        }
        if (age !== undefined) {
            age = validation.checkAge(age)
            allPets = allPets.filter(pet => pet.age === age)
        }
        if (sex !== undefined) {
            sex = validation.checkSex(sex)
            allPets = allPets.filter(pet => pet.sex === sex)
        }
        allPets = allPets.filter(pet => !likedAndDisLiked.includes(pet._id.toString()))
        // if (allPets.length === 0) throw 'there are no more pets'
        return allPets
    },

}

export default exportedMethods;