import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

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

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/recipes/${id}`)
            .then((response) => setRecipe(response.data))
            .catch((error) => console.error("Error fetching recipe:", error));
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <p>Ingredients: {recipe.ingredients.join(", ")}</p>
        </div>
    );
}

function App() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/recipes")
            .then((response) => setRecipes(response.data))
            .catch((error) => console.error("Error fetching recipes:", error));
    }, []);

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
                    <Route path="/" element={<RecipeList recipes={recipes} />} />
                    <Route path="/recipes/:id" element={<RecipeDetail />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;