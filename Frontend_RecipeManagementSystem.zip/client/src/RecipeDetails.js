import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const API_BASE_URL = 'http://localhost:5120/api'; // Ensure this is correct

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/Recipes/${id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe details:', error));
    }, [id]);

    if (!recipe) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
            {/* Add more details here */}
        </Container>
    );
}

export default RecipeDetails;