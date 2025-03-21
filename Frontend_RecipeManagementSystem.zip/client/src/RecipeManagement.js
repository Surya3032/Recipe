import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, ListGroup } from 'react-bootstrap';
import './/styles/RecipeManagement.styles.css';

const API_BASE_URL = 'http://localhost:5120/api'; // Ensure this is correct

function RecipeManagement() {
    const [recipes, setRecipes] = useState([]);
    const [newRecipeName, setNewRecipeName] = useState('');
    const [newRecipeDescription, setNewRecipeDescription] = useState('');

    useEffect(() => {
        axios.get(`${API_BASE_URL}/Recipes`).then(response => setRecipes(response.data));
    }, []);

    const addRecipe = () => {
        axios.post(`${API_BASE_URL}/Recipes`, { name: newRecipeName, description: newRecipeDescription })
            .then(response => {
                setRecipes([response.data, ...recipes]);
                setNewRecipeName('');
                setNewRecipeDescription('');
            })
            .catch(error => console.error('Error adding recipe:', error));
    };

    const deleteRecipe = (id) => {
        axios.delete(`${API_BASE_URL}/Recipes/${id}`)
            .then(() => setRecipes(recipes.filter(r => r.id !== id)))
            .catch(error => console.error('Error deleting recipe:', error));
    };

    return (
        <div>
            <h1>Recipe Management</h1>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Name" value={newRecipeName} onChange={e => setNewRecipeName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Control as="textarea" placeholder="Description" value={newRecipeDescription} onChange={e => setNewRecipeDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={addRecipe}>Add Recipe</Button>
            </Form>
            <ListGroup>
                {recipes.map(recipe => (
                    <ListGroup.Item key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            {recipe.name} - {recipe.description}
                        </Link>
                        <Button variant="danger" size="sm" onClick={() => deleteRecipe(recipe.id)}>Delete</Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

export default RecipeManagement;