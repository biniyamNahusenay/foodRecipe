import express from "express"
import { RecipesModel } from "../model/RecipeSchema.js"
import mongoose from "mongoose"
import { UserModel } from "../model/userSchema.js"
import { verifyToken } from "./userRoutes.js"

const router = express.Router()

router.get("/",async (req,res)=>{
    try {
        const response = await RecipesModel.find({})
        res.json(response)
    } catch (error) {
       res.json({message:error}) 
    }
})
router.post("/",verifyToken,async(req,res)=>{
   try {
    const recipe = new RecipesModel(req.body)
    const response = await recipe.save()

    res.json(response)
   } catch (error) {
     res.json({messge:error})
   }
})

router.put("/",verifyToken,async(req,res)=>{
    try {
       const recipes = await RecipesModel.findById(req.body.recipeId) // that is gonna saved
       const user = await UserModel.findById(req.body.userId)  // the one that is saving

       user.savedRecipes.push(recipes)
       await user.save();
       res.json({savedRecipes:user.savedRecipes})
    } catch (error) {
      res.json({messge:error})
    }
 })

 router.get("/savedRecipes/id/:userId",async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userId) 
        res.json({savedRecipes:user?.savedRecipes})  // at the time of logiin that he saved
    } catch (error) {
        res.json({message:error})
    }
 })

 router.get("/savedRecipes/:userId",async (req,res)=>{
    try {
        const user = await UserModel.findById(req.params.userId)
        const savedRecipes = await RecipesModel.find({_id:{$in:user.savedRecipes}})  // saved recipes that he saved
        res.json({savedRecipes})
    } catch (error) {
       res.json(error) 
    }
 })

export {router as recipeRouter}