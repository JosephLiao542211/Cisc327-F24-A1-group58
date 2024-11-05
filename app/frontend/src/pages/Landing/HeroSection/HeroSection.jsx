// HeroSection.js
import React from 'react';
import './HeroSection.css';
import { useContext } from 'react';
import { LoginContext } from '../Landing';

const HeroSection = () => {

  const { userData } = useContext(LoginContext);
  return (
    <section className="hero-section">
      <img 
        src="faces.png" 
        className="background-image" 
        alt="Background" 
        style={{ position: 'absolute', height: '600px', zIndex: 10 }} 
      />
      <div className="left-column">
        <div className="hero-text">
          {userData ? (
            <>
              <h1>Hello 👋,</h1>
              <h1>{userData.firstName}</h1>
            </>
          ) : (
            <>
              <h1>Say Hello 👋</h1>
              <h1>to Adventure</h1>
            </>
          )}
          
          <h2>Ready to <span>EXPLORE?</span></h2>
          <div className="search-box">
            <input type="text" className="where-input" placeholder="Where do you want to go?" />
            <button className="search-button">Search</button>
          </div>
        </div>
      </div>

      <div className="right-column">
        <div className="flight-search-box">
          <div className="search-field">
            <label>From:</label>
            <input type="text" value="Luxor (LUX)" />
          </div>

          <div className="search-field">
            <label>To:</label>
            <input type="text" value="Cairo (CAP)" />
          </div>

          <div className="date-fields">
            <div className="date-field">
              <label>Departure</label>
              <input type="text" value="Mar 23/2023" />
            </div>
            <div className="date-field">
              <label>Return</label>
              <input type="text" value="Mar 27/2023" />
            </div>
          </div>

          <button className="search-button">Search</button>
        </div>
        <img src="airplane.png" className="airplane-image" alt="Airplane" />
      </div>
    </section>
  );
};

export default HeroSection;
