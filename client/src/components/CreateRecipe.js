import React, { useState } from "react";
import axios from "axios";

function CreateRecipe({ onRecipeAdded }) {
    const [newRecipeName, setNewRecipeName] = useState("");
    const [newRecipeIngredients, setNewRecipeIngredients] = useState("");
    const [newRecipeSteps, setNewRecipeSteps] = useState("");

    const handleCreateRecipe = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/recipes", {
            name: newRecipeName,
            ingredients: newRecipeIngredients.split(","),
            steps: newRecipeSteps.split("\n"), //split steps by newlines
        })
            .then((response) => {
                alert("Recipe added successfully!");
                onRecipeAdded(response.data); // Notify parent component
                setNewRecipeName("");
                setNewRecipeIngredients("");
                setNewRecipeSteps("")
            })
            .catch((error) => console.error("Error adding recipe:", error));
    };

    return (
        <div>
            <h2>Create New Recipe</h2>
            <form onSubmit={handleCreateRecipe}>
                <input
                    type="text"
                    value={newRecipeName}
                    onChange={(e) => setNewRecipeName(e.target.value)}
                    placeholder="Recipe name"
                />
                <input
                    type="text"
                    value={newRecipeIngredients}
                    onChange={(e) => setNewRecipeIngredients(e.target.value)}
                    placeholder="Ingredients (comma-separated)"
                />
                <textarea
                    value={newRecipeSteps}
                    onChange={(e) => setNewRecipeSteps(e.target.value)}
                    placeholder="Enter steps (one step per line)"
                    ></textarea>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
