import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {getUserId} from "../hook/getUserId"

const SavedRecipe = () => {
  const [savedRecipes,setSavedRecipes] = useState([])
  const userId  = getUserId()

  useEffect(() => {
     const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/recipe/savedRecipes/${userId}`);
        setSavedRecipes(response.data.savedRecipes)
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSavedRecipe();
  }, []);
  
  return (
    <div className='home'>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
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

export default SavedRecipe;
