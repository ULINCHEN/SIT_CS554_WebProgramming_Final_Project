import chat from '../data/chat.js'
import {dbConnection, closeConnection} from '../config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

const Chat1 = await chat.createChat('john123', 'lily123', 'John', 'Lily');
console.log(Chat1);
const Chat2 = await chat.createChat('jerry123', 'tom123', 'Jerry', 'Tom');
console.log(Chat2);

const Chat1withMessage1 = await chat.createMessage(Chat1._id, 'joHN123', 'Hi');
console.log(Chat1withMessage1);
const Chat1withMessage2 = await chat.createMessage(Chat1._id, 'lily123', 'hello');
console.log(Chat1withMessage2);

try {
    const Chat2withMessage1 = await chat.createMessage(Chat2._id, 'jerry', 'Hi');
    console.log(Chat2withMessage1);
} catch (e) {
    console.log(e);
}

const newChat1 = await chat.getChatById(Chat1._id);
console.log(newChat1);

const chatList = await chat.getChats()
console.log(chatList);

console.log('Done seeding database');
await closeConnection();