import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { userRouter } from "./routes/userRoutes.js"
import { recipeRouter } from "./routes/recipe.js"

const app = express()

app.use(express.json())
app.use(cors())
app.use("/auth",userRouter)
app.use("/recipe",recipeRouter)

mongoose.connect("mongodb://127.0.0.1:27017/mern")
 console.log('mongodb connected')

app.listen(5000,()=>console.log("server started"))