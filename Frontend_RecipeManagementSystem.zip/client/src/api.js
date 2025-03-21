import axios from 'axios';

const API_BASE_URL = 'http://localhost:5120/api'; // Replace with your backend URL

// Centralized error handling function
const handleApiError = (error, errorMessage) => {
    console.error(errorMessage, error);
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error("Request:", error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
    }
    throw error; // Rethrow the error to be handled by the caller
};

// Categories API functions
export const getCategories = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Categories`);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Error fetching categories:');
    }
};

export const getCategoryById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Categories/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error fetching category with ID ${id}:`);
    }
};

export const createCategory = async (category) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/Categories`, category);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Error creating category:');
    }
};

export const updateCategory = async (id, category) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/Categories/${id}`, category);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error updating category with ID ${id}:`);
    }
};

export const deleteCategory = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/Categories/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error deleting category with ID ${id}:`);
    }
};

// Recipes API functions
export const getRecipes = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Recipes`);
        return response.data;
    } catch (error) {
        return handleApiError(error, 'Error fetching recipes:');
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/Recipes/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error fetching recipe with ID ${id}:`);
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

export const updateRecipe = async (id, recipe) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/Recipes/${id}`, recipe);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error updating recipe with ID ${id}:`);
    }
};

export const deleteRecipe = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/Recipes/${id}`);
        return response.data;
    } catch (error) {
        return handleApiError(error, `Error deleting recipe with ID ${id}:`);
    }
};