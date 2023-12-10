import React, { useState } from 'react'
import axios from "axios"
import { getUserId } from '../hook/getUserId'
import { useNavigate } from 'react-router-dom'
import {useCookies} from "react-cookie"

const CreateRecipe = () => {
  const userId = getUserId()
    const [cookies,_] = useCookies(["access_token"])
  const [recipe,setRecipe] = useState({
    name:"",
    ingredients:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userId
  })

  const navigate = useNavigate()

  const handleChange = (event)=>{
    const {name,value} = event.target
    setRecipe({...recipe,[name]:value})
  }

  const handleIngredientChange = (event,idx)=>{
    const {value} = event.target
    const ingredients = recipe.ingredients
    ingredients[idx] = value;
    setRecipe({...recipe,ingredients})
  } 

  const addIngredient = ()=>{
    setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
  }

  const onSubmit = async(e)=>{
    e.preventDefault()
       await axios.post("http://localhost:5000/recipe",recipe,
       {headers:{Authorization:cookies.access_token}})
        .then((response)=>{
           console.log(response)
           alert("recipe created")
           navigate("/")
        })
      .catch((error) => {
      console.log("failed response" + error.response);
    });
  }

  return (
    <div className="create-recipe">
    <h2>Create Recipe</h2>
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={recipe.name}
        onChange={handleChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={recipe.description}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="ingredients">Ingredients</label>
      {recipe.ingredients.map((ingredient,idx)=>(
        <input key={idx} type='text' name='ingredients'
         onChange={(event)=>handleIngredientChange(event,idx)} value={ingredient}/>
      ))}
      <button type='button' onClick={addIngredient}>Add Ingredient</button>
      <label htmlFor="instructions">Instructions</label>
      <textarea
        id="instructions"
        name="instructions"
        value={recipe.instructions}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="imageUrl">Image URL</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value={recipe.imageUrl}
        onChange={handleChange}
      />
      <label htmlFor="cookingTime">Cooking Time (minutes)</label>
      <input
        type="number"
        id="cookingTime"
        name="cookingTime"
        value={recipe.cookingTime}
        onChange={handleChange}
      />
      <button type="submit">Create Recipe</button>
    </form>
  </div>
  )
}

export default CreateRecipe
