import React from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from './../Slice/RecipeSlice';
import './FilterForm.css'; // Make sure you have the styles in a separate CSS file

const FilterForm = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateFilters({ [name]: value })); // Update filters in Redux state
    };

    const handleSubmit = (e) => {
        e.preventDefault();
   
    };

 

    return (
        <form className="filter-form" onSubmit={handleSubmit}>
            <h3>Recipe Filters</h3>
            <div className="filter-inputs">
                <input
                    type="number"
                    name="rating"
                    placeholder="Min Rating"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <input
                    type="number"
                    name="maxCalories"
                    placeholder="Max Calories"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <input
                    type="number"
                    name="maxProtein"
                    placeholder="Max Protein"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <input
                    type="number"
                    name="maxFat"
                    placeholder="Max Fat"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <input
                    type="number"
                    name="maxSodium"
                    placeholder="Max Sodium"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>
            <button type="submit" className="filter-button">Apply Filters</button>
        </form>
    );
};

export default FilterForm;
