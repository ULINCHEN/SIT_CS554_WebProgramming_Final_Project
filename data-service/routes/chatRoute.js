import express from 'express';
const router = express.Router();
import data from '../data/index.js';
const chatData = data.chat;
import validation from '../validation/chat.js';

router.route("/")
    .get(async(req, res) => {

        try {
            const chatList = await chatData.getChats();
            if (chatList.length === 0) {
                return res.status(404).json({error: 'There is no chat'});
            }
            return res.status(200).json(chatList);
            //res.json("This is /Chat route");
        }
        catch(e){
            return res.status(404).json({error: "/chat router error => " + e});
            //console.log("/chat router error =>", e);
        }

    })

router.route("/:chatId")
    .get(async (req, res) => {
        try {
            req.params.chatId = validation.checkId(req.params.chatId, 'chatId');
        } catch (e) {
            return res.status(400).json("/chat/:id router error => " + e)
            //console.log("/chat/:id router error =>", e);
        }

        try {
            const chat = await chatData.getChatById(req.params.chatId);
            return res.status(200).json(chat);
            //res.json(`Get ${id} at chat route`);
        }
        catch(e){
            return res.status(404).json("/chat/:id router error => " + e) 
            //console.log("/chat/:id router error =>", e);
        }
   
    })
    .patch(async(req, res) => {
        if (!req.session.pet){
            return res.status(401).json({error: 'Please login to send a message'});
        }
        
        try {
            req.session.pet.username = validation.checkUsername(req.session.pet.username);
            req.params.chatId = validation.checkId(req.params.chatId, 'chatId');
            req.body.message = validation.checkString(req.body.message);
            //res.json(`Patch ${id} at chat route`);
        }
        catch(e){
            return res.status(400).json("/chat/:id router error => " + e);
            //console.log("/chat/:id router error =>", e);
        }

        try {
            const chat = await chatData.getChatById(req.params.chatId);
            if (req.session.pet.username !== chat.username1 && req.session.pet.username != chat.username2){
                throw "Users can only send messages in their own chats";
            }
        }
        catch(e){
            return res.status(404).json("/chat/:id router error => " + e);
        }

        try {
            const chat = await chatData.createMessage(req.params.chatId, req.session.pet.username, req.body.message);
            return res.status(200).json(chat);
        } catch (e) {
            return res.status(500).json({error: "/chat/:id router error => " + e});
        }

    })



export default router;