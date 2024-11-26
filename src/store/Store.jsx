import {configureStore} from'@reduxjs/toolkit'
import recipeReducer from '../Slice/RecipeSlice'


const Store= configureStore({
    reducer: {
        recipes: recipeReducer,
    },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false, // Disable the serializable check
            }),

    
})
export default Store