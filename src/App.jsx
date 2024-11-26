import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage'
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


const App = () => {
    return (
        <Router>
          <Navbar />
       
            <Routes>
             
            <Route path="/" element={<HomePage />} />
                <Route path="/Search" element={<RecipeListPage />} />
              
            </Routes>
            <Footer />
        </Router>
        
    );
};

export default App;
