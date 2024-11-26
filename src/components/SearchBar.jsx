import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchTerm, applyFilters } from './../Slice/RecipeSlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state) => state.recipes.searchTerm);

    const handleChange = (e) => {
        dispatch(updateSearchTerm(e.target.value));
    };


    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search for a recipe..."
                style={{ padding: '10px', fontSize: '1.5em', borderRadius: '18px', border: '1px solid blue' }}
            />
            

        </div>
    );
};

export default SearchBar;
