import React, { useState, useEffect } from 'react';
import { getRecipes, deleteRecipe } from '../api';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes().then(res => setRecipes(res.data));
    }, []);

    const handleDelete = (id) => {
        deleteRecipe(id).then(() => {
            setRecipes(recipes.filter(r => r.id !== id));
        });
    };

    return (
        <div>
            <h2>Recipes</h2>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        {recipe.name} - {recipe.description}
                        <button onClick={() => handleDelete(recipe.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;