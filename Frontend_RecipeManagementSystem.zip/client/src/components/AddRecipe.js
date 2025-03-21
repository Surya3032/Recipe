import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../store/actions/recipeActions'; // Adjust import path
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledContainer = styled(Container)`
  padding: 20px;
`;

function AddRecipe() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.recipes.loading);
    const error = useSelector((state) => state.recipes.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRecipe({ name, description }));
        setName('');
        setDescription('');
        navigate('/recipes'); // Navigate to recipes page after adding
    };

    return (
        <StyledContainer>
            <h1>Add Recipe</h1>
            {loading && <p>Adding recipe...</p>}
            {error && <p>Error: {error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Add Recipe</Button>
            </Form>
        </StyledContainer>
    );
}

export default AddRecipe;