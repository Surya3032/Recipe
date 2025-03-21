import React, { useState } from 'react';
import { createRecipe } from '../api';

const RecipeForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createRecipe({ name, description }).then(() => {
            setName('');
            setDescription('');
        });
    };

    return (
        <div>
            <h2>Add Recipe</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default RecipeForm;