import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
const Homepage = () => {
    
  return (
    <section className="homepage">
      <div className="hero">
        <div className="hero-text">
          <h1>Welcome to EpiCurious</h1>
          <p>Discover, save, and share  recipes in a beautiful, organized way.</p>
          <Link to="/Search" > <button className='hero-button'>Explore Recipes</button></Link>
        </div>
      </div>

      <div className="intro-section">
        <div className="intro-box">
          <h2>Discover Recipes</h2>
          <p>Explore a world of flavors and recipes for every occasion.</p>
        </div>
        <div className="intro-box">
          <h2>Quick Filtering</h2>
          <p>Filter recipes by taste and dietary preferences easily.</p>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
