import React, { useContext } from 'react';
import './Header.css';
import { LoginContext } from '../../pages/Landing/Landing'; // Make sure to import your LoginContext

const Header = () => {
    const { userData } = useContext(LoginContext);

    const navigateToSignup = () => {
        window.location.href = '/signup';
    };
    const navigateTohome = () => {
        window.location.href = '/profile/' + userData._id;
    };

    return (
        <header className="header">
            <img
                src="logo.png"
                alt="Logo"
                style={{
                    marginBottom: '0px',
                    height: '60px',
                    cursor: 'pointer',
                }}
                onClick={() => (window.location.href = '/')}
            />

            <nav className="nav">
                <a href="/" className="nav-item">
                    Home
                </a>
                <a href="#bookings" className="nav-item">
                    Bookings
                </a>
                <a href="explore" className="nav-item">
                    Explore
                </a>

                {userData ? (
                    // If userData exists, show the user's name and a profile icon button
                    <button
                        className="nav-login-button"
                        onClick={navigateTohome}
                    >
                        <img
                            src="profile-icon.png"
                            alt="Profile Icon"
                            style={{ height: '50px', marginRight: '10px' }}
                        />
                        {userData.firstName}
                    </button>
                ) : (
                    // If userData does not exist, show the login/signup button
                    <button
                        className="nav-login-button"
                        onClick={navigateToSignup}
                    >
                        Login/Signup
                    </button>
                )}
            </nav>
        </header>
    );
};

export default Header;
