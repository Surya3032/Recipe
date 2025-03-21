// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5120/api';

const handleApiError = (error, errorMessage) => {
    console.error(errorMessage, error);
    if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
    } else if (error.request) {
        console.error("Request:", error.request);
    } else {
        console.error('Error message:', error.message);
    }
    throw error;
};

export const getRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Recipes`);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Error fetching recipes:');
    }
};

export const createRecipe = async (recipe) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Recipes`, recipe);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Error creating recipe:');
    }
};

// Add other API functions as needed