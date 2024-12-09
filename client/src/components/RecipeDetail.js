import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
            <h3>Cooking Steps</h3>
            <ol>
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipeDetail;
