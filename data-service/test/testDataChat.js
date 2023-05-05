import chat from '../data/chat.js'
import {dbConnection, closeConnection} from '../config/mongoConnection.js';

const db = await dbConnection();
//await db.dropDatabase();

// const Chat1 = await chat.createChat('645491e095bd136f8d3b47be', '6453d084d95658f5f30bd8de', 'admin', 'pet1', 'admin', 'blondy');
// console.log(Chat1);
// const Chat2 = await chat.createChat('645491e095bd136f8d3b47be', '645319827f1d5b766d2160dc', 'admin', 'somebody1', 'admin', 'paikutoo');
// console.log(Chat2);
const Chat3 = await chat.createChat('645491e095bd136f8d3b47be', '645176ffafa7256d3bcd4b22', 'admin', 'test123', 'admin', 'test123');
console.log(Chat3);

// const Chat1withMessage1 = await chat.createMessage(Chat1._id, 'admin', 'Hi');
// console.log(Chat1withMessage1);
// const Chat1withMessage2 = await chat.createMessage(Chat1._id, 'pet1', 'hello');
// console.log(Chat1withMessage2);

// try {
//     const Chat2withMessage1 = await chat.createMessage(Chat2._id, 'jerry', 'Hi');
//     console.log(Chat2withMessage1);
// } catch (e) {
//     console.log(e);
// }

// const newChat1 = await chat.getChatById(Chat1._id);
// console.log(newChat1);

// const chatList = await chat.getChats()
// console.log(chatList);

console.log('Done seeding database');
await closeConnection();