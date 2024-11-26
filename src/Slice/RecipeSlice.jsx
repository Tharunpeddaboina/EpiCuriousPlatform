import { createSlice } from "@reduxjs/toolkit";

const RecipeSlice = createSlice({
  name: "Recipes",
  initialState: {
    recipes: [],
    filteredRecipes: [],
    status: "idle",
    error: null,
    filters: {
      rating: null,
      maxCalories: null,
      maxProtein: null,
      maxFat: null,
      maxSodium: null,
      category: "",
    },
    searchTerm: '',
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
      state.filteredRecipes = action.payload;
      state.status = "succeeded";
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    updateFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    applyFilters: (state) => {
     
      state.filteredRecipes = state.recipes.filter((recipe) => {
        const meetsRating = state.filters.rating ? recipe.rating >= state.filters.rating : true;
        const meetsCalories = state.filters.maxCalories ? recipe.calories <= state.filters.maxCalories : true;
        const meetsProtein = state.filters.maxProtein ? recipe.protein <= state.filters.maxProtein : true;
        const meetsFat = state.filters.maxFat ? recipe.fat <= state.filters.maxFat : true;
        const meetsSodium = state.filters.maxSodium ? recipe.sodium <= state.filters.maxSodium : true;
        const meetsCategory = state.filters.category ? 
          (recipe.category && recipe.category.includes(state.filters.category)) : true;

        return (
          meetsRating &&
          meetsCalories &&
          meetsProtein &&
          meetsFat &&
          meetsSodium &&
          meetsCategory
        );
      });
    }
  }
});

export const {
  setRecipes,
  setStatus,
  setError,
  updateFilters,
  updateSearchTerm,
  applyFilters
} = RecipeSlice.actions;

export default RecipeSlice.reducer;