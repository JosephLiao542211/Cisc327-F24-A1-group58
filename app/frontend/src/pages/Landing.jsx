import React from 'react';
import '../App.css'; // Import the CSS file

const App = () => {
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
          <div className="flight-info">
            <label>From: Luxor (LUX)</label>
            <label>To: Cairo (CAP)</label>
            <label>Departure: Mar 23/2023</label>
            <label>Return: Mar 27/2023</label>
            <button className="search-button">Search</button>
          </div>
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
          <div className="deal-card">
            <img src="tokyo.jpg" alt="Tokyo, Japan" className="card-image" />
            <div className="card-text">
              <h3>Tokyo, Japan</h3>
              <p>Sept 11th</p>
            </div>
            <div className="discount">-40%</div>
          </div>

          <div className="deal-card">
            <img src="rome.jpg" alt="Rome, Italy" className="card-image" />
            <div className="card-text">
              <h3>Rome, Italy</h3>
              <p>Sept 17th</p>
            </div>
            <div className="discount">-20%</div>
          </div>

          <div className="deal-card">
            <img src="halongbay.jpg" alt="Ha Long Bay, Vietnam" className="card-image" />
            <div className="card-text">
              <h3>Ha Long Bay, Vietnam</h3>
              <p>Oct 26th</p>
            </div>
            <div className="discount">-17%</div>
          </div>
        </div>

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
      </footer>
    </div>
  );
};

export default App;
