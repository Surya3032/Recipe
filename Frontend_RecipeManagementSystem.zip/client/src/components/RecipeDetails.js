import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';

const API_BASE_URL = 'http://localhost:7205/api'; // Replace with your API URL

const StyledContainer = styled(Container)`
  padding: 20px;
`;

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        axios.get(`<span class="math-inline">\{API\_BASE\_URL\}/Recipes/</span>{id}`)
            .then(response => setRecipe(response.data))
            .catch(error => console.error('Error fetching recipe:', error));
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <StyledContainer>
            <h1>{recipe.name}</h1>
            <p>{recipe.description}</p>
        </StyledContainer>
    );
}

export default RecipeDetails;