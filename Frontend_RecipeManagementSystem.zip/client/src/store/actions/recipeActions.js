// src/store/actions/recipeActions.js
import * as actionTypes from '../actionTypes';
import { getRecipes, createRecipe } from '../../services/apiService';

export const fetchRecipes = () => async (dispatch) => {
    dispatch({ type: actionTypes.FETCH_RECIPES_REQUEST });
    try {
        const recipes = await getRecipes();
        dispatch({ type: actionTypes.FETCH_RECIPES_SUCCESS, payload: recipes });
    } catch (error) {
        dispatch({ type: actionTypes.FETCH_RECIPES_FAILURE, payload: error.message });
    }
};

export const addRecipe = (recipe) => async (dispatch) => {
    dispatch({ type: actionTypes.ADD_RECIPE_REQUEST });
    try {
        const newRecipe = await createRecipe(recipe);
        dispatch({ type: actionTypes.ADD_RECIPE_SUCCESS, payload: newRecipe });
    } catch (error) {
        dispatch({ type: actionTypes.ADD_RECIPE_FAILURE, payload: error.message });
    }
};

// Add other actions as needed