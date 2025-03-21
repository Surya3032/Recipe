import * as actionTypes from '../actionTypes';

const initialState = {
    recipes: [],
    loading: false,
    error: null,
};

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RECIPES_REQUEST:
        case actionTypes.ADD_RECIPE_REQUEST:
            return { ...state, loading: true, error: null };
        case actionTypes.FETCH_RECIPES_SUCCESS:
            return { ...state, loading: false, recipes: action.payload };
        case actionTypes.ADD_RECIPE_SUCCESS:
            return { ...state, loading: false, recipes: [action.payload, ...state.recipes] };
        case actionTypes.FETCH_RECIPES_FAILURE:
        case actionTypes.ADD_RECIPE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default recipeReducer;