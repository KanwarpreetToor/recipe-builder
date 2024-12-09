const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json()); // Parse JSON request bodies

// Pre-set recipes data
const recipes = [
    { id: 1, name: "Spaghetti Carbonara", ingredients: ["Spaghetti", "Eggs", "Bacon"] },
    { id: 2, name: "Chicken Salad", ingredients: ["Chicken", "Lettuce", "Dressing"] },
];

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});