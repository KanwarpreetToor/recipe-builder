const express = require("express");
const cors = require("cors");
const Recipe = require("./models/Recipe");

const app = express();

const PORT = process.env.PORT || 5000;


app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); // Parse JSON request bodies

require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch((error) => console.error("Error connecting to MongoDB:", error));

// Pre-set recipes data
// const recipes = [
//     { id: 1, name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Eggs", "Bacon"], steps: [
//         "Boil spaghetti in salted water.",
//         "Cook bacon in a pan until crispy.",
//         "Mix eggs and cheese, then combine with hot spaghetti and bacon."
//     ] },
//     { id: 2, name: "Chicken Salad", ingredients: ["Chicken", "Lettuce", "Dressing"], steps: [
//         "Cook chicken in pan.",
//         "Chop lettuce.",
//         "Combine chicken, lettuce and dressing"
//     ]  },
// ];

app.get("/", (req, res) => {
    res.send("Welcome to the Recipe Builder API");
});


// GET /recipes - Fetch all recipes
app.get("/recipes", (req, res) => {
    res.json(recipes);
});

// POST /recipes/suggest - Suggest recipes based on user input
app.post("/recipes/suggest", (req, res) => {
    const { ingredients } = req.body;
    const suggestions = recipes.filter((recipe) =>
        ingredients.some((ingredient) => recipe.ingredients.includes(ingredient))
    );
    res.json(suggestions);
});

// GET /recipes/:id - Fetch a single recipe by ID
app.get("/recipes/:id", (req, res) => {
    const recipe = recipes.find((r) => r.id === parseInt(req.params.id));
    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ error: "Recipe not found" });
    }
});

app.post("/recipes", async (req, res) => {
    const { name, ingredients, steps } = req.body;

    if (!name || ingredients.length === 0 || steps.length === 0) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newRecipe = new Recipe({ name, ingredients, steps });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ error: "Failed to save recipe" });
    }
});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
