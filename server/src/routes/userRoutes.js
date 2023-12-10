import express from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../model/userSchema.js"
import dotenv from "dotenv"

const env = dotenv.config()

const router = express.Router()

router.post('/register',async (req,res)=>{
    try {
    const {userName,password} = req.body
   if(!userName || !password){
      res.status(400)
      throw new Error("please add all the fields")
   }
   
   const userExists = await UserModel.findOne({userName})
    
   if(userExists){
        res.status(400)
        throw new Error("user already exists")
     }

     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

     const newUser = await UserModel.create({
      userName,
      password:hashedPassword
     })

     if(newUser){
        res.status(201).json({message:"registered success"})
     }else{
        res.status(400)
        throw new Error("invalid user data")
     }
    } catch (error) {
        res.status(400).json({error})
    }
})

router.post("/login",async(req,res)=>{
   const {userName,password} = req.body
   if(!userName || !password){
      res.status(400)
      throw new Error("please add all the fields")
   }
   const user = await UserModel.findOne({userName})
   if(!user){
      res.json({message:"user not found"})
   } 
   const validPassword = await bcrypt.compare(password,user.password)
   if(!validPassword){
      res.json({message:"incorrect password or username"})
   }
   const token = jwt.sign({id:user._id},process.env.JWT_KEY)
   res.json({token,userId:user._id})
})


export {router as userRouter}
export const verifyToken = (req,res,next)=>{
   const token = req.headers.authorization
   if(token){
      jwt.verify(token,process.env.JWT_KEY,(err)=>{
         if(err) return res.status(403);
         next()
      })
   }else{
      res.status(401)
   }
}