
import React from 'react';
import './Header.css';

const Header = () => {
const navigateToSignup = () => {
    window.location.href = '/signup';
};

return (
    <header className="header">
        <img src="logo.png" alt="Logo" style={{ marginBottom: '0px', height: '60px' }} />
        
        <nav className="nav">
            <a href="#home" className="nav-item">Home</a>
            <a href="#bookings" className="nav-item">Bookings</a>
            <a href="#explore" className="nav-item">Explore</a>
            <button className="nav-login-button" onClick={navigateToSignup}>Login/Signup</button>
        </nav>
    </header>
);
};

export default Header;
