import { pets } from '../config/mongoCollections.js';
import amqp from 'amqplib';
import { ObjectId } from 'mongodb';
import validation from '../validation/pets.js';
import chat from './chat.js'

const exportedMethods = {
    async sendMessageToRabbitMQ(message) {
        try {
          const connection = await amqp.connect('amqp://localhost');
         
          const channel = await connection.createChannel();
      
          const queueName = 'my-queue';
          await channel.assertQueue(queueName, { durable: false });

          const messageString = JSON.stringify(message);
      
          await channel.sendToQueue(queueName, Buffer.from(messageString));
      
          console.log(`Sent message to RabbitMQ: ${messageString}`);
      
          await channel.close();
          await connection.close();
        } catch (error) {
          console.error(`Error sending message to RabbitMQ: ${error}`);
        }
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
        
        // check otherPet has liked me, if both like each other, create chatRoom
        let likeEachOther = false
        const otherPet = await this.getPetById(otherPetId);
        const otherPetLikes = otherPet.liked;
        if(otherPetLikes.indexOf(myPetId) !== -1) {
            likeEachOther = true
            const newChat = await chat.createChat(myPet.username, otherPet.username, myPet.nickname, otherPet.nickname);
            await this.addChatRoom(myPetId, newChat._id);
            await this.addChatRoom(otherPetId, newChat._id)
            await this.sendMessageToRabbitMQ({
                user1:{
                    name: myPet.nickname,
                    email: myPet.email
                },
                user2:{
                    name: otherPet.nickname,
                    email: otherPet.email
                }
            })
        }
        const result = {}
        result.pet = await this.getPetById(myPetId);
        result.likeEachOther = likeEachOther
        return result;
    },

    async addChatRoom(petId, charRoomId) {
        const myPet = await this.getPetById(petId)
        myPet.chatRoom.push(charRoomId)
        const petCollection = await pets()
        const updateInfo = await petCollection.updateOne(
            { _id: ObjectId(petId) },
            { $set: myPet }
        )
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
            throw 'fail to add chatRoom';
        }
        return await this.getPetById(petId)   
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