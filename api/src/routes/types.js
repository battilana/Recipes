const { Router } = require("express")
const { Genre } = require("../db")
const axios = require("axios");
const {Type} = require("../db");
const router = Router();

router.get("/", async (req,res,next)=>{
    try{
        const types = await Type.findAll({})
        res.send(types)
    }
    catch(error){
        next(error)
    }
})
module.exports = router;