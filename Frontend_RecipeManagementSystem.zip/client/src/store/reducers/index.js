// src/store/reducers/index.js
import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';

const rootReducer = combineReducers({
    recipes: recipeReducer,
    // Add other reducers here
});

export default rootReducer;