import { chats } from '../config/mongoCollections.js';
import petData from './pets.js';
import { pets } from '../config/mongoCollections.js';
import { ObjectId } from 'mongodb';
import validation from '../validation/chat.js';

const createChat = async (
    petId1,
    petId2,
    username1,
    username2,
    nickname1,
    nickname2
) => {
    petId1 = validation.checkId(petId1, 'petId1');
    petId2 = validation.checkId(petId2, 'petId2');
    username1 = validation.checkUsername(username1);
    username2 = validation.checkUsername(username2);
    nickname1 = validation.checkNickname(nickname1);
    nickname2 = validation.checkNickname(nickname2);
    let messages = [];

    const chatCollection = await chats();
    const newChatInfo = {
        petId1: petId1,
        petId2: petId2,
        username1: username1,
        username2: username2,
        nickname1: nickname1,
        nickname2: nickname2,
        messages: messages
    };

    //check if the two users already have a chat room
    let chatList = await chatCollection.find({petId1: ObjectId(petId1), petId2: ObjectId(petId2)}).toArray();
    //console.log(chatList);
    if (chatList.length !== 0) throw 'Chat room for the two users already exists, cannot create again.';

    const insertInfo = await chatCollection.insertOne(newChatInfo);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw 'Could not create new chat';

    // add chat room information to pet obj
    const pet1 = await petData.getPetById(petId1);
    const pet2 = await petData.getPetById(petId2);
    if (!pet1 || !pet2) throw 'No pet with the id, chat cannot be created';

    let newchatRooms1 = [
        ...pet1.chatRoom,
        {   id: insertInfo.insertedId.toString(),
            username2: username2 }
    ];
    let newPet1 = {
        ...pet1,
        chatRoom: newchatRooms1
    };

    let newchatRooms2 = [
        ...pet2.chatRoom,
        {   id: insertInfo.insertedId.toString(),
            username2: username1 }
    ];
    let newPet2 = {
        ...pet2,
        chatRoom: newchatRooms2
    };

    const petsCol = await pets();
    const updateInfo1 = await petsCol.updateOne(
        { _id: ObjectId(petId1) },
        { $set: newPet1 }
    );
    const updateInfo2 = await petsCol.updateOne(
        { _id: ObjectId(petId2) },
        { $set: newPet2 }
    );
    if (!updateInfo1.matchedCount && !updateInfo1.modifiedCount)
        throw "Update pet 1 failed when creating a new chat room";
    if (!updateInfo2.matchedCount && !updateInfo2.modifiedCount)
        throw "Update pet 2 failed when creating a new chat room";

    const newChat = await getChatById(insertInfo.insertedId.toString());

    return newChat; 
};

const getChats = async () => {
    const chatCollection = await chats();
    const chatList = await chatCollection.find({}).toArray();
    if (!chatList) throw 'Could not get any chats';
    for (let i = 0, len = chatList.length; i < len; i++){
        chatList[i]._id = chatList[i]._id.toString();
    }
    return chatList;
};

const getChatsByPetId = async(petId) => {
    petId = validation.checkId(petId, "petId");
    const pet = await petData.getPetById(petId);
    let chatIds = pet.chatRoom;
    let chatList = [];
    for (let i = 0, len = chatIds.length; i < len; i++) {
        const chat = await getChatById(chatIds[i].id);
        chatList.push(chat);
    }
    return chatList;
}

const getChatById = async (chatId) => {
    chatId = validation.checkId(chatId, 'chatId');

    const chatCollection = await chats();
    const chat = await chatCollection.findOne({_id: ObjectId(chatId)});
    if (!chat) throw 'No chat with that id';
    chat._id = chat._id.toString();
    return chat;
};

const createMessage = async (
    chatId,
    username,
    text
) => {
    chatId = validation.checkId(chatId, 'chatId');
    username = validation.checkUsername(username);
    text = validation.checkString(text, 'message text');
    const getTimeStamp = () => {
        const date = new Date();
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    };
    let time = getTimeStamp();

    const chatCollection = await chats();
    const chat = await chatCollection.findOne({_id: ObjectId(chatId)});
    if (!chat) throw 'No chat with that id';

    if (username !== chat.username1 && username != chat.username2){
        throw "Users can only send messages in their own chats";
    }

    let _id = new ObjectId();

    const newMessageInfo = {
        _id: _id,
        username: username,
        time: time,
        text: text
    };
    chat.messages.push(newMessageInfo);

    const updatedInfo = await chatCollection.updateOne(
        {_id: ObjectId(chatId)},
        {$set: {messages: chat.messages}}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update created message successfully';
    }
    const newChat = await chatCollection.findOne({_id: ObjectId(chatId)});
    newChat._id = newChat._id.toString();
    return newChat;
};

const getMessageById = async (
    chatId,
    messageId
) => {
    chatId = validation.checkId(chatId, 'chatId');
    messageId = validation.checkId(messageId, 'messageId');

    const chatCollection = await chats();
    const chat = await chatCollection.findOne({_id: ObjectId(chatId)});
    if (!chat) throw 'No chat with that id';

    let message = null;
    for (let i = 0, len = chat.messages.length; i < len; i++){
        if (chat.messages[i]._id.toString() === messageId){
        message = chat.messages[i];
        break;
        }
    }
    if (!message) throw 'No message with that id in the chat';
    return message;
};

const removeMessage = async (
    chatId,
    messageId
) => {
    chatId = validation.checkId(chatId, 'chatId');
    messageId = validation.checkId(messageId, 'messageId');

    const chatCollection = await chats();
    const chat = await chatCollection.findOne({_id: ObjectId(chatId)});
    if (!chat) throw 'No chat with that id';

    let message = null;
    for (let i = 0, len = chat.messages.length; i < len; i++){
        if (chat.messages[i]._id.toString() === messageId){
        message = chat.messages[i];
        chat.messages.splice(i, 1);
        break;
        }
    }
    if (!message) throw 'No message with that id in the chat';

    const updatedInfo = await chatCollection.updateOne(
        {_id: ObjectId(chatId)},
        {$set: {messages: chat.messages}}
    );
    if (updatedInfo.modifiedCount === 0) {
        throw 'Could not update removed message successfully';
    }

    const newChat = await chatCollection.findOne({_id: ObjectId(chatId)});
    newChat._id = newChat._id.toString();
    return newChat;
}


const exportedMethods = {
    createChat,
    getChats,
    getChatsByPetId,
    getChatById,
    createMessage,
    getMessageById,
    removeMessage
};

export default exportedMethods;