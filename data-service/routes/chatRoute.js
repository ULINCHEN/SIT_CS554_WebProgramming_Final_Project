import express from 'express';
const router = express.Router();
import data from '../data/index.js';
const chatData = data.chat;
const petsData = data.pets;
import validation from '../validation/chat.js';

router.route("/")
    .get(async(req, res) => {
        if (!req.session.pet){
            return res.status(401).json({error: 'Please login to send a message'});
        }
        // console.log('req.session.pet.petId: ', req.session.pet.petId);
        try {
            const chatList = await chatData.getChatsByPetId(req.session.pet.petId);
            if (chatList.length === 0) {
                return res.status(404).json({error: 'There is no chat'});
            }
            return res.status(200).json(chatList);
            //res.json("This is /Chat route");
        } catch(e){
            return res.status(404).json({error: "/chat router error => " + e});
            //console.log("/chat router error =>", e);
        }
    })
    .post(async(req, res) => {
        try {
            req.body.petId1 = validation.checkId(req.body.petId1, 'petId1');
            req.body.petId2 = validation.checkId(req.body.petId2, 'petId2');
            req.body.username1 = validation.checkUsername(req.body.username1);
            req.body.username2 = validation.checkUsername(req.body.username2);
            req.body.nickname1 = validation.checkNickname(req.body.nickname1);
            req.body.nickname2 = validation.checkNickname(req.body.nickname2);
        } catch (e) {
            return res.status(400).json({error: "/chat router error => " + e});
        }

        try {
            const chat = await chatData.createChat(req.body.petId1, req.body.petId2, req.body.username1, req.body.username2, req.body.nickname1, req.body.nickname2);
            return res.status(200).json(chat);
        } catch (e) {
            return res.status(404).json({error: "/chat router error => " + e});
        }
    })

router.route("/:chatId")
    .get(async (req, res) => {
        try {
            req.params.chatId = validation.checkId(req.params.chatId, 'chatId');
        } catch (e) {
            return res.status(400).json({error:"/chat/:id router error => " + e});
            //console.log("/chat/:id router error =>", e);
        }

        try {
            const chat = await chatData.getChatById(req.params.chatId);
            return res.status(200).json(chat);
            //res.json(`Get ${id} at chat route`);
        }
        catch(e){
            return res.status(404).json({error:"/chat/:id router error => " + e}); 
            //console.log("/chat/:id router error =>", e);
        }
   
    })
    .patch(async(req, res) => {
        if (!req.session.pet){
            return res.status(401).json({error: 'Please login to send a message'});
        }
        
        try {
            req.body.username = validation.checkUsername(req.body.username);
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
            if (req.body.username !== chat.username1 && req.body.username != chat.username2){
                throw "Users can only send messages in their own chats";
            }
        }
        catch(e){
            return res.status(404).json("/chat/:id router error => " + e);
        }

        try {
            const chat = await chatData.createMessage(req.params.chatId, req.body.username, req.body.message);
            return res.status(200).json(chat);
        } catch (e) {
            return res.status(500).json({error: "/chat/:id router error => " + e});
        }

    })

router
    .route('/pet/:petId')
    .get(async (req, res) => {
        let petId = req.params.petId;

        try {
            petId = validation.checkId(petId, 'petId');
        }catch (e) {
            return res.status(400).json({Error: 'Invalid user Id!'});
        }

        try {
            const pet = await petsData.getPetById(petId);
            return res.status(200).json(pet);
        } catch (e) {
            return res.status(404).json({Error: `Pet with id: ${petId} does not found!`});
        }
    })


export default router;