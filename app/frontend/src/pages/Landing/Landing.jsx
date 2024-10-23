// Landing.js
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import HeroSection from './HeroSection/HeroSection';
import DealsSection from './DealsSection/DealsSection';
import Footer from '../../components/Footer/Footer';
import './Landing.css';

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

    <div>
    <div className="container">
      <Header />
      <HeroSection />
      <DealsSection flights={flights} />
      
    </div>
    <Footer token={token} />
    </div>
  );
};

export default Landing;
