import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetail from "./components/RecipeDetail";


function RecipeList({ recipes }) {
    return (
        <ul>
            {recipes.map((recipe) => (
                <li key={recipe.id}>
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </li>
            ))}
        </ul>
    );
}

function App() {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        axios.get("http://localhost:5000/recipes")
            .then((response) => setRecipes(response.data))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

    const handleRecipeAdded = (newRecipe) => {
      setRecipes([...recipes, newRecipe]);
  };

    const handleSuggest = (event) => {
      event.preventDefault();
      axios.post("http://localhost:5000/recipes/suggest", { ingredients: ingredients.split(",") })
          .then((response) => {
              if (response.data.length === 0) {
                  alert("No matching recipes found!");
              }
              setSuggestions(response.data);
          })
          .catch((error) => console.error("Error fetching suggestions:", error));
  };

    return (
    <Router>
        <div>
            <h1>Recipe Builder</h1>
            <Routes>
                {/* Home Page Route */}
                <Route path="/" element={
                    <>
                        {/* Keep the RecipeList */}
                        <RecipeList recipes={recipes} />

                        {/* Add the CreateRecipe component */}
                        <CreateRecipe onRecipeAdded={handleRecipeAdded} />
                    </>
                } />
                
                {/* Recipe Detail Page Route */}
                <Route path="/recipes/:id" element={<RecipeDetail />} />
            </Routes>
        </div>
    </Router>
);
}

export default App;