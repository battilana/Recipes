const { default: axios } = require('axios');
const { Router } = require('express');
const { Op } = require('sequelize');
const {Recipe, Type} = require('../db');
const router = Router()
require("dotenv").config();
const {API_KEY} = process.env;
  
router.get("/", async (req,res,next)=>{
    const name = req.query.name
    if (!name){
    try{
        let recApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        recApi = recApi.data.results.map((e)=>({
            name : e.title,
            image: e.image,
            id: e.id,
            score:e.healthScore,
            description:e.summary,
            type: e.diets
        }))
        const recDb = await Recipe.findAll()
        const recRes = recDb.concat(recApi)
        res.send(recRes)}
        catch(error){
            next(error)
        }
        // e.data.results.map((r, i)=>{
        //     console.log(i)
        //     if(i <= 100){
        //         recipes.push(r)
        //     }
        //     else res.send(recipes)
        // })
    }
    else{
        try{
            name.toLowerCase()
            const searchDb = await Recipe.findAll({
                include: Type,
                where:{
                    name:{
                        [Op.iLike]: "%" + name + "%"
                    }
                }
            })
            let recApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
            searchApi = recApi.data.results.map((e)=>({
                name : e.title,
                id: e.id,
                image:e.image,
                score:e.healthScore,
                description:e.summary,
                type: e.diets
            }))
            searchApi = searchApi.filter(e => e.name.toLowerCase().includes(name))
            let finRes = searchDb.concat(searchApi)
            res.send(finRes)

        }
        catch(error){
            next(error)
        }
    }
})
router.get("/:id", async(req,res,next)=>{
    const id = req.params.id
    console.log(id.length)
    if(id.length <= 6){
    try{
        let url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
        let rec = await axios.get(url)
        console.log(rec)
        res.send(rec.data)
    }
    catch(error){
        next(error)
    }}
    else try {
        let rec = await Recipe.findByPk(id)
        res.send(rec)
    }
    catch(error){
        next(error)
    }
})
router.post("/add", async (req, res,next)=>{
    try{
        const {name, description, score, steps, id, type} = req.body
        console.log(req.body)
        const newRec = await Recipe.create({
            name, description, score, steps, id, type
        })
        let types = await Type.findAll({})
        let id2 = types.length+7
        type.map(async(e)=>{
            
            let types2 = types.filter(t => t.name === e)

            if (!types2){
                res.send(newRec)
            }
            //ESTA ENTRANDO ACA NO SE ESTA CREANDO LA RECETA???
            else{
                id2++
                console.log(type)
                await Type.create({name:e, id:id2})
                .catch((error)=>next(error))}}
        )}
    catch(error){
        next(error)
            }
        })
router.post("/:recId/type/:typeName", async (req, res, next)=>{
    const {recId, typeName} = req.params
    await Type.findAll({
        where:{
            name: {
                [Op.iLike]: "%" + typeName + "%"
            }
        }
    })
    .then(async(type)=>{
        await Recipe.findByPk(recId)
        .then (async(r)=>{
            await r.addType(type[0].dataValues.id)
            .then(()=>{
                console.log(type[0].dataValues.id)
                res.send(r)
            })
            .catch((error)=>next(error))
        })
        .catch((error)=>next(error))
    })
    .catch((error)=>next(error))
})

module.exports = router;