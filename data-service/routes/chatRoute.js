import express from 'express';
const router = express.Router();

router.route("/")
    .get(async(req, res) => {

        try{
            res.json("This is /Chat route");
        }
        catch(e){
            console.log("/chat router error =>", e);
        }

    })

router.route("/:chatId")
    .get(async (req, res) => {
        try{
            const id = req.params.chatId;
            res.json(`Get ${id} at chat route`);
        }
        catch(e){
            console.log("/chat/:id router error =>", e);
        }
   
    })
    .patch(async(req, res) => {

        try{
            const id = req.params.chatId;
            res.json(`Patch ${id} at chat route`);
        }
        catch(e){
            console.log("/chat/:id router error =>", e);
        }

    })







    export default router;