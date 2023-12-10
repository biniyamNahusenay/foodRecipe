import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getUserId} from "../hook/getUserId"
import {useCookies} from "react-cookie"

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes,setSavedRecipes] = useState([])
  
  const [cookies,_] = useCookies(["access_token"])

  const userId  = getUserId()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe");
        setRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/savedRecipes/id/${userId}`);
        setSavedRecipes(response.data.savedRecipes)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipe();
    if(cookies.access_token) fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeId)=>{
    try {
      const response = await axios.put("http://localhost:5000/recipe",{recipeId,userId},
      {headers:{Authorization:cookies.access_token}});
      setSavedRecipes(response.data.savedRecipes)
    } catch (error) {
      console.error(error);
    }
  }

  const isRecipeSaved = (id)=> savedRecipes.includes(id)
  return (
    <div className='home'>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=>saveRecipe(recipe._id)}  disabled = {isRecipeSaved(recipe._id)}>
                {isRecipeSaved(recipe._id) ? "saved" : "save"}
              </button>
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt="image" />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
