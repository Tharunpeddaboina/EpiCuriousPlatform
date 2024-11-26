import React from 'react';
import './Footer.css'; // Importing a separate CSS file for styles

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                
                <div className="footer-info">
                    <p>© {new Date().getFullYear()} EpiCurious. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
