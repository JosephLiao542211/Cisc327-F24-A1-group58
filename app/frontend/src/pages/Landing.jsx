
import '../App.css'; // Import the CSS file
import FlightCard from '../components/FlightCard/FlightCard';

import React, { useEffect, useState } from 'react';

  


const Landing = ({ token }) => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch('/flight');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);
  return (
    <div className="container">
      <header className="header">
      <h1 className="logo">Airplane</h1>
      <nav className="nav">
        <a href="#home" className="nav-item">Home</a>
        <a href="#bookings" className="nav-item">Bookings</a>
        <a href="#explore" className="nav-item">Explore</a>
        <button className="login-button">Login/Signup</button>
      </nav>
      </header>

      <section className="hero-section">
      <div className="left-column">
        <div className="hero-text">
        <h1>Hello 👋, Joseph</h1>
        <h2>Ready to <span>EXPLORE?</span></h2>
        <div className="search-box">
          <input type="text" className="input" placeholder="Where do you want to go?" />
          <button className="search-button">Search</button>
        </div>
        </div>
      </div>

      <div className="right-column">
        <section className="flight-search-section">
        <div className="flight-search-box">
          <div className="search-field">
          <label>From:</label>
          <div className="input-group">
            <input type="text" value="Luxor (LUX)" />
          </div>
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
        </section>
        <img src="airplane.png" className="airplane-image" alt="Airplane" />
      </div>
      </section>

      <section className="deals-section">
      <h2>Up to -40% 🎉 Airplane Travel exclusive deals</h2>

      <div className="categories">
        <button className="category-button">Europe</button>
        <button className="category-button">Asia</button>
        <button className="category-button">North America</button>
        <button className="category-button">Other</button>
      </div>

      <div className="deal-cards">
        <FlightCard id={1} imageURL="rome.jpg" description="Sept 17th" location="Rome, Italy" discount="-20%" />
        <FlightCard id={2} imageURL="halongbay.jpg" description="Oct 26th" location="Ha Long Bay, Vietnam" discount="-17%" />
        <FlightCard id={2} imageURL="tokyo.jpg" description="Oct 11th" location="Tokyo, Japan" discount="-50%" />
      </div>

      {/* <div className="deal-cards">
        {flights.length > 0 ? (
        flights.map((flight) => (
          <FlightCard key={flight.id} id={flight.id} imageURL={flight.imageURL} description={flight.description} location={flight.location} discount={flight.discount} />
        ))
        ) : (
        <div style={{ width: '100px', height: '100px', backgroundColor: 'purple' }}></div>
        )}
      </div> */}

      <button className="explore-button">Explore More</button>
      </section>

      <footer className="footer">
      <div className="footer-content">
        <h1 className="logo">Airplane</h1>
        <div className="social-icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-tiktok"></i>
        </div>
      </div>
      <p className="footer-text">© 2024 Airplane LLC, All rights reserved.</p>
      <p className="footer-text">{token || 'generic'}</p>
      </footer>
    </div>
    );
};

export default Landing;
